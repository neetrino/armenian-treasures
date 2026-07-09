import { randomBytes } from 'node:crypto';
import {
  type AdminImageFolder,
  type AdminImageMimeType,
} from '@/lib/admin/image-upload-constants';

export function generateAdminImageStorageKey(
  folder: AdminImageFolder,
  _mimeType: AdminImageMimeType,
  variant?: string,
): string {
  const random = randomBytes(6).toString('hex');
  const suffix = variant ? `-${variant}` : '';
  return `images/${folder}/${folder}-${random}${suffix}.webp`;
}
