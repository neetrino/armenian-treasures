'use client';

import type { HTMLAttributes } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { SortableDragHandle } from '@/components/admin/SortableDragHandle';
import { ClientMounted } from '@/components/admin/ClientMounted';
import { HomeContentDndContext } from '@/components/admin/HomeContentDndContext';
import {
  homeContentDropAnimation,
  useHomeContentSortableItems,
} from '@/components/admin/useHomeContentSortableItems';
import { cn } from '@/lib/utils';
import {
  ABOUT_PILLARS_MAX,
  createUiId,
  DEFAULT_ABOUT_PILLAR,
  getNestedFieldError,
  stripPillarUiIds,
  SUGGESTED_PILLAR_ICONS,
  withPillarUiIds,
  type AboutPillar,
  type AboutPillarUiItem,
} from '@/lib/types/about-content';

interface AboutPillarsEditorProps {
  pillars: AboutPillar[];
  onChange: (pillars: AboutPillar[]) => void;
  sectionError?: string;
  fieldErrors?: Record<string, string>;
}

interface SortablePillarProps {
  pillar: AboutPillarUiItem;
  index: number;
  total: number;
  fieldErrors?: Record<string, string>;
  onUpdate: (uiId: string, patch: Partial<AboutPillar>) => void;
  onRemove: (uiId: string) => void;
  overlay?: boolean;
}

function SortablePillar({
  pillar,
  index,
  total,
  fieldErrors,
  onUpdate,
  onRemove,
  overlay = false,
}: SortablePillarProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pillar.uiId, disabled: overlay });

  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={cn(
        'rounded-xl border border-stone-100 bg-white p-4 shadow-sm transition',
        isDragging && !overlay && 'z-0 opacity-40',
        overlay && 'scale-[1.02] border-pomegranate/30 shadow-lg ring-1 ring-pomegranate/20',
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SortableDragHandle
            ref={overlay ? undefined : setActivatorNodeRef}
            overlay={overlay}
            {...(overlay ? {} : ({ ...attributes, ...listeners } as HTMLAttributes<HTMLButtonElement>))}
          />
          <p className="text-sm font-medium text-ink">Pillar {index + 1}</p>
        </div>
        {!overlay ? (
          <button
            type="button"
            disabled={total <= 1}
            onClick={() => onRemove(pillar.uiId)}
            aria-label={`Remove pillar ${index + 1}`}
            title={`Remove pillar ${index + 1}`}
            className={cn(
              'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white text-ink-soft shadow-sm transition',
              'hover:border-bronze-400 hover:text-pomegranate focus:outline-none focus:ring-2 focus:ring-bronze-500/30',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            <Trash2 size={16} aria-hidden />
          </button>
        ) : null}
      </div>
      <div className="flex flex-col gap-5">
        <TextField
          label="Title"
          required
          maxLength={120}
          value={pillar.title}
          onChange={(event) => onUpdate(pillar.uiId, { title: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'pillars', index, 'title')}
        />
        <TextareaField
          label="Description"
          required
          rows={3}
          maxLength={400}
          value={pillar.description}
          onChange={(event) => onUpdate(pillar.uiId, { description: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'pillars', index, 'description')}
        />
        <TextField
          label="Icon name"
          required
          maxLength={40}
          value={pillar.iconName}
          onChange={(event) => onUpdate(pillar.uiId, { iconName: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'pillars', index, 'iconName')}
        />
        {!overlay ? (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-ink-muted">Suggestions:</span>
            {SUGGESTED_PILLAR_ICONS.map((iconName) => (
              <button
                key={iconName}
                type="button"
                onClick={() => onUpdate(pillar.uiId, { iconName })}
                className="rounded-full border border-stone-200 bg-parchment-50 px-2.5 py-1 text-xs text-ink-soft transition hover:border-bronze-400 hover:text-ink"
              >
                {iconName}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AboutPillarsEditor(props: AboutPillarsEditorProps) {
  return (
    <ClientMounted fallback={<p className="text-sm text-ink-muted">Loading pillars editor…</p>}>
      <AboutPillarsEditorInner {...props} />
    </ClientMounted>
  );
}

function AboutPillarsEditorInner({
  pillars,
  onChange,
  sectionError,
  fieldErrors,
}: AboutPillarsEditorProps) {
  const {
    localItems,
    commitItems,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useHomeContentSortableItems({
    items: pillars,
    onChange,
    withUiIds: withPillarUiIds,
    stripUiIds: stripPillarUiIds,
  });

  const activeItem = activeId ? localItems.find((item) => item.uiId === activeId) : null;
  const activeIndex = activeItem ? localItems.findIndex((item) => item.uiId === activeItem.uiId) : -1;

  const updatePillar = (uiId: string, patch: Partial<AboutPillar>): void => {
    commitItems(localItems.map((item) => (item.uiId === uiId ? { ...item, ...patch } : item)));
  };

  const removePillar = (uiId: string): void => {
    if (localItems.length <= 1) return;
    commitItems(localItems.filter((item) => item.uiId !== uiId));
  };

  const addPillar = (): void => {
    if (localItems.length >= ABOUT_PILLARS_MAX) return;
    commitItems([...localItems, { ...DEFAULT_ABOUT_PILLAR, uiId: createUiId() }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-ink-muted">
        Use lucide-react icon names, for example ShieldCheck, BookOpen, Globe2.
      </p>

      <HomeContentDndContext
        id="about-content-pillars"
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={localItems.map((item) => item.uiId)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4">
            {localItems.map((pillar, index) => (
              <SortablePillar
                key={pillar.uiId}
                pillar={pillar}
                index={index}
                total={localItems.length}
                fieldErrors={fieldErrors}
                onUpdate={updatePillar}
                onRemove={removePillar}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={homeContentDropAnimation}>
          {activeItem && activeIndex >= 0 ? (
            <SortablePillar
              pillar={activeItem}
              index={activeIndex}
              total={localItems.length}
              fieldErrors={fieldErrors}
              onUpdate={updatePillar}
              onRemove={removePillar}
              overlay
            />
          ) : null}
        </DragOverlay>
      </HomeContentDndContext>

      {sectionError ? <p className="text-xs text-pomegranate">{sectionError}</p> : null}

      <div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={localItems.length >= ABOUT_PILLARS_MAX}
          onClick={addPillar}
        >
          Add pillar
        </Button>
      </div>
    </div>
  );
}
