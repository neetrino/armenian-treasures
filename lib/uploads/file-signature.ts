export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'doc', 'docx'] as const;

export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number];

export const EXTENSION_TO_MIME: Record<AllowedExtension, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const DOC_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
] as const;

export function getExtension(filename: string): string | null {
  const parts = filename.toLowerCase().split('.');
  if (parts.length < 2) return null;
  const ext = parts.at(-1);
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext as AllowedExtension)) return null;
  return ext;
}

export function detectMimeFromBuffer(buffer: Buffer): string | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp';
  }
  if (buffer.length >= 4 && buffer.subarray(0, 4).toString('ascii') === '%PDF') {
    return 'application/pdf';
  }
  if (
    buffer.length >= 4 &&
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0
  ) {
    return 'application/msword';
  }
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04
  ) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  return null;
}

export interface FileValidationResult {
  ok: boolean;
  reason?: string;
  detectedMime?: string;
  extension?: string;
  isImage?: boolean;
}

function parseMaxSize(envKey: string, fallback: number): number {
  const raw = process.env[envKey];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getMaxImageSize(): number {
  return parseMaxSize('UPLOAD_MAX_FILE_SIZE', 5 * 1024 * 1024);
}

export function getMaxDocSize(): number {
  return parseMaxSize('UPLOAD_MAX_FILE_SIZE', 10 * 1024 * 1024);
}

export function validateFileBuffer(
  buffer: Buffer,
  originalFilename: string,
  declaredMime?: string,
): FileValidationResult {
  const extension = getExtension(originalFilename);
  if (!extension) {
    return { ok: false, reason: 'Unsupported file extension' };
  }

  const expectedMime = EXTENSION_TO_MIME[extension as AllowedExtension];
  const detectedMime = detectMimeFromBuffer(buffer);
  if (!detectedMime) {
    return { ok: false, reason: 'Unknown or invalid file type' };
  }

  if (detectedMime !== expectedMime) {
    return { ok: false, reason: 'File content does not match extension' };
  }

  if (declaredMime && declaredMime.toLowerCase() !== detectedMime) {
    return { ok: false, reason: 'Declared MIME type does not match file content' };
  }

  const allowedMimeEnv = process.env.UPLOAD_ALLOWED_MIME_TYPES;
  if (allowedMimeEnv) {
    const allowed = allowedMimeEnv.split(',').map((item) => item.trim().toLowerCase());
    if (!allowed.includes(detectedMime)) {
      return { ok: false, reason: 'File type is not allowed' };
    }
  }

  const isImage = IMAGE_MIME_TYPES.includes(detectedMime as (typeof IMAGE_MIME_TYPES)[number]);
  const maxSize = isImage ? getMaxImageSize() : getMaxDocSize();
  if (buffer.length > maxSize) {
    return { ok: false, reason: 'File exceeds size limit' };
  }

  return { ok: true, detectedMime, extension, isImage };
}
