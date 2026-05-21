import Link from 'next/link';
import type { Metadata } from 'next';
import { Pencil, Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { StatusPill } from '@/components/ui/StatusPill';
import { ButtonLink } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteProjectAction } from '@/app/(admin)/admin/(panel)/projects/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Projects', robots: { index: false, follow: false } };

interface Row {
  id: string;
  title: string;
  category: string;
  region: string | null;
  status: 'UPCOMING' | 'ACTIVE' | 'FUNDED' | 'COMPLETED' | 'ARCHIVED';
  goalAmount: number;
  raisedAmount: number;
}

async function AdminProjectsPage() {
  const user = await requireAdmin();
  const rows = (await prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })) as Row[];

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'title',
      header: 'Project',
      cell: (row) => (
        <div>
          <p className="font-medium text-ink">{row.title}</p>
          <p className="text-xs text-ink-muted">
            {row.category}
            {row.region ? ` · ${row.region}` : ''}
          </p>
        </div>
      ),
    },
    { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status} /> },
    {
      key: 'funding',
      header: 'Funding',
      cell: (row) => (
        <span className="text-xs text-ink-soft">
          {formatCurrency(row.raisedAmount)} <span className="text-ink-muted">/ {formatCurrency(row.goalAmount)}</span>
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/projects/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton action={deleteProjectAction} id={row.id} confirmText={`Delete “${row.title}”?`} />
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminTopbar title="Projects" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Projects"
          description="Funding campaigns shown on the public /projects page."
          actions={
            <ButtonLink href="/admin/projects/new" variant="primary">
              <Plus size={14} aria-hidden /> Add project
            </ButtonLink>
          }
        />
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} />
      </div>
    </>
  );
}

export default AdminProjectsPage;
