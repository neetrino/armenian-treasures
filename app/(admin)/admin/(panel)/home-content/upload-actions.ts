'use server';

import { randomBytes } from 'node:crypto';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getStorage } from '@/lib/storage';
import { validateFileBuffer } from '@/lib/uploads/file-signature';

export interface HeroImageUploadResult {
  ok: boolean;
  url?: string;
  error?: string;
}

export async function uploadHeroImageAction(formData: FormData): Promise<HeroImageUploadResult> {
  await requireAdmin();

  const file = formData.get('file');
  const variant = formData.get('variant')?.toString();

  if (!(file instanceof File)) {
    return { ok: false, error: 'No file provided.' };
  }

  if (variant !== 'desktop' && variant !== 'mobile') {
    return { ok: false, error: 'Invalid image variant.' };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const validation = validateFileBuffer(buffer, file.name, file.type);

  if (!validation.ok || !validation.detectedMime || !validation.isImage) {
    return { ok: false, error: validation.reason ?? 'Invalid image file.' };
  }

  const ext = validation.extension ?? 'jpg';
  const random = randomBytes(6).toString('hex');
  const key = `images/hero/${variant}-${random}.${ext}`;

  const storage = getStorage();
  const uploadResult = await storage.upload({
    key,
    body: buffer,
    contentType: validation.detectedMime,
    visibility: 'public',
  });

  const url = uploadResult.url ?? storage.publicUrl(key);
  return { ok: true, url };
}
