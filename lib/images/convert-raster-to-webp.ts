import sharp from 'sharp';

export const WEBP_QUALITY = 82;

const CONVERTIBLE_MIME_TYPES = new Set(['image/jpeg', 'image/png']);

export function isConvertibleRasterMime(mimeType: string): boolean {
  return CONVERTIBLE_MIME_TYPES.has(mimeType.toLowerCase());
}

export async function convertRasterToWebp(input: Buffer): Promise<Buffer> {
  return sharp(input).webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer();
}

export function toWebpFilename(filename: string): string {
  const trimmed = filename.trim();
  if (/\.webp$/i.test(trimmed)) return trimmed;
  return trimmed.replace(/\.(png|jpe?g)$/i, '.webp');
}
