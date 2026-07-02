import Link from 'next/link';
import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { Badge } from '@/components/ui/Badge';
import { requireAdmin } from '@/lib/auth/require-admin';
import { buildAdminPageCount, parseAdminListQuery } from '@/lib/admin/list-query';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Member donations', robots: { index: false, follow: false } };

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}

interface Row {
  id: string;
  amount: number;
  currency: string;
  label: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  createdAt: Date;
  member: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
}

const STATUS_OPTIONS: Row['status'][] = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'];

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function statusTone(status: Row['status']): 'green' | 'amber' | 'pomegranate' | 'stone' {
  if (status === 'COMPLETED') return 'green';
  if (status === 'PENDING') return 'amber';
  if (status === 'FAILED') return 'pomegranate';
  return 'stone';
}

async function AdminMemberDonationsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAdmin();
  const listQuery = parseAdminListQuery(searchParams);
  const statusFilter =
    typeof searchParams.status === 'string' && STATUS_OPTIONS.includes(searchParams.status as Row['status'])
      ? (searchParams.status as Row['status'])
      : undefined;

  const where: Prisma.MemberDonationWhereInput = {
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(listQuery.query
      ? {
          OR: [
            { label: { contains: listQuery.query, mode: 'insensitive' } },
            { member: { name: { contains: listQuery.query, mode: 'insensitive' } } },
            { member: { surname: { contains: listQuery.query, mode: 'insensitive' } } },
            { member: { email: { contains: listQuery.query, mode: 'insensitive' } } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.memberDonation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: listQuery.skip,
      take: listQuery.pageSize,
      select: {
        id: true,
        amount: true,
        currency: true,
        label: true,
        status: true,
        createdAt: true,
        member: { select: { id: true, name: true, surname: true, email: true } },
      },
    }),
    prisma.memberDonation.count({ where }),
  ]);

  const pageCount = buildAdminPageCount(total, listQuery.pageSize);
  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'member',
      header: 'Member',
      cell: (row) => (
        <Link href={`/admin/users/${row.member.id}`} className="flex flex-col text-left text-ink hover:text-pomegranate">
          <span className="font-medium">
            {row.member.name} {row.member.surname}
          </span>
          <span className="text-xs text-ink-muted">{row.member.email}</span>
        </Link>
      ),
    },
    {
      key: 'label',
      header: 'Payment',
      cell: (row) => <span className="text-sm text-ink-soft">{row.label}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (row) => <span className="text-sm font-medium text-ink">{formatAmount(row.amount, row.currency)}</span>,
    },
    {
      key: 'confirmed',
      header: 'Confirmed',
      cell: (row) => (
        <Badge tone={row.status === 'COMPLETED' ? 'green' : 'amber'}>
          {row.status === 'COMPLETED' ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge>,
    },
    {
      key: 'date',
      header: 'Date',
      cell: (row) => <span className="text-xs text-ink-muted">{row.createdAt.toLocaleString()}</span>,
    },
  ];

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Donations"
      title="Member donations"
      description="Payment history from registered users. Track amount, timestamp, and confirmation status."
      size="wide"
    >
      <form action="/admin/member-donations" method="get" className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-stone-200/70 bg-white/95 p-4 shadow-card">
        <label htmlFor="donations-search" className="min-w-[240px] flex-1">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">Search</span>
          <div className="relative">
            <Search size={14} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              id="donations-search"
              name="q"
              defaultValue={listQuery.query}
              placeholder="Search by member or payment label..."
              className="h-10 w-full rounded-xl border border-stone-300/80 bg-parchment-50/50 pl-9 pr-3 text-sm text-ink outline-none transition focus:border-bronze-400 focus:ring-2 focus:ring-bronze-200/60"
            />
          </div>
        </label>
        <label htmlFor="donations-status" className="w-full min-w-[180px] sm:w-auto">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">Status</span>
          <select
            id="donations-status"
            name="status"
            defaultValue={statusFilter ?? ''}
            className="h-10 min-w-[180px] rounded-xl border border-stone-300/80 bg-white px-3 text-sm text-ink outline-none transition focus:border-bronze-400 focus:ring-2 focus:ring-bronze-200/60"
          >
            <option value="">All</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="h-10 rounded-xl border border-stone-300/80 bg-white px-4 text-sm font-medium text-ink transition hover:border-bronze-300 hover:text-bronze-900"
        >
          Apply
        </button>
      </form>

      <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} empty="No donation records yet." />
      <AdminPagination
        page={listQuery.page}
        pageCount={pageCount}
        total={total}
        pageSize={listQuery.pageSize}
        basePath="/admin/member-donations"
        query={listQuery.query || undefined}
        extraParams={{ status: statusFilter }}
      />
    </AdminPageShell>
  );
}

export default AdminMemberDonationsPage;
