import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AdminImageMimeType } from '@/lib/admin/image-upload-constants';

export const CONFIRM_TOKEN_TTL_MS = 15 * 60 * 1000;

export interface ImageUploadConfirmPayload {
  storageKey: string;
  mimeType: AdminImageMimeType;
  maxSize: number;
  ownerId: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is required for image upload confirm tokens');
  return secret;
}

function signPayload(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createImageUploadConfirmToken(payload: ImageUploadConfirmPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = signPayload(body);
  return `${body}.${signature}`;
}

export function verifyImageUploadConfirmToken(token: string): ImageUploadConfirmPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, signature] = parts;
  if (!body || !signature) return null;

  const expected = signPayload(body);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as ImageUploadConfirmPayload;
    if (
      !parsed.storageKey ||
      !parsed.mimeType ||
      !parsed.ownerId ||
      !Number.isFinite(parsed.maxSize) ||
      !Number.isFinite(parsed.exp)
    ) {
      return null;
    }
    if (parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}
