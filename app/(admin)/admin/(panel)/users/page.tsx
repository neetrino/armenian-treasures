import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteMemberAction } from '@/app/(admin)/admin/(panel)/users/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { buildAdminPageCount, parseAdminListQuery } from '@/lib/admin/list-query';
import { getCountryLabel } from '@/lib/constants/countries';
import { listAdminMembers, type AdminMemberListRow } from '@/lib/queries/admin-members';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Users', robots: { index: false, follow: false } };

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; donationSort?: string }>;
}

async function AdminUsersPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAdmin();
  const listQuery = parseAdminListQuery(searchParams);
  const donationSort =
    searchParams.donationSort === 'asc' || searchParams.donationSort === 'desc'
      ? searchParams.donationSort
      : undefined;
  const nextDonationSort = donationSort === 'desc' ? 'asc' : 'desc';
  const donationSortParams = new URLSearchParams();
  if (listQuery.query) donationSortParams.set('q', listQuery.query);
  donationSortParams.set('donationSort', nextDonationSort);
  const donationSortHref = `/admin/users?${donationSortParams.toString()}`;
  const DonationSortIcon = donationSort === 'asc' ? ArrowUp : donationSort === 'desc' ? ArrowDown : ArrowUpDown;
  const where: Prisma.MemberWhereInput = listQuery.query
    ? {
        OR: [
          { name: { contains: listQuery.query, mode: 'insensitive' } },
          { surname: { contains: listQuery.query, mode: 'insensitive' } },
          { email: { contains: listQuery.query, mode: 'insensitive' } },
          { phone: { contains: listQuery.query, mode: 'insensitive' } },
          { country: { contains: listQuery.query, mode: 'insensitive' } },
        ],
      }
    : {};

  const [rows, total] = await Promise.all([
    listAdminMembers(where, listQuery.skip, listQuery.pageSize, { donationSort }),
    prisma.member.count({ where }),
  ]);

  const pageCount = buildAdminPageCount(total, listQuery.pageSize);
  const columns: AdminTableColumn<AdminMemberListRow>[] = [
    {
      key: 'member',
      header: 'Member',
      cell: (row) => (
        <Link
          href={`/admin/users/${row.id}`}
          className="flex flex-col text-left text-ink hover:text-pomegranate"
        >
          <span className="font-medium">
            {row.name} {row.surname}
          </span>
          <span className="text-xs text-ink-muted">{row.email}</span>
        </Link>
      ),
    },
    {
      key: 'country',
      header: 'Country',
      cell: (row) => <span className="text-sm text-ink-soft">{getCountryLabel(row.country)}</span>,
    },
    {
      key: 'phone',
      header: 'Phone',
      cell: (row) => <span className="text-sm text-ink-soft">{row.phone}</span>,
    },
    {
      key: 'donations',
      header: (
        <Link
          href={donationSortHref}
          className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-ink"
          aria-label="Sort by donations"
        >
          <span>Donations</span>
          <DonationSortIcon size={13} aria-hidden />
        </Link>
      ),
      cell: (row) => <span className="text-sm text-ink-soft">{row.donationCount}</span>,
    },
    {
      key: 'registered',
      header: 'Registered',
      cell: (row) => (
        <span className="text-xs text-ink-muted">{row.createdAt.toLocaleString()}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <DeleteActionButton
          action={deleteMemberAction}
          id={row.id}
          confirmText={`Delete member “${row.name} ${row.surname}”? This removes their donation history.`}
        />
      ),
    },
  ];

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Users"
      title="Registered users"
      description="Members who signed up on the public site. View profiles, donation history, and remove accounts when needed."
      size="wide"
    >
      <form action="/admin/users" method="get" className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-stone-200/70 bg-white/95 p-4 shadow-card">
        <label htmlFor="users-search" className="min-w-[240px] flex-1">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">Search</span>
          <div className="relative">
            <Search size={14} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              id="users-search"
              name="q"
              defaultValue={listQuery.query}
              placeholder="Search by name, email, phone, country..."
              className="h-10 w-full rounded-xl border border-stone-300/80 bg-parchment-50/50 pl-9 pr-3 text-sm text-ink outline-none transition focus:border-bronze-400 focus:ring-2 focus:ring-bronze-200/60"
            />
          </div>
        </label>
        {donationSort ? <input type="hidden" name="donationSort" value={donationSort} /> : null}
        <button
          type="submit"
          className="h-10 rounded-xl border border-stone-300/80 bg-white px-4 text-sm font-medium text-ink transition hover:border-bronze-300 hover:text-bronze-900"
        >
          Search
        </button>
      </form>
      <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} empty="No registered users yet." />
      <AdminPagination
        page={listQuery.page}
        pageCount={pageCount}
        total={total}
        pageSize={listQuery.pageSize}
        basePath="/admin/users"
        query={listQuery.query || undefined}
        extraParams={{ donationSort }}
      />
    </AdminPageShell>
  );
}

export default AdminUsersPage;

