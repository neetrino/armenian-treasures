import Link from 'next/link';
import type { Metadata } from 'next';
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
  searchParams: Promise<{ page?: string; q?: string }>;
}

async function AdminUsersPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAdmin();
  const listQuery = parseAdminListQuery(searchParams);
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
    listAdminMembers(where, listQuery.skip, listQuery.pageSize),
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
      header: 'Donations',
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
      <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} empty="No registered users yet." />
      <AdminPagination
        page={listQuery.page}
        pageCount={pageCount}
        total={total}
        pageSize={listQuery.pageSize}
        basePath="/admin/users"
        query={listQuery.query || undefined}
      />
    </AdminPageShell>
  );
}

export default AdminUsersPage;
