import Link from 'next/link';
import type { Metadata } from 'next';
import { Pencil, Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteDonatorAction } from '@/app/(admin)/admin/(panel)/donators/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Donators', robots: { index: false, follow: false } };

interface Row {
  id: string;
  name: string;
  type: string;
  year: number | null;
  isPublic: boolean;
}

async function AdminDonatorsPage() {
  const user = await requireAdmin();
  const rows = (await prisma.donator.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] })) as Row[];
  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'name',
      header: 'Donator',
      cell: (row) => (
        <div>
          <p className="font-medium text-ink">{row.name}</p>
          <p className="text-xs text-ink-muted">{row.type}{row.year ? ` · ${row.year}` : ''}</p>
        </div>
      ),
    },
    {
      key: 'isPublic',
      header: 'Public',
      cell: (row) => (row.isPublic ? <Badge tone="green">Visible</Badge> : <Badge>Hidden</Badge>),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/donators/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton action={deleteDonatorAction} id={row.id} confirmText={`Delete “${row.name}”?`} />
        </div>
      ),
    },
  ];
  return (
    <>
      <AdminTopbar title="Donators" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Donators"
          description="Donors and partners shown on /donators."
          actions={
            <ButtonLink href="/admin/donators/new" variant="primary">
              <Plus size={14} aria-hidden /> Add donator
            </ButtonLink>
          }
        />
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} />
      </div>
    </>
  );
}

export default AdminDonatorsPage;
