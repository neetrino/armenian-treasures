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
  createUiId,
  DEFAULT_HOME_TECH_CARD,
  getNestedFieldError,
  HOME_TECH_CARDS_MAX,
  stripTechCardUiIds,
  SUGGESTED_TECH_ICONS,
  withTechCardUiIds,
  type HomeTechCard,
  type HomeTechCardUiItem,
} from '@/lib/types/home-content';

interface HomeTechCardsEditorProps {
  techCards: HomeTechCard[];
  onChange: (techCards: HomeTechCard[]) => void;
  sectionError?: string;
  fieldErrors?: Record<string, string>;
}

interface SortableTechCardProps {
  card: HomeTechCardUiItem;
  index: number;
  total: number;
  fieldErrors?: Record<string, string>;
  onUpdate: (uiId: string, patch: Partial<HomeTechCard>) => void;
  onRemove: (uiId: string) => void;
  overlay?: boolean;
}

function SortableTechCard({
  card,
  index,
  total,
  fieldErrors,
  onUpdate,
  onRemove,
  overlay = false,
}: SortableTechCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.uiId, disabled: overlay });

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
          <p className="text-sm font-medium text-ink">Card {index + 1}</p>
        </div>
        {!overlay ? (
          <button
            type="button"
            disabled={total <= 1}
            onClick={() => onRemove(card.uiId)}
            aria-label={`Remove card ${index + 1}`}
            title={`Remove card ${index + 1}`}
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
          value={card.title}
          onChange={(event) => onUpdate(card.uiId, { title: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'techCards', index, 'title')}
        />
        <TextareaField
          label="Description"
          required
          rows={3}
          maxLength={400}
          value={card.description}
          onChange={(event) => onUpdate(card.uiId, { description: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'techCards', index, 'description')}
        />
        <TextField
          label="Icon"
          required
          maxLength={40}
          value={card.icon}
          onChange={(event) => onUpdate(card.uiId, { icon: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'techCards', index, 'icon')}
        />
        {!overlay ? (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-ink-muted">Suggestions:</span>
            {SUGGESTED_TECH_ICONS.map((iconName) => (
              <button
                key={iconName}
                type="button"
                onClick={() => onUpdate(card.uiId, { icon: iconName })}
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

export function HomeTechCardsEditor(props: HomeTechCardsEditorProps) {
  return (
    <ClientMounted fallback={<p className="text-sm text-ink-muted">Loading technology cards editor…</p>}>
      <HomeTechCardsEditorInner {...props} />
    </ClientMounted>
  );
}

function HomeTechCardsEditorInner({
  techCards,
  onChange,
  sectionError,
  fieldErrors,
}: HomeTechCardsEditorProps) {
  const {
    localItems,
    commitItems,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useHomeContentSortableItems({
    items: techCards,
    onChange,
    withUiIds: withTechCardUiIds,
    stripUiIds: stripTechCardUiIds,
  });

  const activeItem = activeId ? localItems.find((item) => item.uiId === activeId) : null;
  const activeIndex = activeItem ? localItems.findIndex((item) => item.uiId === activeItem.uiId) : -1;

  const updateCard = (uiId: string, patch: Partial<HomeTechCard>): void => {
    commitItems(localItems.map((item) => (item.uiId === uiId ? { ...item, ...patch } : item)));
  };

  const removeCard = (uiId: string): void => {
    if (localItems.length <= 1) return;
    commitItems(localItems.filter((item) => item.uiId !== uiId));
  };

  const addCard = (): void => {
    if (localItems.length >= HOME_TECH_CARDS_MAX) return;
    commitItems([...localItems, { ...DEFAULT_HOME_TECH_CARD, uiId: createUiId() }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-ink-muted">
        Use lucide-react icon names, for example Building2, Camera, Sparkles.
      </p>

      <HomeContentDndContext
        id="home-content-tech-cards"
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={localItems.map((item) => item.uiId)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4">
            {localItems.map((card, index) => (
              <SortableTechCard
                key={card.uiId}
                card={card}
                index={index}
                total={localItems.length}
                fieldErrors={fieldErrors}
                onUpdate={updateCard}
                onRemove={removeCard}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={homeContentDropAnimation}>
          {activeItem && activeIndex >= 0 ? (
            <SortableTechCard
              card={activeItem}
              index={activeIndex}
              total={localItems.length}
              fieldErrors={fieldErrors}
              onUpdate={updateCard}
              onRemove={removeCard}
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
          disabled={localItems.length >= HOME_TECH_CARDS_MAX}
          onClick={addCard}
        >
          Add technology card
        </Button>
      </div>
    </div>
  );
}
