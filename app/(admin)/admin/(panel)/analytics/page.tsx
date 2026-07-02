import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ChartNoAxesCombined, HandCoins, Users } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getAdminStats } from '@/lib/queries/admin-stats';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Analytics', robots: { index: false, follow: false } };

function formatMoney(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

async function AdminAnalyticsPage() {
  const user = await requireAdmin();
  const now = new Date();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [stats, totalDonations, completedUsdAgg, statusRows, last30Count, recentDonations] = await Promise.all([
    getAdminStats(),
    prisma.memberDonation.count(),
    prisma.memberDonation.aggregate({
      where: { status: 'COMPLETED', currency: 'USD' },
      _sum: { amount: true },
    }),
    prisma.memberDonation.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
    prisma.memberDonation.count({ where: { createdAt: { gte: last30Days } } }),
    prisma.memberDonation.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        currency: true,
        label: true,
        status: true,
        createdAt: true,
        member: { select: { name: true, surname: true, email: true } },
      },
    }),
  ]);

  const donationStatus = {
    COMPLETED: 0,
    PENDING: 0,
    FAILED: 0,
    REFUNDED: 0,
  };
  for (const row of statusRows) {
    donationStatus[row.status] = row._count._all;
  }

  const kpis = [
    { title: 'Total members', value: stats.totalMembers, icon: Users },
    { title: 'Total donations', value: totalDonations, icon: HandCoins },
    { title: 'Completed USD', value: formatMoney(completedUsdAgg._sum.amount ?? 0), icon: ChartNoAxesCombined },
    { title: 'Donations (30d)', value: last30Count, icon: HandCoins },
  ];

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Analytics"
      title="Site analytics"
      description="Cross-site overview of members, donations, projects, inbox, and recent payment activity."
      size="wide"
    >
      <AdminStagger as="section" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="overflow-hidden border-stone-200/80 bg-white/95 p-6">
              <p className="text-xs uppercase tracking-eyebrow text-ink-muted">{kpi.title}</p>
              <div className="mt-3 flex items-start justify-between gap-3">
                <p className="font-display text-3xl text-ink">{kpi.value}</p>
                <Badge tone="bronze">
                  <Icon size={14} aria-hidden />
                </Badge>
              </div>
            </Card>
          );
        })}
      </AdminStagger>

      <AdminStagger as="section" className="grid gap-6 lg:grid-cols-2">
        <Card className="border-stone-200/80 bg-white/95 p-6">
          <h3 className="font-display text-xl text-ink">Donation status</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">Completed</p>
              <p className="mt-1 text-xl font-semibold text-ink">{donationStatus.COMPLETED}</p>
            </li>
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">Pending</p>
              <p className="mt-1 text-xl font-semibold text-ink">{donationStatus.PENDING}</p>
            </li>
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">Failed</p>
              <p className="mt-1 text-xl font-semibold text-ink">{donationStatus.FAILED}</p>
            </li>
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">Refunded</p>
              <p className="mt-1 text-xl font-semibold text-ink">{donationStatus.REFUNDED}</p>
            </li>
          </ul>
          <Link
            href="/admin/member-donations"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-bronze-800 hover:text-bronze-900"
          >
            Open full donations list <ArrowRight size={13} aria-hidden />
          </Link>
        </Card>

        <Card className="border-stone-200/80 bg-white/95 p-6">
          <h3 className="font-display text-xl text-ink">Site snapshot</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">Published culture items</p>
              <p className="mt-1 text-xl font-semibold text-ink">{stats.totalCultureItems}</p>
            </li>
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">Active projects</p>
              <p className="mt-1 text-xl font-semibold text-ink">{stats.activeProjects}</p>
            </li>
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">Pending submissions</p>
              <p className="mt-1 text-xl font-semibold text-ink">{stats.pendingSubmissions}</p>
            </li>
            <li className="rounded-xl border border-stone-200/80 bg-parchment-50/60 p-3">
              <p className="text-ink-muted">New inbox messages</p>
              <p className="mt-1 text-xl font-semibold text-ink">{stats.newContactMessages}</p>
            </li>
          </ul>
        </Card>
      </AdminStagger>

      <AdminStagger as="section">
        <Card className="border-stone-200/80 bg-white/95 p-6">
          <h3 className="font-display text-xl text-ink">Recent member payments</h3>
          <ul className="mt-4 divide-y divide-stone-100">
            {recentDonations.length === 0 ? (
              <li className="py-4 text-sm text-ink-muted">No payment activity yet.</li>
            ) : (
              recentDonations.map((row) => (
                <li key={row.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {row.member.name} {row.member.surname} <span className="text-ink-muted">· {row.label}</span>
                    </p>
                    <p className="truncate text-xs text-ink-muted">
                      {row.member.email} · {row.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge tone={row.status === 'COMPLETED' ? 'green' : row.status === 'PENDING' ? 'amber' : 'stone'}>
                      {row.status}
                    </Badge>
                    <span className="text-sm font-medium text-ink">{formatMoney(row.amount, row.currency)}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </Card>
      </AdminStagger>
    </AdminPageShell>
  );
}

export default AdminAnalyticsPage;
