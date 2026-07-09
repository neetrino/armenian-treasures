'use client';

import {
  type AdminImageFolder,
  type AdminImageVariant,
  parseAdminImageMaxSize,
} from '@/lib/admin/image-upload-constants';
import { convertImageFileToWebp } from '@/lib/admin/convert-image-file-to-webp';
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

async function readUploadError(response: Response): Promise<string | null> {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

  try {
    if (contentType.includes('application/json')) {
      const body = (await response.json()) as { error?: string };
      return body.error?.trim() || null;
    }

    const text = (await response.text()).trim();
    if (!text) return null;
    if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
      return `Server error (${response.status}). Check Vercel logs and R2 environment variables.`;
    }
    return text.slice(0, 240);
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

  let webpBlob: Blob;
  try {
    webpBlob = await convertImageFileToWebp(params.file);
  } catch (error) {
    console.error('[admin-upload] client WebP conversion failed', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to prepare image for upload.',
    };
  }

  const maxSize = parseAdminImageMaxSize();
  if (webpBlob.size <= 0 || webpBlob.size > maxSize) {
    return {
      ok: false,
      error: `Image exceeds ${Math.round(maxSize / (1024 * 1024))} MB after conversion.`,
    };
  }

  let presignResponse: Response;
  try {
    presignResponse = await fetch('/api/admin/uploads/presign', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: params.file.name.replace(/\.(png|jpe?g)$/i, '.webp'),
        mimeType: 'image/webp',
        size: webpBlob.size,
        folder: params.folder,
        ...(params.variant ? { variant: params.variant } : {}),
      }),
    });
  } catch (error) {
    console.error('[admin-upload] presign request failed', error);
    return { ok: false, error: 'Could not start upload. Check your connection and try again.' };
  }

  const presign = await readJson<PresignResponse>(presignResponse);
  if (presignResponse.status === 429) {
    return {
      ok: false,
      error: 'Too many upload attempts. Please wait a few minutes and try again.',
    };
  }
  if (!presignResponse.ok || !presign?.ok || !presign.uploadUrl || !presign.confirmToken) {
    return {
      ok: false,
      error: presign?.error ?? 'Could not prepare image upload.',
    };
  }

  const uploadUrl = new URL(presign.uploadUrl, window.location.origin).toString();

  let uploadResponse: Response;
  try {
    uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'image/webp' },
      body: webpBlob,
    });
  } catch (error) {
    console.error('[admin-upload] direct upload failed', error);
    return { ok: false, error: 'Image upload failed. Please try again.' };
  }

  if (!uploadResponse.ok) {
    const serverError = await readUploadError(uploadResponse);
    console.error('[admin-upload] storage rejected upload', uploadResponse.status, serverError);
    return {
      ok: false,
      error: serverError ?? 'Image upload to storage failed. Please try again.',
    };
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
        mimeType: 'image/webp',
        size: webpBlob.size,
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
