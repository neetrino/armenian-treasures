import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  FolderArchive,
  HandCoins,
  Inbox,
  ListTree,
  Mail,
  Sparkles,
} from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ContactInboxTypeBadge } from '@/components/admin/ContactInboxTypeBadge';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getContactMessageKind } from '@/lib/inbox/contact-message-kind';
import { getAdminStats } from '@/lib/queries/admin-stats';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: '/admin/culture-menu', label: 'Manage menu', icon: ListTree },
  { href: '/admin/culture-items', label: 'Manage items', icon: FolderArchive },
  { href: '/admin/projects', label: 'Manage projects', icon: HandCoins },
  { href: '/admin/submissions', label: 'Open inbox', icon: Inbox },
];

async function AdminDashboardPage() {
  const user = await requireAdmin();
  const stats = await getAdminStats();
  const [latestSubmissions, latestMessages] = await Promise.all([
    prisma.submission.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, type: true, status: true, submitterName: true, createdAt: true },
    }).catch(() => []),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, message: true, status: true, createdAt: true },
    }).catch(() => []),
  ]);

  const kpis = [
    {
      title: 'Culture items',
      value: stats.totalCultureItems,
      icon: FolderArchive,
      tone: 'bronze' as const,
    },
    {
      title: 'Pending submissions',
      value: stats.pendingSubmissions,
      icon: Inbox,
      tone: 'pomegranate' as const,
    },
    {
      title: 'Active projects',
      value: stats.activeProjects,
      icon: HandCoins,
      tone: 'midnight' as const,
    },
    {
      title: 'New public inbox',
      value: stats.newContactMessages,
      icon: Mail,
      tone: 'green' as const,
    },
  ];

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Dashboard"
      title={`Welcome back, ${user.name.split(' ')[0] ?? 'curator'}.`}
      description="A live snapshot of the foundation's content and inbox."
      size="wide"
    >
      <AdminStagger as="section" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.title}
              className="overflow-hidden border-stone-200/80 bg-gradient-to-br from-white via-parchment-50/70 to-white p-6"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze-300/60 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-eyebrow text-ink-muted">{kpi.title}</p>
                  <p className="mt-3 font-display text-4xl text-ink">{kpi.value}</p>
                </div>
                <Badge tone={kpi.tone} className="shadow-sm">
                  <Icon size={14} aria-hidden />
                </Badge>
              </div>
            </Card>
          );
        })}
      </AdminStagger>

      <AdminStagger as="section" className="grid gap-6 lg:grid-cols-3">
        <Card className="border-stone-200/80 bg-white/95 p-6 lg:col-span-2">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze-300/60 to-transparent" />
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-ink">Latest submissions</h3>
            <Link
              href="/admin/submissions"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-bronze-300 hover:text-bronze-800"
            >
              Open inbox <ArrowRight size={12} aria-hidden />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-stone-100">
            {latestSubmissions.length === 0 ? (
              <li className="py-6 text-sm text-ink-muted">No submissions yet.</li>
            ) : (
              latestSubmissions.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-4 py-3 text-sm transition hover:bg-parchment-50/50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">
                      {s.title ?? '(no title)'} <span className="text-ink-muted">· {s.submitterName}</span>
                    </p>
                    <p className="text-xs text-ink-muted">
                      {s.type.replace(/_/g, ' ').toLowerCase()} · {s.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge tone={s.status === 'PENDING' ? 'amber' : s.status === 'APPROVED' ? 'green' : 'stone'}>
                    {s.status}
                  </Badge>
                </li>
              ))
            )}
          </ul>
        </Card>

        <Card className="overflow-hidden border-stone-200/80 bg-gradient-to-br from-pomegranate/5 via-white to-bronze-50/50 p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-pomegranate/10 blur-2xl" />
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-pomegranate" aria-hidden />
            <h3 className="font-display text-xl text-ink">Quick actions</h3>
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl border border-stone-200/80 bg-white/90 px-3 py-2.5 text-sm text-ink-soft transition hover:-translate-y-px hover:border-bronze-300 hover:text-bronze-800"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-parchment-100 text-bronze-700 transition group-hover:bg-bronze-100">
                        <Icon size={14} aria-hidden />
                      </span>
                      {link.label}
                    </span>
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </AdminStagger>

      <AdminStagger as="section">
        <Card className="border-stone-200/80 bg-white/95 p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze-300/60 to-transparent" />
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-ink">Latest public inbox</h3>
            <Link
              href="/admin/contact-messages"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-bronze-300 hover:text-bronze-800"
            >
              Open inbox <ArrowRight size={12} aria-hidden />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-stone-100">
            {latestMessages.length === 0 ? (
              <li className="py-6 text-sm text-ink-muted">No inbox entries yet.</li>
            ) : (
              latestMessages.map((m) => {
                const isNewsletter = getContactMessageKind(m) === 'newsletter';
                return (
                  <li
                    key={m.id}
                    className="flex items-center justify-between gap-4 py-3 text-sm transition hover:bg-parchment-50/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">
                        {isNewsletter ? m.email : m.name}
                      </p>
                      <p className="truncate text-xs text-ink-muted">
                        {isNewsletter ? 'Newsletter signup' : m.email}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <ContactInboxTypeBadge name={m.name} message={m.message} />
                      <Badge tone={m.status === 'NEW' ? 'pomegranate' : 'stone'}>{m.status}</Badge>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </Card>
      </AdminStagger>
    </AdminPageShell>
  );
}

export default AdminDashboardPage;
