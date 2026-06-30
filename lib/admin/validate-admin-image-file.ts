import {
  ADMIN_IMAGE_MAX_SIZE_BYTES,
  ADMIN_IMAGE_MIME_TYPES,
  isAdminImageMimeType,
  parseAdminImageMaxSize,
} from '@/lib/admin/image-upload-constants';

export interface ClientImageValidationResult {
  ok: boolean;
  error?: string;
}

export function validateAdminImageFile(file: File | null | undefined): ClientImageValidationResult {
  if (!file) {
    return { ok: false, error: 'No file selected.' };
  }

  const mimeType = file.type.toLowerCase();
  if (!isAdminImageMimeType(mimeType)) {
    return { ok: false, error: 'Only JPG, PNG, or WebP images are allowed.' };
  }

  const maxSize = parseAdminImageMaxSize();
  if (file.size <= 0) {
    return { ok: false, error: 'Selected file is empty.' };
  }
  if (file.size > maxSize) {
    return { ok: false, error: `Image exceeds ${Math.round(maxSize / (1024 * 1024))} MB.` };
  }

  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = ADMIN_IMAGE_MIME_TYPES.map((type) =>
    type === 'image/jpeg' ? ['jpg', 'jpeg'] : [type.replace('image/', '')],
  ).flat();
  if (!extension || !allowedExtensions.includes(extension)) {
    return { ok: false, error: 'File extension does not match an allowed image type.' };
  }

  return { ok: true };
}

export const ADMIN_IMAGE_CLIENT_MAX_SIZE = ADMIN_IMAGE_MAX_SIZE_BYTES;
