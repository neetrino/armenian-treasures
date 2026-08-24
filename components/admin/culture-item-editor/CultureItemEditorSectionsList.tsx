'use client';

import { useState, type HTMLAttributes, type ReactNode } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
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
import { CultureItemEditorSection } from '@/components/admin/culture-item-editor/CultureItemEditorSection';
import {
  CULTURE_ITEM_EDITOR_SECTIONS,
  type CultureItemEditorSectionId,
} from '@/lib/admin/culture-item-editor-sections';

interface CultureItemEditorSectionsListProps {
  sectionOrder: CultureItemEditorSectionId[];
  onSectionOrderChange: (order: CultureItemEditorSectionId[]) => void;
  renderSection: (id: CultureItemEditorSectionId) => ReactNode;
}

interface SortableCultureItemSectionProps {
  sectionId: CultureItemEditorSectionId;
  displayNumber: number;
  renderSection: (id: CultureItemEditorSectionId) => ReactNode;
  overlay?: boolean;
}

function SortableCultureItemSection({
  sectionId,
  displayNumber,
  renderSection,
  overlay = false,
}: SortableCultureItemSectionProps) {
  const definition = CULTURE_ITEM_EDITOR_SECTIONS[sectionId];
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sectionId, disabled: overlay });

  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  const dragHandleProps = {
    ref: setActivatorNodeRef,
    ...attributes,
    ...listeners,
  } as HTMLAttributes<HTMLButtonElement>;

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={isDragging && !overlay ? 'opacity-40' : undefined}
    >
      <CultureItemEditorSection
        number={displayNumber}
        title={definition.title}
        description={definition.description}
        unlimited={definition.unlimited}
        dragHandleProps={dragHandleProps}
        overlay={overlay}
      >
        {renderSection(sectionId)}
      </CultureItemEditorSection>
    </div>
  );
}

export function CultureItemEditorSectionsList({
  sectionOrder,
  onSectionOrderChange,
  renderSection,
}: CultureItemEditorSectionsListProps) {
  const [activeId, setActiveId] = useState<CultureItemEditorSectionId | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent): void {
    const id = String(event.active.id);
    if (id in CULTURE_ITEM_EDITOR_SECTIONS) {
      setActiveId(id as CultureItemEditorSectionId);
    }
  }

  function handleDragEnd(event: DragEndEvent): void {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(active.id as CultureItemEditorSectionId);
    const newIndex = sectionOrder.indexOf(over.id as CultureItemEditorSectionId);
    if (oldIndex < 0 || newIndex < 0) return;
    onSectionOrderChange(arrayMove(sectionOrder, oldIndex, newIndex));
  }

  const activeIndex = activeId ? sectionOrder.indexOf(activeId) : -1;

  return (
    <>
      <input type="hidden" name="sectionOrder" value={sectionOrder.join(',')} />
      <DndContext
        id="culture-item-editor-sections"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4">
            {sectionOrder.map((sectionId, index) => (
              <SortableCultureItemSection
                key={sectionId}
                sectionId={sectionId}
                displayNumber={index + 1}
                renderSection={renderSection}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId && activeIndex >= 0 ? (
            <SortableCultureItemSection
              sectionId={activeId}
              displayNumber={activeIndex + 1}
              renderSection={renderSection}
              overlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
