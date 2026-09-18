'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  defaultDropAnimation,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Plus } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { SortableDragHandle } from '@/components/admin/SortableDragHandle';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import {
  deleteTeamMemberAction,
  reorderTeamMembersAction,
} from '@/app/(admin)/admin/(panel)/team/actions';
import type { AdminContext } from '@/lib/auth/require-admin';
import { cn } from '@/lib/utils';

interface Row {
  id: string;
  name: string;
  initials: string;
  position: string;
  isActive: boolean;
}

interface TeamPageClientProps {
  user: AdminContext;
  rows: Row[];
}

export function TeamPageClient({ user, rows }: TeamPageClientProps) {
  const [items, setItems] = useState(rows);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setItems(rows);
  }, [rows]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(String(event.active.id));
    setSaveError(null);
  }

  function handleDragEnd(event: DragEndEvent): void {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const reordered = arrayMove(items, oldIndex, newIndex);
    const snapshot = items;
    setItems(reordered);

    void reorderTeamMembersAction(reordered.map((item) => item.id)).then((result) => {
      if (!result.ok) {
        setItems(snapshot);
        setSaveError(result.message);
      }
    });
  }

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null;

  return (
    <AdminPageShell
      user={user}
      topbarTitle="Team"
      title="Team members"
      description="People shown on the public /about/team page. Drag to reorder. Edit each member in every language."
      actions={
        <ButtonLink href="/admin/team/new" variant="primary">
          <Plus size={14} aria-hidden /> Add member
        </ButtonLink>
      }
    >
      {saveError ? (
        <p className="mb-3 text-xs text-pomegranate" role="alert">
          {saveError}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-200 bg-white px-4 py-10 text-center text-sm text-ink-muted">
          No team members yet.
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <ul className="flex flex-col gap-2">
              {items.map((row) => (
                <SortableTeamRow key={row.id} row={row} />
              ))}
            </ul>
          </SortableContext>
          <DragOverlay dropAnimation={defaultDropAnimation}>
            {activeItem ? <TeamRowSurface row={activeItem} overlay /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </AdminPageShell>
  );
}

function SortableTeamRow({ row }: { row: Row }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: row.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && 'opacity-40')}
    >
      <TeamRowSurface
        row={row}
        dragHandleRef={setActivatorNodeRef}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </li>
  );
}

interface TeamRowSurfaceProps {
  row: Row;
  overlay?: boolean;
  dragHandleRef?: (element: HTMLButtonElement | null) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

function TeamRowSurface({ row, overlay = false, dragHandleRef, dragHandleProps }: TeamRowSurfaceProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-3 py-3 shadow-sm sm:px-4',
        overlay && 'shadow-lg ring-1 ring-bronze-300/40',
      )}
    >
      <SortableDragHandle ref={dragHandleRef} overlay={overlay} {...dragHandleProps} />
      <span
        aria-hidden
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pomegranate text-xs font-medium text-parchment-50"
      >
        {row.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{row.name}</p>
        <p className="truncate text-xs text-ink-muted">{row.position}</p>
      </div>
      {row.isActive ? <Badge tone="green">Active</Badge> : <Badge>Hidden</Badge>}
      {!overlay ? (
        <div className="flex shrink-0 items-center gap-1">
          <Link
            href={`/admin/team/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-stone-100"
          >
            <Pencil size={12} aria-hidden /> Edit
          </Link>
          <DeleteActionButton
            action={deleteTeamMemberAction}
            id={row.id}
            confirmText={`Delete “${row.name}”?`}
          />
        </div>
      ) : null}
    </div>
  );
}
