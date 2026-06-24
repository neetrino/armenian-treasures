import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const TOKEN_TTL_MS = 15 * 60 * 1000;

export interface UploadTokenPayload {
  sessionId: string;
  exp: number;
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
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `${sessionId}.${exp}`;
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function verifyUploadToken(token: string): UploadTokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [sessionId, expRaw, signature] = parts;
  if (!sessionId || !expRaw || !signature) return null;

  const payload = `${sessionId}.${expRaw}`;
  const expected = signPayload(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Date.now()) return null;

  return { sessionId, exp };
}
