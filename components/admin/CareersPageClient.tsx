'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteCareerAction } from '@/app/(admin)/admin/(panel)/careers/actions';
import type { AdminContext } from '@/lib/auth/require-admin';

interface Row {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  isActive: boolean;
  editInitial: {
    title: string;
    location: string;
    employmentType: string;
    description: string;
    applyUrl: string;
    applyEmail: string;
    order: number;
    isActive: boolean;
  };
}

interface CareersPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function CareersPageClient({ user, rows }: CareersPageClientProps) {
  const router = useRouter();
  const openCreatePage = useCallback(() => router.push('/admin/careers/new'), [router]);
  const openEditPage = useCallback((row: Row) => router.push(`/admin/careers/${row.id}`), [router]);

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'role',
      header: 'Role',
      cell: (row) => (
        <div>
          <p className="font-medium text-ink">{row.title}</p>
          <p className="text-xs text-ink-muted">
            {row.location} · {row.employmentType}
          </p>
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
        <div
          className="flex items-center justify-end gap-1"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <DeleteActionButton action={deleteCareerAction} id={row.id} confirmText={`Delete “${row.title}”?`} />
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminPageShell
        user={user}
        topbarTitle="Careers"
        title="Open positions"
        description="Roles shown on /about/career."
        actions={
          <Button type="button" variant="primary" onClick={openCreatePage}>
            <Plus size={14} aria-hidden /> Add role
          </Button>
        }
      >
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} onRowClick={openEditPage} />
      </AdminPageShell>
    </>
  );
}
