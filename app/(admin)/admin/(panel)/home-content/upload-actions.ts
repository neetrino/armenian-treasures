'use server';

import { requireAdmin } from '@/lib/auth/require-admin';
import {
  uploadPublicImageFile,
  type AdminImageUploadResult,
} from '@/lib/admin/upload-public-image';

export async function uploadHeroImageAction(formData: FormData): Promise<AdminImageUploadResult> {  await requireAdmin();

  const file = formData.get('file');
  const variant = formData.get('variant')?.toString();

  if (!(file instanceof File)) {
    return { ok: false, error: 'No file provided.' };
  }

  if (variant !== 'desktop' && variant !== 'mobile') {
    return { ok: false, error: 'Invalid image variant.' };
  }

  return uploadPublicImageFile(file, 'hero', variant);
}
