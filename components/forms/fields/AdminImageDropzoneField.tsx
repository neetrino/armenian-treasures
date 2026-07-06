'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { ADMIN_IMAGE_ACCEPT } from '@/lib/admin/image-upload-constants';
import { uploadAdminImage } from '@/lib/admin/upload-image-client';
import { Label } from '@/components/ui/Label';
import { AdminManagedImagePreview } from '@/components/admin/AdminManagedImagePreview';
import {
  getAdminImagePreviewContainerClass,
  getAdminImagePreviewDropzoneClass,
  getAdminImagePreviewHint,
  getAdminImagePreviewStyle,
  type AdminImagePreviewLayout,
} from '@/lib/admin/image-preview-layout';

interface AdminImageDropzoneFieldProps {
  label: string;
  name: string;
  folder: 'hero' | 'culture';
  variant?: 'desktop' | 'mobile';
  /** `card` = catalog card (16:10). `banner` = public page hero. `home-hero` = homepage hero. */
  layout?: AdminImagePreviewLayout;
  defaultValue?: string;
  hint?: string;
  error?: string;
}

const ACCEPT = ADMIN_IMAGE_ACCEPT;

export function AdminImageDropzoneField({
  label,
  name,
  folder,
  variant,
  layout = 'banner',
  defaultValue = '',
  hint,
  error,
}: AdminImageDropzoneFieldProps) {
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

      const result = await uploadAdminImage({ file, folder, variant });
      setIsUploading(false);

      if (!result.ok || !result.url) {
        setUploadError(result.error ?? 'Upload failed.');
        return;
      }

      setUrl(result.url);
    },
    [folder, variant],
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
  const previewStyle = getAdminImagePreviewStyle(layout);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <input type="hidden" name={name} value={url} />

      {previewSrc ? (
        <div className={getAdminImagePreviewContainerClass(layout, previewStyle)}>
          <AdminManagedImagePreview src={previewSrc} previewStyle={previewStyle} />
          <button
            type="button"
            onClick={() => setUrl('')}
            className="absolute right-2 top-2 z-10 rounded-full bg-midnight-900/70 p-1.5 text-white transition hover:bg-midnight-900"
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
          className={getAdminImagePreviewDropzoneClass(layout, previewStyle, isDragging)}
        >
          {isUploading ? (
            <Loader2 size={24} className="animate-spin text-bronze-600" aria-hidden />
          ) : (
            <Upload size={24} className="text-ink-muted" aria-hidden />
          )}
          <span className="text-sm font-medium text-ink">
            {isUploading ? 'Uploading…' : 'Drag and drop an image, or click to browse'}
          </span>
          <span className="text-xs text-ink-muted">{getAdminImagePreviewHint(layout)}</span>
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
