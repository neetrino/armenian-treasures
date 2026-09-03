'use client';

import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';
import {
  RepeatableFieldCard,
  RepeatableFieldList,
} from '@/components/admin/culture-item-editor/RepeatableFieldList';
import { emptyGalleryBlock, type CultureGalleryBlock } from '@/lib/culture-item-media';
import { cn } from '@/lib/utils';

interface CultureItemGalleryBlocksFieldProps {
  items: CultureGalleryBlock[];
  onChange: (items: CultureGalleryBlock[]) => void;
}

function patchItem(
  items: CultureGalleryBlock[],
  index: number,
  patch: Partial<CultureGalleryBlock>,
): CultureGalleryBlock[] {
  return items.map((item, current) => (current === index ? { ...item, ...patch } : item));
}

export function CultureItemGalleryBlocksField({ items, onChange }: CultureItemGalleryBlocksFieldProps) {
  return (
    <>
      <input type="hidden" name="galleryCount" value={items.length} />
      <RepeatableFieldList addLabel="Add gallery image" onAdd={() => onChange([...items, emptyGalleryBlock()])}>
        {items.map((item, index) => (
          <GalleryBlockCard
            key={item.id}
            item={item}
            index={index}
            onPatch={(patch) => onChange(patchItem(items, index, patch))}
            onRemove={() => onChange(items.filter((_, current) => current !== index))}
          />
        ))}
      </RepeatableFieldList>
    </>
  );
}

function GalleryBlockCard({
  item,
  index,
  onPatch,
  onRemove,
}: {
  item: CultureGalleryBlock;
  index: number;
  onPatch: (patch: Partial<CultureGalleryBlock>) => void;
  onRemove: () => void;
}) {
  const prefix = `gallery.${index}`;
  return (
    <RepeatableFieldCard title={`Gallery item ${index + 1}`} onRemove={onRemove}>
      <input type="hidden" name={`${prefix}.id`} value={item.id} />
      <input type="hidden" name={`${prefix}.kind`} value={item.kind} />
      <div className="inline-flex rounded-lg border border-stone-200 p-1">
        {(['image', 'beforeAfter'] as const).map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => onPatch({ kind })}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium',
              item.kind === kind ? 'bg-pomegranate text-white' : 'text-ink-soft hover:bg-stone-100',
            )}
          >
            {kind === 'image' ? 'Image' : 'Before / After'}
          </button>
        ))}
      </div>
      {item.kind === 'beforeAfter' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminImageDropzoneField
            label="Before"
            name={`${prefix}.beforeUrl`}
            folder="culture"
            layout="card"
            value={item.beforeUrl}
            onValueChange={(beforeUrl) => onPatch({ beforeUrl })}
          />
          <AdminImageDropzoneField
            label="After"
            name={`${prefix}.afterUrl`}
            folder="culture"
            layout="card"
            value={item.afterUrl}
            onValueChange={(afterUrl) => onPatch({ afterUrl })}
          />
        </div>
      ) : (
        <AdminImageDropzoneField
          label="Image"
          name={`${prefix}.url`}
          folder="culture"
          layout="card"
          value={item.url}
          onValueChange={(url) => onPatch({ url })}
        />
      )}
      <TextField
        label="Caption"
        name={`${prefix}.caption`}
        value={item.caption}
        onChange={(event) => onPatch({ caption: event.target.value })}
      />
    </RepeatableFieldCard>
  );
}
