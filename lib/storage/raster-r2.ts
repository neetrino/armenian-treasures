import 'server-only';

import { isR2Configured } from '@/lib/storage/raster-public-url';

export { getRasterPublicBaseUrl, getStorageKeyPublicUrl, isR2Configured } from '@/lib/storage/raster-public-url';
import {
  deleteR2Object,
  uploadBufferToR2,
} from '@/lib/storage/r2';

export function assertR2Configured(): void {
  if (!isR2Configured()) {
    throw new Error(
      'Raster images are stored in Cloudflare R2 only. Configure R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, and R2_PUBLIC_URL.',
    );
  }
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
