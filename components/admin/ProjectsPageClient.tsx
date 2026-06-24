'use client';

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminModal } from '@/components/admin/AdminModal';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { InlineRaisedAmountCell } from '@/components/admin/InlineRaisedAmountCell';
import { DeleteIconButton } from '@/components/admin/DeleteIconButton';
import { StatusPill } from '@/components/ui/StatusPill';
import { Button } from '@/components/ui/Button';
import { deleteProjectAction } from '@/app/(admin)/admin/(panel)/projects/actions';
import type { AdminContext } from '@/lib/auth/require-admin';
import { formatCurrency } from '@/lib/utils';

interface ProjectFormInitial {
  title: string;
  slug: string;
  category: string;
  region: string;
  description: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  status: string;
  order: number;
  isPublished: boolean;
}

interface Row {
  id: string;
  title: string;
  category: string;
  region: string | null;
  status: 'UPCOMING' | 'ACTIVE' | 'FUNDED' | 'COMPLETED' | 'ARCHIVED';
  goalAmount: number;
  raisedAmount: number;
  editInitial: ProjectFormInitial;
}

interface ProjectsPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function ProjectsPageClient({ user, rows }: ProjectsPageClientProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [raisedById, setRaisedById] = useState<Record<string, number>>(() =>
    Object.fromEntries(rows.map((row) => [row.id, row.raisedAmount])),
  );

  useEffect(() => {
    setRaisedById(Object.fromEntries(rows.map((row) => [row.id, row.raisedAmount])));
  }, [rows]);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);
  const openEditModal = useCallback((row: Row) => setEditingRow(row), []);
  const closeEditModal = useCallback(() => setEditingRow(null), []);

  const handleModalSuccess = useCallback(() => {
    setIsCreateModalOpen(false);
    setEditingRow(null);
    router.refresh();
  }, [router]);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProjectAction(id);
      router.refresh();
    },
    [router],
  );

  const handleEditClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>, row: Row) => {
      event.stopPropagation();
      openEditModal(row);
    },
    [openEditModal],
  );

  const handleRaisedSaved = useCallback((id: string, raisedAmount: number) => {
    setRaisedById((prev) => ({ ...prev, [id]: raisedAmount }));
  }, []);

  const columns: AdminTableColumn<Row>[] = useMemo(
    () => [
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
        key: 'raised',
        header: 'Raised',
        cell: (row) => (
          <InlineRaisedAmountCell
            projectId={row.id}
            value={raisedById[row.id] ?? row.raisedAmount}
            onSaved={(amount) => handleRaisedSaved(row.id, amount)}
          />
        ),
      },
      {
        key: 'goal',
        header: 'Goal',
        cell: (row) => (
          <span className="text-xs text-ink-soft">{formatCurrency(row.goalAmount)}</span>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        align: 'right',
        cell: (row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              aria-label="Edit project"
              onClick={(event) => handleEditClick(event, row)}
              className="inline-flex items-center justify-center rounded-md p-1.5 text-ink-soft transition hover:bg-stone-100 hover:text-ink"
            >
              <Pencil size={14} aria-hidden />
            </button>
            <DeleteIconButton
              action={handleDelete}
              id={row.id}
              ariaLabel="Delete project"
              confirmMessage={`Delete “${row.title}”? This cannot be undone.`}
            />
          </div>
        ),
      },
    ],
    [handleEditClick, handleRaisedSaved, raisedById, handleDelete],
  );

  return (
    <>
      <AdminTopbar title="Projects" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <AdminPageHeader
          title="Projects"
          description="Funding campaigns shown on the public /projects page."
          actions={
            <Button type="button" variant="primary" onClick={openCreateModal}>
              <Plus size={14} aria-hidden /> Add project
            </Button>
          }
        />
        <AdminTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          onRowClick={openEditModal}
        />
      </div>
      {isCreateModalOpen ? (
        <AdminModal eyebrow="Projects" title="Create project" onClose={closeCreateModal} maxWidthClass="max-w-3xl">
          <ProjectForm mode="create" onSuccess={handleModalSuccess} onCancel={closeCreateModal} />
        </AdminModal>
      ) : null}
      {editingRow ? (
        <AdminModal
          eyebrow="Projects"
          title="Edit project"
          description={editingRow.title}
          onClose={closeEditModal}
          maxWidthClass="max-w-3xl"
        >
          <ProjectForm
            key={editingRow.id}
            mode="edit"
            itemId={editingRow.id}
            initial={editingRow.editInitial}
            onSuccess={handleModalSuccess}
            onCancel={closeEditModal}
          />
        </AdminModal>
      ) : null}
    </>
  );
}
