'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminModal } from '@/components/admin/AdminModal';
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
}

interface DonatorsPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function DonatorsPageClient({ user, rows }: DonatorsPageClientProps) {
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
      <AdminPageShell
        user={user}
        topbarTitle="Donators"
        title="Donators"
        description="Donors and partners shown on /donators."
        actions={
          <Button type="button" variant="primary" onClick={openCreateModal}>
            <Plus size={14} aria-hidden /> Add donator
          </Button>
        }
      >
        <AdminTable columns={columns} rows={rows} getRowId={(row) => row.id} />
      </AdminPageShell>
      {isCreateModalOpen ? (
        <AdminModal eyebrow="Donators" title="Create donator" onClose={closeCreateModal}>
          <DonatorForm mode="create" onSuccess={handleSuccess} onCancel={closeCreateModal} />
        </AdminModal>
      ) : null}
    </>
  );
}
