import { randomBytes } from 'node:crypto';
import type { UploadStatus } from '@prisma/client';
import { prisma } from '@/lib/db';
import {
  convertRasterToWebp,
  isConvertibleRasterMime,
  toWebpFilename,
} from '@/lib/images/convert-raster-to-webp';
import { isPrivateStorageKey } from '@/lib/storage/key-policies';
import { getStorage } from '@/lib/storage';
import { uploadRasterImage } from '@/lib/storage/raster-r2';

export function safeFilename(name: string): string {
  return (
    name
      .normalize('NFKD')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(-120)
      .toLowerCase() || 'file'
  );
}

export function generateStorageKey(prefix: string, filename: string): string {
  const random = randomBytes(8).toString('hex');
  return `${prefix}/${random}-${safeFilename(filename)}`;
}

export interface StoredUploadInput {
  ownerType: string;
  ownerId: string;
  originalFilename: string;
  detectedMime: string;
  buffer: Buffer;
  isImage: boolean;
}

export interface StoredUploadResult {
  id: string;
  storageKey: string;
  status: UploadStatus;
  publicUrl: string | null;
}

export async function storeValidatedUpload(
  input: StoredUploadInput,
): Promise<StoredUploadResult> {
  const prefix = input.isImage ? 'submissions/incoming' : 'quarantine/incoming';
  let buffer = input.buffer;
  let detectedMime = input.detectedMime;
  let filename = input.originalFilename;

  if (input.isImage && isConvertibleRasterMime(detectedMime)) {
    buffer = await convertRasterToWebp(buffer);
    detectedMime = 'image/webp';
    filename = toWebpFilename(filename);
  }

  const storageKey = generateStorageKey(prefix, filename);
  const status: UploadStatus = input.isImage ? 'APPROVED' : 'PENDING_SCAN';

  let publicUrl: string | null = null;

  if (input.isImage) {
    const uploadResult = await uploadRasterImage({
      key: storageKey,
      buffer,
      contentType: detectedMime,
    });
    publicUrl = !isPrivateStorageKey(storageKey) ? uploadResult.url : null;
  } else {
    await getStorage().upload({
      key: storageKey,
      body: buffer,
      contentType: detectedMime,
      visibility: 'private',
    });
  }

  const record = await prisma.uploadMetadata.create({
    data: {
      ownerType: input.ownerType,
      ownerId: input.ownerId,
      originalFilename: input.originalFilename,
      detectedMime,
      fileSize: buffer.length,
      storageKey,
      status,
      publicUrl,
    },
  });

  return {
    id: record.id,
    storageKey: record.storageKey,
    status: record.status,
    publicUrl: record.publicUrl,
  };
}
