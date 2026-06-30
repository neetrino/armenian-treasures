'use client';

import {
  type AdminImageFolder,
  type AdminImageVariant,
} from '@/lib/admin/image-upload-constants';
import { validateAdminImageFile } from '@/lib/admin/validate-admin-image-file';

export interface AdminImageUploadParams {
  file: File;
  folder: AdminImageFolder;
  variant?: AdminImageVariant;
}

export interface AdminImageUploadResult {
  ok: boolean;
  url?: string;
  error?: string;
}

interface PresignResponse {
  ok: boolean;
  uploadUrl?: string;
  storageKey?: string;
  publicUrl?: string;
  confirmToken?: string;
  error?: string;
}

interface ConfirmResponse {
  ok: boolean;
  url?: string;
  error?: string;
}

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function uploadAdminImage(
  params: AdminImageUploadParams,
): Promise<AdminImageUploadResult> {
  const validation = validateAdminImageFile(params.file);
  if (!validation.ok) {
    return { ok: false, error: validation.error ?? 'Invalid image file.' };
  }

  const mimeType = params.file.type.toLowerCase();

  let presignResponse: Response;
  try {
    presignResponse = await fetch('/api/admin/uploads/presign', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: params.file.name,
        mimeType,
        size: params.file.size,
        folder: params.folder,
        ...(params.variant ? { variant: params.variant } : {}),
      }),
    });
  } catch (error) {
    console.error('[admin-upload] presign request failed', error);
    return { ok: false, error: 'Could not start upload. Check your connection and try again.' };
  }

  const presign = await readJson<PresignResponse>(presignResponse);
  if (!presignResponse.ok || !presign?.ok || !presign.uploadUrl || !presign.confirmToken) {
    return {
      ok: false,
      error: presign?.error ?? 'Could not prepare image upload.',
    };
  }

  const uploadUrl = presign.uploadUrl.startsWith('http')
    ? presign.uploadUrl
    : new URL(presign.uploadUrl, window.location.origin).toString();

  let uploadResponse: Response;
  try {
    uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': mimeType },
      body: params.file,
    });
  } catch (error) {
    console.error('[admin-upload] direct upload failed', error);
    return { ok: false, error: 'Image upload failed. Please try again.' };
  }

  if (!uploadResponse.ok) {
    console.error('[admin-upload] storage rejected upload', uploadResponse.status);
    return { ok: false, error: 'Image upload to storage failed. Please try again.' };
  }

  let confirmResponse: Response;
  try {
    confirmResponse = await fetch('/api/admin/uploads/confirm', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        confirmToken: presign.confirmToken,
        filename: params.file.name,
        mimeType,
        size: params.file.size,
      }),
    });
  } catch (error) {
    console.error('[admin-upload] confirm request failed', error);
    return {
      ok: false,
      error: 'Image uploaded but metadata could not be saved. Please try again.',
    };
  }

  const confirmed = await readJson<ConfirmResponse>(confirmResponse);
  if (!confirmResponse.ok || !confirmed?.ok || !confirmed.url) {
    return {
      ok: false,
      error: confirmed?.error ?? 'Image uploaded but could not be finalized.',
    };
  }

  return { ok: true, url: confirmed.url };
}
