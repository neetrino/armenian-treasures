'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { RepeatableFieldCard } from '@/components/admin/culture-item-editor/RepeatableFieldList';
import { ADMIN_IMAGE_ACCEPT } from '@/lib/admin/image-upload-constants';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { uploadAdminImage } from '@/lib/admin/upload-image-client';
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
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const imageItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.kind === 'image' && item.url.trim());
  const beforeAfterItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.kind === 'beforeAfter');

  const addFiles = useCallback(
    async (files: FileList | File[] | null | undefined) => {
      const list = Array.from(files ?? []).filter((file) => file.type.startsWith('image/'));
      if (list.length === 0) return;

      setUploadError(null);
      setPendingCount(list.length);
      const uploaded: CultureGalleryBlock[] = [];
      const errors: string[] = [];

      for (const file of list) {
        const result = await uploadAdminImage({ file, folder: 'culture' });
        if (result.ok && result.url) {
          uploaded.push({ ...emptyGalleryBlock('image'), url: result.url });
        } else {
          errors.push(result.error?.trim() || file.name);
        }
        setPendingCount((current) => Math.max(0, current - 1));
      }

      onChange([...items.filter((item) => item.kind === 'beforeAfter' || item.url.trim()), ...uploaded]);
      if (errors.length > 0) {
        setUploadError(errors.slice(0, 3).join(' · '));
      }
    },
    [items, onChange],
  );

  return (
    <div className="flex flex-col gap-5">
      <input type="hidden" name="galleryCount" value={items.length} />
      {items.map((item, index) => (
        <GalleryHiddenFields key={item.id} item={item} index={index} />
      ))}

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          void addFiles(event.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition',
          isDragging
            ? 'border-bronze-500 bg-bronze-50/40'
            : 'border-stone-300 bg-white hover:border-bronze-500 hover:bg-parchment-50/60',
        )}
      >
        {pendingCount > 0 ? (
          <Loader2 size={24} className="animate-spin text-bronze-600" aria-hidden />
        ) : (
          <ImagePlus size={24} className="text-ink-muted" aria-hidden />
        )}
        <span className="text-sm font-medium text-ink">
          {pendingCount > 0
            ? `Uploading ${pendingCount} photo${pendingCount === 1 ? '' : 's'}…`
            : 'Choose several photos at once'}
        </span>
        <span className="text-xs text-ink-muted">
          Click or drop multiple JPG, PNG, or WebP files
        </span>
      </div>
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={ADMIN_IMAGE_ACCEPT}
        multiple
        className="sr-only"
        onChange={(event) => {
          void addFiles(event.target.files);
          event.target.value = '';
        }}
      />
      {uploadError ? <p className="text-xs text-pomegranate">{uploadError}</p> : null}

      {imageItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {imageItems.map(({ item, index }) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-stone-200 bg-white">
              <div className="relative aspect-[16/10] bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolvePublicAssetUrl(item.url)}
                  alt={item.caption || `Gallery ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, current) => current !== index))}
                  className="absolute right-2 top-2 rounded-full bg-midnight-900/70 p-1.5 text-white transition hover:bg-midnight-900"
                  aria-label={`Remove gallery image ${index + 1}`}
                >
                  <X size={14} aria-hidden />
                </button>
              </div>
              <input
                type="text"
                value={item.caption}
                onChange={(event) => onChange(patchItem(items, index, { caption: event.target.value }))}
                placeholder="Caption (optional)"
                className="w-full border-t border-stone-100 bg-transparent px-3 py-2 text-xs text-ink outline-none placeholder:text-ink-muted"
              />
            </div>
          ))}
        </div>
      ) : null}

      {beforeAfterItems.map(({ item, index }) => (
        <RepeatableFieldCard
          key={item.id}
          title={`Before / After ${index + 1}`}
          onRemove={() => onChange(items.filter((_, current) => current !== index))}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminImageDropzoneField
              label="Before"
              folder="culture"
              layout="card"
              value={item.beforeUrl}
              onValueChange={(beforeUrl) => onChange(patchItem(items, index, { beforeUrl }))}
            />
            <AdminImageDropzoneField
              label="After"
              folder="culture"
              layout="card"
              value={item.afterUrl}
              onValueChange={(afterUrl) => onChange(patchItem(items, index, { afterUrl }))}
            />
          </div>
          <input
            type="text"
            value={item.caption}
            onChange={(event) => onChange(patchItem(items, index, { caption: event.target.value }))}
            placeholder="Caption (optional)"
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-muted"
          />
        </RepeatableFieldCard>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items.filter((item) => item.kind === 'beforeAfter' || item.url.trim()), emptyGalleryBlock('beforeAfter')])}
        className="self-start text-xs font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline"
      >
        Add a before / after pair
      </button>
    </div>
  );
}

function GalleryHiddenFields({ item, index }: { item: CultureGalleryBlock; index: number }) {
  const prefix = `gallery.${index}`;
  return (
    <>
      <input type="hidden" name={`${prefix}.id`} value={item.id} />
      <input type="hidden" name={`${prefix}.kind`} value={item.kind} />
      <input type="hidden" name={`${prefix}.url`} value={item.url} />
      <input type="hidden" name={`${prefix}.beforeUrl`} value={item.beforeUrl} />
      <input type="hidden" name={`${prefix}.afterUrl`} value={item.afterUrl} />
      <input type="hidden" name={`${prefix}.caption`} value={item.caption} />
      <input type="hidden" name={`${prefix}.alt`} value={item.alt} />
    </>
  );
}
