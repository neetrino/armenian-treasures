import { randomBytes } from 'node:crypto';
import type { UploadStatus } from '@prisma/client';
import { prisma } from '@/lib/db';
import { getStorage } from '@/lib/storage';

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
  const storageKey = generateStorageKey(prefix, input.originalFilename);
  const status: UploadStatus = input.isImage ? 'APPROVED' : 'PENDING_SCAN';
  const visibility = input.isImage ? 'public' : 'private';

  const uploadResult = await getStorage().upload({
    key: storageKey,
    body: input.buffer,
    contentType: input.detectedMime,
    visibility,
  });

  const publicUrl = status === 'APPROVED' ? uploadResult.url : null;

  const record = await prisma.uploadMetadata.create({
    data: {
      ownerType: input.ownerType,
      ownerId: input.ownerId,
      originalFilename: input.originalFilename,
      detectedMime: input.detectedMime,
      fileSize: input.buffer.length,
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
