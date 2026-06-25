import { randomBytes } from 'node:crypto';
import { getStorage } from '@/lib/storage';
import { validateFileBuffer } from '@/lib/uploads/file-signature';

export interface AdminImageUploadResult {
  ok: boolean;
  url?: string;
  error?: string;
}

export async function uploadPublicImageFile(
  file: File,
  folder: 'hero' | 'culture',
  variant?: string,
): Promise<AdminImageUploadResult> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const validation = validateFileBuffer(buffer, file.name, file.type);

  if (!validation.ok || !validation.detectedMime || !validation.isImage) {
    return { ok: false, error: validation.reason ?? 'Invalid image file.' };
  }

  const ext = validation.extension ?? 'jpg';
  const random = randomBytes(6).toString('hex');
  const suffix = variant ? `-${variant}` : '';
  const key = `images/${folder}/${folder}-${random}${suffix}.${ext}`;

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
