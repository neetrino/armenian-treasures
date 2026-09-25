'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { InlineRaisedAmountCell } from '@/components/admin/InlineRaisedAmountCell';
import { DeleteIconButton } from '@/components/admin/DeleteIconButton';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { StatusPill } from '@/components/ui/StatusPill';
import { Button } from '@/components/ui/Button';
import { deleteProjectAction, reorderProjectsAction } from '@/app/(admin)/admin/(panel)/projects/actions';
import type { AdminContext } from '@/lib/auth/require-admin';
import { cn, formatCurrency } from '@/lib/utils';

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
  const [raisedById, setRaisedById] = useState<Record<string, number>>(() =>
    Object.fromEntries(rows.map((row) => [row.id, row.raisedAmount])),
  );

  useEffect(() => {
    setRaisedById(Object.fromEntries(rows.map((row) => [row.id, row.raisedAmount])));
  }, [rows]);

  const openCreatePage = useCallback(() => router.push('/admin/projects/new'), [router]);
  const openEditPage = useCallback((row: Row) => router.push(`/admin/projects/${row.id}`), [router]);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProjectAction(id);
      router.refresh();
    },
    [router],
  );

  const handleRaisedSaved = useCallback((id: string, raisedAmount: number) => {
    setRaisedById((prev) => ({ ...prev, [id]: raisedAmount }));
  }, []);

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Projects"
      title="Projects"
      description="Funding campaigns on /projects. Drag a row to change the public order."
      size="wide"
      actions={
        <Button type="button" variant="primary" onClick={openCreatePage}>
          <Plus size={14} aria-hidden /> Add project
        </Button>
      }
    >
      <SortableAdminList
        items={rows}
        persist={reorderProjectsAction}
        empty="No projects yet."
        renderItem={(row, handle, overlay) => (
          <ProjectSortableRow
            row={row}
            handle={handle}
            overlay={overlay}
            raised={raisedById[row.id] ?? row.raisedAmount}
            onEdit={() => openEditPage(row)}
            onDelete={handleDelete}
            onRaisedSaved={(amount) => handleRaisedSaved(row.id, amount)}
          />
        )}
      />
    </AdminPageShell>
  );
}

interface ProjectSortableRowProps {
  row: Row;
  handle: ReactNode;
  overlay: boolean;
  raised: number;
  onEdit: () => void;
  onDelete: (id: string) => Promise<void>;
  onRaisedSaved: (amount: number) => void;
}

function ProjectSortableRow({
  row,
  handle,
  overlay,
  raised,
  onEdit,
  onDelete,
  onRaisedSaved,
}: ProjectSortableRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-3 py-3 shadow-sm sm:px-4',
        overlay && 'shadow-lg ring-1 ring-bronze-300/40',
      )}
    >
      {handle}
      <button type="button" onClick={onEdit} className="min-w-0 flex-1 text-left">
        <p className="truncate font-medium text-ink">{row.title}</p>
        <p className="truncate text-xs text-ink-muted">
          {row.category}
          {row.region ? ` · ${row.region}` : ''}
        </p>
      </button>
      <StatusPill status={row.status} />
      <InlineRaisedAmountCell projectId={row.id} value={raised} onSaved={onRaisedSaved} />
      <span className="hidden text-xs text-ink-soft sm:inline">{formatCurrency(row.goalAmount)}</span>
      {overlay ? null : (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Edit project"
            onClick={onEdit}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-ink-soft transition hover:bg-stone-100 hover:text-ink"
          >
            <Pencil size={14} aria-hidden />
          </button>
          <DeleteIconButton
            action={onDelete}
            id={row.id}
            ariaLabel="Delete project"
            confirmMessage={`Delete “${row.title}”? This cannot be undone.`}
          />
        </div>
      )}
    </div>
  );
}
