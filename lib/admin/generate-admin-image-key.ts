import { randomBytes } from 'node:crypto';
import {
  MIME_TO_EXTENSION,
  type AdminImageFolder,
  type AdminImageMimeType,
} from '@/lib/admin/image-upload-constants';

export function generateAdminImageStorageKey(
  folder: AdminImageFolder,
  mimeType: AdminImageMimeType,
  variant?: string,
): string {
  const random = randomBytes(6).toString('hex');
  const extension = MIME_TO_EXTENSION[mimeType];
  const suffix = variant ? `-${variant}` : '';
  return `images/${folder}/${folder}-${random}${suffix}.${extension}`;
}
