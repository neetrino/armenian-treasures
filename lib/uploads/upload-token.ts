import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const UPLOAD_TOKEN_TTL_MS = 10 * 60 * 1000;
export const UPLOAD_TOKEN_TTL_SECONDS = Math.floor(UPLOAD_TOKEN_TTL_MS / 1000);

export interface UploadTokenPayload {
  sessionId: string;
  exp: number;
  nonce: string;
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is required for upload tokens');
  return secret;
}

function signPayload(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createUploadSessionId(): string {
  return randomBytes(16).toString('hex');
}

export function createUploadToken(sessionId: string): string {
  const exp = Date.now() + UPLOAD_TOKEN_TTL_MS;
  const nonce = randomBytes(8).toString('hex');
  const payload = `${sessionId}.${exp}.${nonce}`;
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function verifyUploadToken(token: string): UploadTokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 4) return null;
  const [sessionId, expRaw, nonce, signature] = parts;
  if (!sessionId || !expRaw || !nonce || !signature) return null;

  const payload = `${sessionId}.${expRaw}.${nonce}`;
  const expected = signPayload(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Date.now()) return null;

  return { sessionId, exp, nonce };
}
