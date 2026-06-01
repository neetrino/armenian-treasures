'use client';

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import {
  KeyboardSensor,
  PointerSensor,
  defaultDropAnimation,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export function useHomeContentSortableItems<TItem, TUiItem extends TItem & { uiId: string }>({
  items,
  onChange,
  withUiIds,
  stripUiIds,
}: {
  items: TItem[];
  onChange: (items: TItem[]) => void;
  withUiIds: (items: TItem[]) => TUiItem[];
  stripUiIds: (items: TUiItem[]) => TItem[];
}): {
  localItems: TUiItem[];
  setLocalItems: Dispatch<SetStateAction<TUiItem[]>>;
  commitItems: (next: TUiItem[]) => void;
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
  sensors: ReturnType<typeof useSensors>;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: () => void;
} {
  const [localItems, setLocalItems] = useState(() => withUiIds(items));
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastEmitted = useRef<string | null>(null);

  useEffect(() => {
    const serialized = JSON.stringify(items);
    if (serialized === lastEmitted.current) return;
    setLocalItems(withUiIds(items));
    lastEmitted.current = null;
  }, [items, withUiIds]);

  const commitItems = (next: TUiItem[]): void => {
    const stripped = stripUiIds(next);
    lastEmitted.current = JSON.stringify(stripped);
    setLocalItems(next);
    onChange(stripped);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalItems((current) => {
      const oldIndex = current.findIndex((item) => item.uiId === active.id);
      const newIndex = current.findIndex((item) => item.uiId === over.id);
      if (oldIndex < 0 || newIndex < 0) return current;
      const reordered = arrayMove(current, oldIndex, newIndex);
      const stripped = stripUiIds(reordered);
      lastEmitted.current = JSON.stringify(stripped);
      onChange(stripped);
      return reordered;
    });
  };

  const handleDragCancel = (): void => {
    setActiveId(null);
  };

  return {
    localItems,
    setLocalItems,
    commitItems,
    activeId,
    setActiveId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}

export const homeContentDropAnimation = defaultDropAnimation;
