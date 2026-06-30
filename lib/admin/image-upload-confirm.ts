import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { prisma } from '@/lib/db';
import { verifyImageUploadConfirmToken } from '@/lib/admin/image-upload-confirm-token';
import { isAdminManagedUploadKey } from '@/lib/storage/key-policies';
import { getStorage } from '@/lib/storage';
import { headR2Object } from '@/lib/storage/r2';

export interface AdminImageConfirmRequest {
  confirmToken: string;
  filename: string;
  mimeType: string;
  size: number;
}

export interface AdminImageConfirmResult {
  ok: boolean;
  url?: string;
  error?: string;
}

function isR2Storage(): boolean {
  return (process.env.STORAGE_DRIVER ?? 'local') === 'r2';
}

async function localUploadExists(storageKey: string): Promise<boolean> {
  const absolute = join(/*turbopackIgnore: true*/ process.cwd(), 'public', 'uploads', storageKey);
  try {
    await access(absolute);
    return true;
  } catch {
    return false;
  }
}

export async function confirmAdminImageUpload(
  ownerId: string,
  input: AdminImageConfirmRequest,
): Promise<AdminImageConfirmResult> {
  const token = input.confirmToken?.trim();
  if (!token) {
    return { ok: false, error: 'Missing upload confirmation token.' };
  }

  const payload = verifyImageUploadConfirmToken(token);
  if (!payload) {
    return { ok: false, error: 'Upload confirmation expired or invalid.' };
  }

  if (payload.ownerId !== ownerId) {
    return { ok: false, error: 'Upload confirmation does not match your session.' };
  }

  if (!isAdminManagedUploadKey(payload.storageKey)) {
    console.error('[admin-upload] confirm rejected unmanaged key', payload.storageKey);
    return { ok: false, error: 'Invalid storage key.' };
  }

  if (input.mimeType !== payload.mimeType) {
    return { ok: false, error: 'MIME type does not match the prepared upload.' };
  }

  if (!Number.isFinite(input.size) || input.size <= 0 || input.size > payload.maxSize) {
    return { ok: false, error: 'File size is invalid or exceeds the allowed limit.' };
  }

  if (isR2Storage()) {
    const head = await headR2Object(payload.storageKey);
    if (!head) {
      return { ok: false, error: 'Uploaded image was not found in storage. Please try again.' };
    }
    if (head.contentLength > payload.maxSize) {
      return { ok: false, error: 'Uploaded file exceeds the allowed size limit.' };
    }
    if (head.contentType && head.contentType !== payload.mimeType) {
      return { ok: false, error: 'Uploaded file type does not match the prepared upload.' };
    }
  } else {
    const exists = await localUploadExists(payload.storageKey);
    if (!exists) {
      return { ok: false, error: 'Uploaded image was not found in storage. Please try again.' };
    }
  }

  const storage = getStorage();
  const publicUrl = storage.publicUrl(payload.storageKey);
  const filename = input.filename?.trim() || 'image';

  try {
    await prisma.uploadMetadata.create({
      data: {
        ownerType: 'admin',
        ownerId,
        originalFilename: filename,
        detectedMime: payload.mimeType,
        fileSize: input.size,
        storageKey: payload.storageKey,
        status: 'APPROVED',
        publicUrl,
      },
    });
  } catch (error) {
    console.error('[admin-upload] failed to save upload metadata', payload.storageKey, error);
    return { ok: false, error: 'Failed to save image metadata.' };
  }

  return { ok: true, url: publicUrl };
}
