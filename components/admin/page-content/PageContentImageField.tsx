'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import {
  ADMIN_IMAGE_ACCEPT,
  type AdminImageFolder,
  type AdminImageVariant,
} from '@/lib/admin/image-upload-constants';
import { uploadAdminImage } from '@/lib/admin/upload-image-client';
import { Label } from '@/components/ui/Label';
import {
  getAdminImagePreviewContainerClass,
  getAdminImagePreviewDropzoneClass,
  getAdminImagePreviewHint,
  getAdminImagePreviewStyle,
  type AdminImagePreviewLayout,
} from '@/lib/admin/image-preview-layout';
import { AdminManagedImagePreview } from '@/components/admin/AdminManagedImagePreview';

interface PageContentImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  /** `card` matches catalog cards (16:10). `banner` matches public page heroes. */
  layout?: AdminImagePreviewLayout;
  folder?: AdminImageFolder;
  /** Required for `hero` folder uploads (defaults to `desktop` on the server if omitted). */
  variant?: AdminImageVariant;
}

const ACCEPT = ADMIN_IMAGE_ACCEPT;

export function PageContentImageField({
  label,
  value,
  onChange,
  hint,
  layout = 'banner',
  folder = 'culture',
  variant,
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

      const result = await uploadAdminImage({
        file,
        folder,
        ...(variant ? { variant } : {}),
      });
      setIsUploading(false);

      if (!result.ok || !result.url) {
        setUploadError(result.error ?? 'Upload failed.');
        return;
      }

      onChange(result.url);
    },
    [folder, onChange, variant],
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
        <div className={getAdminImagePreviewContainerClass(layout, previewStyle)}>
          <AdminManagedImagePreview src={previewSrc} previewStyle={previewStyle} />
          <button
            type="button"
            onClick={() => onChange('')}
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
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={getAdminImagePreviewDropzoneClass(layout, previewStyle, isDragging)}
        >
          {isUploading ? (
            <Loader2 size={22} className="animate-spin text-bronze-600" aria-hidden />
          ) : (
            <Upload size={22} className="text-ink-muted" aria-hidden />
          )}
          <span className="text-sm font-medium text-ink">
            {isUploading ? 'Uploading…' : 'Drag & drop or click to upload'}
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

      {uploadError ? (
        <p className="text-xs text-pomegranate">{uploadError}</p>
      ) : hint ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}
