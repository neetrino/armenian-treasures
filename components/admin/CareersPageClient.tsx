'use client';

import { useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { deleteCareerAction, reorderCareersAction } from '@/app/(admin)/admin/(panel)/careers/actions';
import type { AdminContext } from '@/lib/auth/require-admin';
import { cn } from '@/lib/utils';

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

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Careers"
      title="Open positions"
      description="Roles on /about/career. Drag a row to change the public order."
      actions={
        <Button type="button" variant="primary" onClick={openCreatePage}>
          <Plus size={14} aria-hidden /> Add role
        </Button>
      }
    >
      <SortableAdminList
        items={rows}
        persist={reorderCareersAction}
        empty="No open positions yet."
        renderItem={(row, handle, overlay) => (
          <CareerSortableRow
            row={row}
            handle={handle}
            overlay={overlay}
            onEdit={() => openEditPage(row)}
          />
        )}
      />
    </AdminPageShell>
  );
}

function CareerSortableRow({
  row,
  handle,
  overlay,
  onEdit,
}: {
  row: Row;
  handle: ReactNode;
  overlay: boolean;
  onEdit: () => void;
}) {
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
          {row.location} · {row.employmentType}
        </p>
      </button>
      {row.isActive ? <Badge tone="green">Active</Badge> : <Badge>Hidden</Badge>}
      {overlay ? null : (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Edit role"
            onClick={onEdit}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-ink-soft transition hover:bg-stone-100 hover:text-ink"
          >
            <Pencil size={14} aria-hidden />
          </button>
          <DeleteActionButton action={deleteCareerAction} id={row.id} confirmText={`Delete “${row.title}”?`} />
        </div>
      )}
    </div>
  );
}
