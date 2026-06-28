'use client';

import { useCallback, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Loader2, Upload, X } from 'lucide-react';
import { uploadAdminImageAction } from '@/app/(admin)/admin/(panel)/upload-image-actions';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import {
  getAdminImagePreviewStyle,
  type AdminImagePreviewLayout,
} from '@/lib/admin/image-preview-layout';

interface PageContentImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  /** `card` matches public catalog card media (16:10). `banner` is wide hero (16:9). */
  layout?: AdminImagePreviewLayout;
}

const ACCEPT = 'image/jpeg,image/png,image/webp';

export function PageContentImageField({
  label,
  value,
  onChange,
  hint,
  layout = 'banner',
}: PageContentImageFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const previewStyle = getAdminImagePreviewStyle(layout);

  const uploadFile = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.set('file', file);
      formData.set('folder', 'culture');

      const result = await uploadAdminImageAction(formData);
      setIsUploading(false);

      if (!result.ok || !result.url) {
        setUploadError(result.error ?? 'Upload failed.');
        return;
      }

      onChange(result.url);
    },
    [onChange],
  );

  const handleFiles = useCallback(
    (files: FileList | File[] | null | undefined) => {
      const file = files?.[0];
      if (file) void uploadFile(file);
    },
    [uploadFile],
  );

  const previewSrc = value.trim() || null;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>

      {previewSrc ? (
        <div
          className={cn(
            'relative overflow-hidden rounded-xl border border-stone-200 bg-stone-900',
            previewStyle.containerClass,
          )}
        >
          <div className={cn('relative w-full', previewStyle.aspectClass)}>
            <Image
              src={previewSrc}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes={previewStyle.sizes}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 rounded-full bg-midnight-900/70 p-1.5 text-white transition hover:bg-midnight-900"
            aria-label="Remove image"
          >
            <X size={14} aria-hidden />
          </button>
        </div>
      ) : (
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
            handleFiles(event.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition',
            previewStyle.dropzoneClass,
            previewStyle.aspectClass,
            isDragging
              ? 'border-bronze-500 bg-bronze-50/40'
              : 'border-stone-300 bg-white hover:border-bronze-500 hover:bg-parchment-50/60',
          )}
        >
          {isUploading ? (
            <Loader2 size={22} className="animate-spin text-bronze-600" aria-hidden />
          ) : (
            <Upload size={22} className="text-ink-muted" aria-hidden />
          )}
          <span className="text-sm font-medium text-ink">
            {isUploading ? 'Uploading…' : 'Drag & drop or click to upload'}
          </span>
          <span className="text-xs text-ink-muted">
            {layout === 'card' ? 'Card ratio 16:10 · JPG, PNG, WebP' : 'Wide banner 16:9 · JPG, PNG, WebP'}
          </span>
        </div>
      )}

      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {uploadError ? (
        <p className="text-xs text-pomegranate">{uploadError}</p>
      ) : hint ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}
