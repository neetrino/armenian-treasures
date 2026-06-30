'use client';

import { useCallback, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Loader2, Plus, Upload, X } from 'lucide-react';
import { ADMIN_IMAGE_ACCEPT } from '@/lib/admin/image-upload-constants';
import { uploadAdminImage } from '@/lib/admin/upload-image-client';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

interface GalleryImagesFieldProps {
  label?: string;
  name?: string;
  defaultValue?: string[];
  maxImages?: number;
  error?: string;
}

const ACCEPT = ADMIN_IMAGE_ACCEPT;

export function GalleryImagesField({
  label = 'Gallery images',
  name = 'galleryImages',
  defaultValue = [],
  maxImages = 20,
  error,
}: GalleryImagesFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[]>(defaultValue.filter((url) => url.trim().length > 0));
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadError(null);

    const result = await uploadAdminImage({ file, folder: 'culture' });
    setIsUploading(false);

    if (!result.ok || !result.url) {
      setUploadError(result.error ?? 'Upload failed.');
      return;
    }

    setUrls((current) => {
      if (current.length >= maxImages) {
        setUploadError(`Maximum ${maxImages} gallery images.`);
        return current;
      }
      return [...current, result.url!];
    });
  }, [maxImages]);

  const removeAt = (index: number) => {
    setUrls((current) => current.filter((_, i) => i !== index));
  };

  const addUrlRow = () => {
    setUrls((current) => {
      if (current.length >= maxImages) return current;
      return [...current, ''];
    });
  };

  const updateUrl = (index: number, value: string) => {
    setUrls((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={inputId}>{label}</Label>
      <p className="text-xs text-ink-muted">Upload images or paste URLs for the item gallery.</p>

      {urls.map((url, index) => (
        <div key={`gallery-${index}`} className="flex flex-col gap-2">
          <input type="hidden" name={name} value={url} />
          {url.trim() ? (
            <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
              <div className="relative aspect-[16/10] w-full max-w-md">
                <Image src={url} alt="" fill unoptimized className="object-cover" sizes="320px" />
              </div>
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute right-2 top-2 rounded-full bg-midnight-900/70 p-1.5 text-white transition hover:bg-midnight-900"
                aria-label="Remove gallery image"
              >
                <X size={14} aria-hidden />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(event) => updateUrl(index, event.target.value)}
                placeholder="https://… or /images/…"
                className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm text-ink outline-none focus:border-bronze-500"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm text-ink-muted hover:text-pomegranate"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      {urls.length < maxImages ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border border-dashed border-stone-300 px-4 py-2 text-sm text-ink-soft transition hover:border-bronze-500 hover:text-ink',
              isUploading && 'pointer-events-none opacity-60',
            )}
          >
            {isUploading ? (
              <Loader2 size={16} className="animate-spin" aria-hidden />
            ) : (
              <Upload size={16} aria-hidden />
            )}
            Upload image
          </button>
          <button
            type="button"
            onClick={addUrlRow}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm text-ink-soft transition hover:border-bronze-500 hover:text-ink"
          >
            <Plus size={16} aria-hidden />
            Add URL
          </button>
        </div>
      ) : null}

      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void uploadFile(file);
          event.target.value = '';
        }}
      />

      {error ? (
        <p className="text-xs text-pomegranate">{error}</p>
      ) : uploadError ? (
        <p className="text-xs text-pomegranate">{uploadError}</p>
      ) : null}
    </div>
  );
}
