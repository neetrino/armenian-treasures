import { randomBytes } from 'node:crypto';

export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const DOC_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
] as const;

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_ADMIN_SIZE = 15 * 1024 * 1024;

export type UploadKind = 'public-image' | 'public-file' | 'admin';

export interface UploadValidationResult {
  ok: boolean;
  reason?: string;
}

export function validateUpload(file: File, kind: UploadKind): UploadValidationResult {
  if (!file) return { ok: false, reason: 'No file provided' };
  const type = file.type.toLowerCase();
  const size = file.size;
  if (kind === 'public-image') {
    if (!IMAGE_MIME_TYPES.includes(type as (typeof IMAGE_MIME_TYPES)[number])) {
      return { ok: false, reason: 'Only JPG, PNG or WebP images are allowed' };
    }
    if (size > MAX_IMAGE_SIZE) {
      return { ok: false, reason: 'Image exceeds 5 MB' };
    }
  } else if (kind === 'public-file') {
    if (!DOC_MIME_TYPES.includes(type as (typeof DOC_MIME_TYPES)[number])) {
      return { ok: false, reason: 'Only PDF or DOCX files are allowed' };
    }
    if (size > MAX_FILE_SIZE) {
      return { ok: false, reason: 'File exceeds 10 MB' };
    }
  } else {
    const allowed = [...IMAGE_MIME_TYPES, ...DOC_MIME_TYPES];
    if (!allowed.includes(type as (typeof allowed)[number])) {
      return { ok: false, reason: 'Unsupported file type' };
    }
    if (size > MAX_ADMIN_SIZE) {
      return { ok: false, reason: 'File exceeds 15 MB' };
    }
  }
  return { ok: true };
}

export function safeFilename(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(-120)
    .toLowerCase() || 'file';
}

export function generateKey(prefix: string, filename: string): string {
  const random = randomBytes(8).toString('hex');
  return `${prefix}/${random}-${safeFilename(filename)}`;
}
