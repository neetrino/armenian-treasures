'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminSheet } from '@/components/admin/AdminSheet';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { DonatorForm } from '@/components/admin/DonatorForm';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteDonatorAction } from '@/app/(admin)/admin/(panel)/donators/actions';
import type { AdminContext } from '@/lib/auth/require-admin';

interface Row {
  id: string;
  name: string;
  type: string;
  year: number | null;
  isPublic: boolean;
  editInitial: {
    name: string;
    type: string;
    year: number | null;
    description: string;
    order: number;
    isPublic: boolean;
  };
}

interface DonatorsPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function DonatorsPageClient({ user, rows }: DonatorsPageClientProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);
  const handleSuccess = useCallback(() => {
    closeCreateModal();
    setEditingRow(null);
    router.refresh();
  }, [closeCreateModal, router]);
  const openEdit = useCallback((row: Row) => setEditingRow(row), []);
  const closeEdit = useCallback(() => setEditingRow(null), []);

  const columns: AdminTableColumn<Row>[] = [
    {
      key: 'name',
      header: 'Donator',
      cell: (row) => (
        <div>
          <p className="font-medium text-ink">{row.name}</p>
          <p className="text-xs text-ink-muted">
            {row.type}
            {row.year ? ` · ${row.year}` : ''}
          </p>
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
        <div
          className="flex items-center justify-end gap-1"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <DeleteActionButton action={deleteDonatorAction} id={row.id} confirmText={`Delete “${row.name}”?`} />
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminPageShell
        user={user}
        topbarTitle="Donators"
        title="Donators"
        description="Donors and partners shown on /donate."
        actions={
          <Button type="button" variant="primary" onClick={openCreateModal}>
            <Plus size={14} aria-hidden /> Add donator
          </Button>
        }
      >
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} onRowClick={openEdit} />
      </AdminPageShell>
      {isCreateModalOpen ? (
        <AdminModal eyebrow="Donators" title="Create donator" onClose={closeCreateModal}>
          <DonatorForm mode="create" onSuccess={handleSuccess} onCancel={closeCreateModal} />
        </AdminModal>
      ) : null}
      <AdminSheet
        open={editingRow !== null}
        onClose={closeEdit}
        eyebrow="Donators"
        title="Edit donator"
        description={editingRow?.name}
      >
        {editingRow ? (
          <DonatorForm
            key={editingRow.id}
            mode="edit"
            itemId={editingRow.id}
            initial={editingRow.editInitial}
            onSuccess={handleSuccess}
            onCancel={closeEdit}
          />
        ) : null}
      </AdminSheet>
    </>
  );
}
