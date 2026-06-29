import { randomBytes } from 'node:crypto';
import sharp from 'sharp';
import { prisma } from '@/lib/db';
import { getStorage } from '@/lib/storage';
import { validateFileBuffer } from '@/lib/uploads/file-signature';

export interface AdminImageUploadOwner {
  ownerType: string;
  ownerId: string;
}

export interface AdminImageUploadResult {
  ok: boolean;
  url?: string;
  error?: string;
}

const ADMIN_WEBP_QUALITY = 82;

async function convertImageBufferToWebp(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .rotate()
    .webp({ quality: ADMIN_WEBP_QUALITY })
    .toBuffer();
}

export async function uploadPublicImageFile(
  file: File,
  folder: 'hero' | 'culture',
  variant?: string,
  owner?: AdminImageUploadOwner,
): Promise<AdminImageUploadResult> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const validation = validateFileBuffer(buffer, file.name, file.type);

  if (!validation.ok || !validation.detectedMime || !validation.isImage) {
    return { ok: false, error: validation.reason ?? 'Invalid image file.' };
  }

  const random = randomBytes(6).toString('hex');
  const suffix = variant ? `-${variant}` : '';
  const key = `images/${folder}/${folder}-${random}${suffix}.webp`;
  let webpBuffer: Buffer;

  try {
    webpBuffer = await convertImageBufferToWebp(buffer);
  } catch {
    return { ok: false, error: 'Failed to convert image to WebP.' };
  }

  const storage = getStorage();
  const uploadResult = await storage.upload({
    key,
    body: webpBuffer,
    contentType: 'image/webp',
    visibility: 'public',
  });

  const url = uploadResult.url ?? storage.publicUrl(key);

  if (owner) {
    await prisma.uploadMetadata.create({
      data: {
        ownerType: owner.ownerType,
        ownerId: owner.ownerId,
        originalFilename: file.name,
        detectedMime: 'image/webp',
        fileSize: webpBuffer.length,
        storageKey: key,
        status: 'APPROVED',
        publicUrl: url,
      },
    });
  }

  return { ok: true, url };
}
