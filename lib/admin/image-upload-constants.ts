export const ADMIN_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export type AdminImageMimeType = (typeof ADMIN_IMAGE_MIME_TYPES)[number];

export const ADMIN_IMAGE_ACCEPT = ADMIN_IMAGE_MIME_TYPES.join(',');

export const ADMIN_IMAGE_MAX_SIZE_BYTES = 5 * 1024 * 1024;

export const ADMIN_IMAGE_FOLDERS = ['hero', 'culture'] as const;

export type AdminImageFolder = (typeof ADMIN_IMAGE_FOLDERS)[number];

export const ADMIN_IMAGE_VARIANTS = ['desktop', 'mobile'] as const;

export type AdminImageVariant = (typeof ADMIN_IMAGE_VARIANTS)[number];

export const MIME_TO_EXTENSION: Record<AdminImageMimeType, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export function isAdminImageMimeType(value: string): value is AdminImageMimeType {
  return (ADMIN_IMAGE_MIME_TYPES as readonly string[]).includes(value);
}

export function parseAdminImageMaxSize(): number {
  const raw = process.env.UPLOAD_MAX_FILE_SIZE;
  if (!raw) return ADMIN_IMAGE_MAX_SIZE_BYTES;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : ADMIN_IMAGE_MAX_SIZE_BYTES;
}
