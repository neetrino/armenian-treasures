'use server';

import { requireAdmin } from '@/lib/auth/require-admin';
import {
  uploadPublicImageFile,
  type AdminImageUploadResult,
} from '@/lib/admin/upload-public-image';

export async function uploadAdminImageAction(formData: FormData): Promise<AdminImageUploadResult> {
  const admin = await requireAdmin();

  const file = formData.get('file');
  const folder = formData.get('folder')?.toString();
  const variant = formData.get('variant')?.toString();

  if (!(file instanceof File)) {
    return { ok: false, error: 'No file provided.' };
  }

  if (folder !== 'hero' && folder !== 'culture') {
    return { ok: false, error: 'Invalid upload folder.' };
  }

  if (folder === 'hero' && variant !== 'desktop' && variant !== 'mobile') {
    return { ok: false, error: 'Invalid image variant.' };
  }

  return uploadPublicImageFile(file, folder, variant, {
    ownerType: 'admin',
    ownerId: admin.id,
  });
}
