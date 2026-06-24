'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { CareerForm } from '@/components/admin/CareerForm';
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
}

interface CareersPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function CareersPageClient({ user, rows }: CareersPageClientProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);
  const handleSuccess = useCallback(() => {
    closeCreateModal();
    router.refresh();
  }, [closeCreateModal, router]);

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
            <Button type="button" variant="primary" onClick={openCreateModal}>
              <Plus size={14} aria-hidden /> Add role
            </Button>
          }
        />
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} />
      </div>
      {isCreateModalOpen ? (
        <AdminModal eyebrow="Careers" title="Create role" onClose={closeCreateModal}>
          <CareerForm mode="create" onSuccess={handleSuccess} onCancel={closeCreateModal} />
        </AdminModal>
      ) : null}
    </>
  );
}
