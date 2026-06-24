'use client';

import type { ReactNode } from 'react';
import {
  DndContext,
  closestCenter,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';

interface HomeContentDndContextProps {
  id: string;
  sensors: ReturnType<typeof useSensors>;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragCancel: () => void;
  children: ReactNode;
}

export function HomeContentDndContext({
  id,
  sensors,
  onDragStart,
  onDragEnd,
  onDragCancel,
  children,
}: HomeContentDndContextProps) {
  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      {children}
    </DndContext>
  );
}
