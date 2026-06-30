import {
  ADMIN_IMAGE_FOLDERS,
  ADMIN_IMAGE_VARIANTS,
  isAdminImageMimeType,
  parseAdminImageMaxSize,
  type AdminImageFolder,
  type AdminImageMimeType,
  type AdminImageVariant,
} from '@/lib/admin/image-upload-constants';
import { generateAdminImageStorageKey } from '@/lib/admin/generate-admin-image-key';
import {
  CONFIRM_TOKEN_TTL_MS,
  createImageUploadConfirmToken,
} from '@/lib/admin/image-upload-confirm-token';
import {
  createImageUploadPutToken,
  PUT_TOKEN_TTL_MS,
} from '@/lib/admin/image-upload-put-token';
import { getStorage } from '@/lib/storage';
import { isAdminManagedUploadKey } from '@/lib/storage/key-policies';

export interface AdminImagePresignRequest {
  filename: string;
  mimeType: string;
  size: number;
  folder: string;
  variant?: string;
}

export interface AdminImagePresignResult {
  ok: boolean;
  uploadUrl?: string;
  storageKey?: string;
  publicUrl?: string;
  confirmToken?: string;
  error?: string;
}

function validatePresignRequest(
  input: AdminImagePresignRequest,
): { ok: true; folder: AdminImageFolder; mimeType: AdminImageMimeType; variant?: AdminImageVariant } | { ok: false; error: string } {
  const filename = input.filename?.trim();
  if (!filename) return { ok: false, error: 'Filename is required.' };

  if (!isAdminImageMimeType(input.mimeType)) {
    return { ok: false, error: 'Only JPG, PNG, or WebP images are allowed.' };
  }

  const maxSize = parseAdminImageMaxSize();
  if (!Number.isFinite(input.size) || input.size <= 0) {
    return { ok: false, error: 'Invalid file size.' };
  }
  if (input.size > maxSize) {
    return { ok: false, error: `Image exceeds ${Math.round(maxSize / (1024 * 1024))} MB.` };
  }

  if (!ADMIN_IMAGE_FOLDERS.includes(input.folder as AdminImageFolder)) {
    return { ok: false, error: 'Invalid upload folder.' };
  }
  const folder = input.folder as AdminImageFolder;

  let variant: AdminImageVariant | undefined;
  if (folder === 'hero') {
    if (!input.variant || !ADMIN_IMAGE_VARIANTS.includes(input.variant as AdminImageVariant)) {
      return { ok: false, error: 'Invalid image variant.' };
    }
    variant = input.variant as AdminImageVariant;
  } else if (input.variant) {
    return { ok: false, error: 'Variant is only allowed for hero images.' };
  }

  return { ok: true, folder, mimeType: input.mimeType, variant };
}

export async function createAdminImagePresign(
  ownerId: string,
  input: AdminImagePresignRequest,
): Promise<AdminImagePresignResult> {
  const validated = validatePresignRequest(input);
  if (!validated.ok) {
    return { ok: false, error: validated.error };
  }

  const { folder, mimeType, variant } = validated;
  const storageKey = generateAdminImageStorageKey(folder, mimeType, variant);
  if (!isAdminManagedUploadKey(storageKey)) {
    console.error('[admin-upload] generated invalid storage key', storageKey);
    return { ok: false, error: 'Failed to prepare upload.' };
  }

  const maxSize = parseAdminImageMaxSize();
  const exp = Date.now() + CONFIRM_TOKEN_TTL_MS;
  const confirmToken = createImageUploadConfirmToken({
    storageKey,
    mimeType,
    maxSize,
    ownerId,
    exp,
  });

  const storage = getStorage();
  const publicUrl = storage.publicUrl(storageKey);

  const putExp = Date.now() + PUT_TOKEN_TTL_MS;
  const putToken = createImageUploadPutToken({
    storageKey,
    mimeType,
    maxSize,
    ownerId,
    exp: putExp,
  });

  return {
    ok: true,
    uploadUrl: `/api/admin/uploads/put?token=${encodeURIComponent(putToken)}`,
    storageKey,
    publicUrl,
    confirmToken,
  };
}
