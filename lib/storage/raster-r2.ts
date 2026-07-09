import { getR2ManifestPublicBaseUrl } from '@/lib/assets/r2-manifest';
import { normalizeStorageKey } from '@/lib/storage/key-policies';
import {
  deleteR2Object,
  getR2EnvConfig,
  getR2EnvPresence,
  uploadBufferToR2,
} from '@/lib/storage/r2';

export function isR2Configured(): boolean {
  const presence = getR2EnvPresence();
  return (
    presence.R2_ACCOUNT_ID &&
    presence.R2_ACCESS_KEY_ID &&
    presence.R2_SECRET_ACCESS_KEY &&
    presence.R2_BUCKET &&
    presence.R2_PUBLIC_URL
  );
}

export function assertR2Configured(): void {
  if (!isR2Configured()) {
    throw new Error(
      'Raster images are stored in Cloudflare R2 only. Configure R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, and R2_PUBLIC_URL.',
    );
  }
}

export function getRasterPublicBaseUrl(): string | null {
  const fromEnv =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim() || process.env.R2_PUBLIC_URL?.trim() || null;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  return getR2ManifestPublicBaseUrl();
}

export function getStorageKeyPublicUrl(key: string): string {
  const config = getR2EnvConfig();
  return `${config.publicBaseUrl}/${normalizeStorageKey(key)}`;
}

export interface RasterUploadInput {
  key: string;
  buffer: Buffer;
  contentType: string;
}

export async function uploadRasterImage(input: RasterUploadInput): Promise<{ key: string; url: string }> {
  assertR2Configured();
  return uploadBufferToR2({
    key: input.key,
    buffer: input.buffer,
    contentType: input.contentType,
  });
}

export async function deleteRasterImage(key: string): Promise<void> {
  assertR2Configured();
  await deleteR2Object(key);
}
