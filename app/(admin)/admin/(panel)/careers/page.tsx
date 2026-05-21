import Link from 'next/link';
import type { Metadata } from 'next';
import { Pencil, Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteCareerAction } from '@/app/(admin)/admin/(panel)/careers/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Careers', robots: { index: false, follow: false } };

interface Row {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  isActive: boolean;
}

async function AdminCareersPage() {
  const user = await requireAdmin();
  const rows = (await prisma.career.findMany({ orderBy: [{ order: 'asc' }, { title: 'asc' }] })) as Row[];
  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'role',
      header: 'Role',
      cell: (row) => (
        <div>
          <p className="font-medium text-ink">{row.title}</p>
          <p className="text-xs text-ink-muted">{row.location} · {row.employmentType}</p>
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
            href={`/admin/careers/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton action={deleteCareerAction} id={row.id} confirmText={`Delete “${row.title}”?`} />
        </div>
      ),
    },
  ];
  return (
    <>
      <AdminTopbar title="Careers" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Open positions"
          description="Roles shown on /about/career."
          actions={
            <ButtonLink href="/admin/careers/new" variant="primary">
              <Plus size={14} aria-hidden /> Add role
            </ButtonLink>
          }
        />
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} />
      </div>
    </>
  );
}

export default AdminCareersPage;
