'use client';

import type { HTMLAttributes } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { TextField } from '@/components/forms/fields/TextField';
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
  DEFAULT_HOME_STAT,
  getNestedFieldError,
  HOME_STATS_MAX,
  stripStatUiIds,
  withStatUiIds,
  type HomeStat,
  type HomeStatUiItem,
} from '@/lib/types/home-content';

interface HomeStatsEditorProps {
  stats: HomeStat[];
  onChange: (stats: HomeStat[]) => void;
  sectionError?: string;
  fieldErrors?: Record<string, string>;
}

interface SortableStatCardProps {
  stat: HomeStatUiItem;
  index: number;
  total: number;
  fieldErrors?: Record<string, string>;
  onUpdate: (uiId: string, patch: Partial<HomeStat>) => void;
  onRemove: (uiId: string) => void;
  overlay?: boolean;
}

function SortableStatCard({
  stat,
  index,
  total,
  fieldErrors,
  onUpdate,
  onRemove,
  overlay = false,
}: SortableStatCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stat.uiId, disabled: overlay });

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
        'flex flex-col rounded-xl border border-stone-100 bg-white p-4 shadow-sm transition',
        isDragging && !overlay && 'z-0 opacity-40',
        overlay && 'scale-[1.02] border-pomegranate/30 shadow-lg ring-1 ring-pomegranate/20',
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SortableDragHandle
            ref={overlay ? undefined : setActivatorNodeRef}
            overlay={overlay}
            {...(overlay ? {} : ({ ...attributes, ...listeners } as HTMLAttributes<HTMLButtonElement>))}
          />
          <p className="text-sm font-medium text-ink">Stat {index + 1}</p>
        </div>
        {!overlay ? (
          <button
            type="button"
            disabled={total <= 1}
            onClick={() => onRemove(stat.uiId)}
            aria-label={`Remove stat ${index + 1}`}
            title={`Remove stat ${index + 1}`}
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
      <div className="flex flex-col gap-3">
        <TextField
          label="Value"
          required
          maxLength={20}
          value={stat.value}
          onChange={(event) => onUpdate(stat.uiId, { value: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'stats', index, 'value')}
        />
        <TextField
          label="Label"
          required
          maxLength={60}
          value={stat.label}
          onChange={(event) => onUpdate(stat.uiId, { label: event.target.value })}
          error={getNestedFieldError(fieldErrors, 'stats', index, 'label')}
        />
      </div>
    </div>
  );
}

export function HomeStatsEditor(props: HomeStatsEditorProps) {
  return (
    <ClientMounted fallback={<p className="text-sm text-ink-muted">Loading stats editor…</p>}>
      <HomeStatsEditorInner {...props} />
    </ClientMounted>
  );
}

function HomeStatsEditorInner({ stats, onChange, sectionError, fieldErrors }: HomeStatsEditorProps) {
  const {
    localItems,
    commitItems,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useHomeContentSortableItems({
    items: stats,
    onChange,
    withUiIds: withStatUiIds,
    stripUiIds: stripStatUiIds,
  });

  const activeItem = activeId ? localItems.find((item) => item.uiId === activeId) : null;
  const activeIndex = activeItem ? localItems.findIndex((item) => item.uiId === activeItem.uiId) : -1;

  const updateStat = (uiId: string, patch: Partial<HomeStat>): void => {
    commitItems(localItems.map((item) => (item.uiId === uiId ? { ...item, ...patch } : item)));
  };

  const removeStat = (uiId: string): void => {
    if (localItems.length <= 1) return;
    commitItems(localItems.filter((item) => item.uiId !== uiId));
  };

  const addStat = (): void => {
    if (localItems.length >= HOME_STATS_MAX) return;
    commitItems([...localItems, { ...DEFAULT_HOME_STAT, uiId: createUiId() }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-ink-muted">Minimum 1 item, maximum {HOME_STATS_MAX} items.</p>

      <HomeContentDndContext
        id="home-content-stats"
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={localItems.map((item) => item.uiId)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {localItems.map((stat, index) => (
              <SortableStatCard
                key={stat.uiId}
                stat={stat}
                index={index}
                total={localItems.length}
                fieldErrors={fieldErrors}
                onUpdate={updateStat}
                onRemove={removeStat}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={homeContentDropAnimation}>
          {activeItem && activeIndex >= 0 ? (
            <SortableStatCard
              stat={activeItem}
              index={activeIndex}
              total={localItems.length}
              fieldErrors={fieldErrors}
              onUpdate={updateStat}
              onRemove={removeStat}
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
          disabled={localItems.length >= HOME_STATS_MAX}
          onClick={addStat}
        >
          Add stat
        </Button>
      </div>
    </div>
  );
}
