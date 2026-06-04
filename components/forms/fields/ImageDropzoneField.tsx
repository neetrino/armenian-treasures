'use client';

import { useCallback, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { uploadHeroImageAction } from '@/app/(admin)/admin/(panel)/home-content/upload-actions';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';

interface ImageDropzoneFieldProps {
  label: string;
  name: string;
  variant: 'desktop' | 'mobile';
  defaultValue?: string;
  hint?: string;
  error?: string;
}

const ACCEPT = 'image/jpeg,image/png,image/webp';

export function ImageDropzoneField({
  label,
  name,
  variant,
  defaultValue = '',
  hint,
  error,
}: ImageDropzoneFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.set('file', file);
      formData.set('variant', variant);

      const result = await uploadHeroImageAction(formData);
      setIsUploading(false);

      if (!result.ok || !result.url) {
        setUploadError(result.error ?? 'Upload failed.');
        return;
      }

      setUrl(result.url);
    },
    [variant],
  );

  const handleFiles = useCallback(
    (files: FileList | File[] | null | undefined) => {
      const file = files?.[0];
      if (!file) return;
      void uploadFile(file);
    },
    [uploadFile],
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      handleFiles(event.dataTransfer.files);
    },
    [handleFiles],
  );

  const previewSrc = url.trim() || null;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>

      <input type="hidden" name={name} value={url} />

      {previewSrc ? (
        <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={previewSrc}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
          <button
            type="button"
            onClick={() => setUrl('')}
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
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition',
            isDragging
              ? 'border-bronze-500 bg-bronze-50/40'
              : 'border-stone-300 bg-parchment-50 hover:border-bronze-500 hover:bg-parchment-100/60',
          )}
        >
          {isUploading ? (
            <Loader2 size={24} className="animate-spin text-bronze-600" aria-hidden />
          ) : (
            <Upload size={24} className="text-ink-muted" aria-hidden />
          )}
          <span className="text-sm font-medium text-ink">
            {isUploading ? 'Uploading…' : 'Drag and drop an image, or click to browse'}
          </span>
          <span className="text-xs text-ink-muted">JPG, PNG, or WebP</span>
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

      <div className="flex items-start gap-2 rounded-lg border border-stone-100 bg-white px-3 py-2">
        <ImageIcon size={14} className="mt-0.5 shrink-0 text-ink-muted" aria-hidden />
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="/images/hero/home-hero.png or uploaded URL"
          aria-label={`${label} URL`}
          className="w-full bg-transparent text-xs text-ink-soft outline-none placeholder:text-ink-muted"
        />
      </div>

      {error ? (
        <p className="text-xs text-pomegranate">{error}</p>
      ) : uploadError ? (
        <p className="text-xs text-pomegranate">{uploadError}</p>
      ) : hint ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}
