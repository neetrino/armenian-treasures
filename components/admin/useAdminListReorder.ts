'use client';

import { useEffect, useState } from 'react';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export interface ListReorderResult {
  ok: boolean;
  message?: string;
}

interface UseAdminListReorderOptions<T extends { id: string }> {
  source: T[];
  persist: (orderedIds: string[]) => Promise<ListReorderResult>;
  canMove?: (items: T[], fromIndex: number, toIndex: number) => boolean;
  rejectMessage?: string;
}

export function useAdminListReorder<T extends { id: string }>({
  source,
  persist,
  canMove,
  rejectMessage = 'These rows cannot be reordered.',
}: UseAdminListReorderOptions<T>) {
  const [items, setItems] = useState(source);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setItems(source);
  }, [source]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(String(event.active.id));
    setSaveError(null);
  }

  function handleDragCancel(): void {
    setActiveId(null);
  }

  function handleDragEnd(event: DragEndEvent): void {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    if (canMove && !canMove(items, oldIndex, newIndex)) {
      setSaveError(rejectMessage);
      return;
    }

    const reordered = arrayMove(items, oldIndex, newIndex);
    const snapshot = items;
    setItems(reordered);
    void persist(reordered.map((item) => item.id)).then((result) => {
      if (!result.ok) {
        setItems(snapshot);
        setSaveError(result.message ?? 'Could not save order.');
      }
    });
  }

  const activeItem = activeId ? (items.find((item) => item.id === activeId) ?? null) : null;

  return {
    items,
    activeItem,
    sensors,
    saveError,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
