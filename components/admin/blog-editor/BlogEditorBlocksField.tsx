'use client';

import { useState, type HTMLAttributes } from 'react';
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
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { CultureItemGalleryBlocksField } from '@/components/admin/culture-item-editor/CultureItemGalleryBlocksField';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { AdminLocaleAwareRichTextField } from '@/components/forms/fields/AdminLocaleAwareRichTextField';
import { AdminLocaleAwareTextField } from '@/components/forms/fields/AdminLocaleAwareTextField';
import { TextField } from '@/components/forms/fields/TextField';
import {
  BLOG_BLOCK_LABELS,
  BLOG_BLOCK_TYPES,
  emptyBlogBlock,
  type BlogBlockType,
  type BlogContentBlock,
} from '@/lib/blog-content-blocks';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cn } from '@/lib/utils';

interface BlogEditorBlocksFieldProps {
  blocks: BlogContentBlock[];
  onChange: (blocks: BlogContentBlock[]) => void;
  activeLocale: SiteLocaleCode;
}

function patchBlock(
  blocks: BlogContentBlock[],
  id: string,
  patch: Partial<BlogContentBlock>,
): BlogContentBlock[] {
  return blocks.map((block) => (block.id === id ? ({ ...block, ...patch } as BlogContentBlock) : block));
}

function BlockFields({
  block,
  blocks,
  onChange,
  activeLocale,
}: {
  block: BlogContentBlock;
  blocks: BlogContentBlock[];
  onChange: (blocks: BlogContentBlock[]) => void;
  activeLocale: SiteLocaleCode;
}) {
  switch (block.type) {
    case 'heading':
      return (
        <AdminLocaleAwareTextField
          label="Heading"
          multiline
          rows={1}
          values={block.text}
          activeLocale={activeLocale}
          onValuesChange={(text) => onChange(patchBlock(blocks, block.id, { text }))}
          hint="One line. Shown as a section heading on the article page."
        />
      );
    case 'description':
      return (
        <AdminLocaleAwareRichTextField
          label="Description"
          values={block.html}
          activeLocale={activeLocale}
          onValuesChange={(html) => onChange(patchBlock(blocks, block.id, { html }))}
          hint="Full article text for this block. Not used on listing cards."
        />
      );
    case 'photo':
      return (
        <div className="grid gap-4">
          <AdminImageDropzoneField
            label="Photo"
            folder="culture"
            layout="banner"
            value={block.url}
            onValueChange={(url) => onChange(patchBlock(blocks, block.id, { url }))}
          />
          <AdminLocaleAwareTextField
            label="Caption"
            values={block.caption}
            activeLocale={activeLocale}
            onValuesChange={(caption) => onChange(patchBlock(blocks, block.id, { caption }))}
          />
        </div>
      );
    case 'youtube':
      return (
        <TextField
          label="YouTube URL"
          value={block.url}
          onChange={(event) => onChange(patchBlock(blocks, block.id, { url: event.target.value }))}
          hint="Paste a watch, share, or embed link."
        />
      );
    case 'gallery':
      return (
        <CultureItemGalleryBlocksField
          items={block.items}
          includeHiddenFields={false}
          onChange={(items) => onChange(patchBlock(blocks, block.id, { items }))}
        />
      );
    case 'link':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminLocaleAwareTextField
            label="Label"
            values={block.label}
            activeLocale={activeLocale}
            onValuesChange={(label) => onChange(patchBlock(blocks, block.id, { label }))}
          />
          <TextField
            label="URL"
            value={block.url}
            onChange={(event) => onChange(patchBlock(blocks, block.id, { url: event.target.value }))}
          />
        </div>
      );
  }
}

interface SortableBlogBlockCardProps {
  block: BlogContentBlock;
  index: number;
  overlay?: boolean;
  children: React.ReactNode;
  onRemove: () => void;
}

function SortableBlogBlockCard({
  block,
  index,
  overlay = false,
  children,
  onRemove,
}: SortableBlogBlockCardProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id, disabled: overlay });
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
      className={cn('rounded-xl border border-stone-200 bg-parchment-50/50 p-4', isDragging && !overlay && 'opacity-40')}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-lg border border-stone-200 bg-white text-ink-muted active:cursor-grabbing"
            aria-label={`Reorder ${BLOG_BLOCK_LABELS[block.type]}`}
            {...dragHandleProps}
          >
            <GripVertical size={14} aria-hidden />
          </button>
          <p className="truncate text-sm font-semibold text-ink">
            {index + 1}. {BLOG_BLOCK_LABELS[block.type]}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-pomegranate transition hover:border-pomegranate/30 hover:bg-pomegranate/10"
          aria-label={`Remove ${BLOG_BLOCK_LABELS[block.type]}`}
        >
          <Trash2 size={14} aria-hidden />
        </button>
      </div>
      {children}
    </div>
  );
}

export function BlogEditorBlocksField({ blocks, onChange, activeLocale }: BlogEditorBlocksFieldProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent): void {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(blocks, oldIndex, newIndex));
  }

  const activeBlock = blocks.find((block) => block.id === activeId) ?? null;
  const activeIndex = activeBlock ? blocks.findIndex((block) => block.id === activeBlock.id) : -1;

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name="contentBlocks" value={JSON.stringify(blocks)} />
      <DndContext
        id="blog-editor-blocks"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4">
            {blocks.map((block, index) => (
              <SortableBlogBlockCard
                key={block.id}
                block={block}
                index={index}
                onRemove={() => onChange(blocks.filter((item) => item.id !== block.id))}
              >
                <BlockFields block={block} blocks={blocks} onChange={onChange} activeLocale={activeLocale} />
              </SortableBlogBlockCard>
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeBlock && activeIndex >= 0 ? (
            <SortableBlogBlockCard block={activeBlock} index={activeIndex} overlay onRemove={() => undefined}>
              <p className="text-sm text-ink-muted">{BLOG_BLOCK_LABELS[activeBlock.type]}</p>
            </SortableBlogBlockCard>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="rounded-xl border border-dashed border-stone-300 bg-white p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">Add block</p>
        <div className="flex flex-wrap gap-2">
          {BLOG_BLOCK_TYPES.map((type: BlogBlockType) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange([...blocks, emptyBlogBlock(type)])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-bronze-400 bg-white px-3 py-2 text-sm font-medium text-bronze-800 transition hover:bg-bronze-50"
            >
              <Plus size={14} aria-hidden />
              {BLOG_BLOCK_LABELS[type]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
