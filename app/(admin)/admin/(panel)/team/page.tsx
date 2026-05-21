import Link from 'next/link';
import type { Metadata } from 'next';
import { Pencil, Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteTeamMemberAction } from '@/app/(admin)/admin/(panel)/team/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Team', robots: { index: false, follow: false } };

interface Row {
  id: string;
  name: string;
  initials: string;
  position: string;
  isActive: boolean;
}

async function AdminTeamPage() {
  const user = await requireAdmin();
  const rows = (await prisma.teamMember.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] })) as Row[];
  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'member',
      header: 'Member',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pomegranate text-parchment-50 text-xs font-medium">
            {row.initials}
          </span>
          <div>
            <p className="font-medium text-ink">{row.name}</p>
            <p className="text-xs text-ink-muted">{row.position}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'isActive',
      header: 'Visible',
      cell: (row) => (row.isActive ? <Badge tone="green">Active</Badge> : <Badge>Hidden</Badge>),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/team/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton action={deleteTeamMemberAction} id={row.id} confirmText={`Delete “${row.name}”?`} />
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminTopbar title="Team" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Team members"
          description="People shown on the public /about/team page."
          actions={
            <ButtonLink href="/admin/team/new" variant="primary">
              <Plus size={14} aria-hidden /> Add member
            </ButtonLink>
          }
        />
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} />
      </div>
    </>
  );
}

export default AdminTeamPage;
