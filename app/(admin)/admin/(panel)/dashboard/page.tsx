import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, FolderArchive, HandCoins, Inbox, Mail } from 'lucide-react';
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
  { href: '/admin/culture-menu', label: 'Manage menu' },
  { href: '/admin/culture-items', label: 'Manage items' },
  { href: '/admin/projects', label: 'Manage projects' },
  { href: '/admin/submissions', label: 'Open inbox' },
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
        <AdminStagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.title} className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-ink-muted">{kpi.title}</p>
                    <p className="mt-3 font-display text-4xl text-ink">{kpi.value}</p>
                  </div>
                  <Badge tone={kpi.tone}>
                    <Icon size={14} aria-hidden />
                  </Badge>
                </div>
              </Card>
            );
          })}
        </AdminStagger>

        <AdminStagger as="section" className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">Latest submissions</h3>
              <Link
                href="/admin/submissions"
                className="inline-flex items-center gap-1 text-xs text-pomegranate hover:underline"
              >
                Open inbox <ArrowRight size={12} aria-hidden />
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-stone-100">
              {latestSubmissions.length === 0 ? (
                <li className="py-6 text-sm text-ink-muted">No submissions yet.</li>
              ) : (
                latestSubmissions.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-4 py-3 text-sm">
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
          <Card className="p-6">
            <h3 className="font-display text-xl text-ink">Quick actions</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-lg bg-parchment-50 px-3 py-2.5 text-sm text-ink-soft transition hover:bg-pomegranate/5 hover:text-pomegranate"
                  >
                    {link.label}
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </AdminStagger>

        <AdminStagger as="section">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">Latest public inbox</h3>
              <Link
                href="/admin/contact-messages"
                className="inline-flex items-center gap-1 text-xs text-pomegranate hover:underline"
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
                    <li key={m.id} className="flex items-center justify-between gap-4 py-3 text-sm">
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
