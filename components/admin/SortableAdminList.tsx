'use client';

import type { ReactNode } from 'react';
import { DndContext, DragOverlay, closestCenter, defaultDropAnimation } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableDragHandle } from '@/components/admin/SortableDragHandle';
import { useAdminListReorder, type ListReorderResult } from '@/components/admin/useAdminListReorder';
import { cn } from '@/lib/utils';

const QUIET_HANDLE = 'border-transparent bg-transparent shadow-none';

interface SortableAdminListProps<T extends { id: string }> {
  items: T[];
  persist: (orderedIds: string[]) => Promise<ListReorderResult>;
  empty: ReactNode;
  layout?: 'stack' | 'grid';
  canMove?: (items: T[], fromIndex: number, toIndex: number) => boolean;
  rejectMessage?: string;
  trailing?: ReactNode;
  handleClassName?: string;
  renderItem: (item: T, handle: ReactNode, overlay: boolean, index: number) => ReactNode;
}

export function SortableAdminList<T extends { id: string }>({
  items: source,
  persist,
  empty,
  layout = 'stack',
  canMove,
  rejectMessage,
  trailing,
  handleClassName = QUIET_HANDLE,
  renderItem,
}: SortableAdminListProps<T>) {
  const reorder = useAdminListReorder({ source, persist, canMove, rejectMessage });
  const listClass = layout === 'grid' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'flex flex-col gap-2';

  if (reorder.items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300/70 bg-parchment-50/80 px-6 py-14 text-center text-sm text-ink-muted">
        {empty}
      </div>
    );
  }

  return (
    <div>
      {reorder.saveError ? (
        <p className="mb-3 text-xs text-pomegranate" role="alert">
          {reorder.saveError}
        </p>
      ) : null}
      <DndContext
        sensors={reorder.sensors}
        collisionDetection={closestCenter}
        onDragStart={reorder.handleDragStart}
        onDragEnd={reorder.handleDragEnd}
        onDragCancel={reorder.handleDragCancel}
      >
        <SortableContext
          items={reorder.items.map((item) => item.id)}
          strategy={layout === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}
        >
          <ul className={listClass}>
            {reorder.items.map((item, index) => (
              <SortableAdminRow key={item.id} id={item.id} handleClassName={handleClassName}>
                {(handle) => renderItem(item, handle, false, index)}
              </SortableAdminRow>
            ))}
            {trailing ? <li className="min-w-0 list-none">{trailing}</li> : null}
          </ul>
        </SortableContext>
        <DragOverlay dropAnimation={defaultDropAnimation}>
          {reorder.activeItem ? (
            <div className="cursor-grabbing">
              {renderItem(
                reorder.activeItem,
                <SortableDragHandle overlay className={handleClassName} />,
                true,
                0,
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function SortableAdminRow({
  id,
  handleClassName,
  children,
}: {
  id: string;
  handleClassName: string;
  children: (handle: ReactNode) => ReactNode;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const handle = (
    <SortableDragHandle
      ref={setActivatorNodeRef}
      className={handleClassName}
      {...attributes}
      {...listeners}
    />
  );

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('min-w-0', isDragging && 'opacity-40')}
    >
      {children(handle)}
    </li>
  );
}
