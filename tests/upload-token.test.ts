import { describe, expect, it, vi } from 'vitest';
import { createUploadToken, verifyUploadToken } from '@/lib/uploads/upload-token';
import { consumeUploadTokenNonce } from '@/lib/uploads/upload-token-nonce';
import { UPLOAD_TOKEN_TTL_MS } from '@/lib/uploads/upload-token';

describe('upload auth tokens', () => {
  it('rejects missing or malformed upload token', () => {
    expect(verifyUploadToken('')).toBeNull();
    expect(verifyUploadToken('invalid.token.value')).toBeNull();
    expect(verifyUploadToken('session.exp.sig.only-three-parts')).toBeNull();
  });

  it('accepts valid signed upload token with nonce', () => {
    const token = createUploadToken('session-123');
    const payload = verifyUploadToken(token);
    expect(payload?.sessionId).toBe('session-123');
    expect(payload?.nonce).toMatch(/^[a-f0-9]{16}$/);
  });

  it('rejects expired upload token', () => {
    vi.useFakeTimers();
    const token = createUploadToken('session-123');
    vi.advanceTimersByTime(UPLOAD_TOKEN_TTL_MS + 1000);
    expect(verifyUploadToken(token)).toBeNull();
    vi.useRealTimers();
  });

  it('consumes nonce only once in memory', async () => {
    const token = createUploadToken('session-456');
    const payload = verifyUploadToken(token);
    expect(payload).not.toBeNull();
    if (!payload) return;

    const first = await consumeUploadTokenNonce(payload.nonce, payload.exp);
    const second = await consumeUploadTokenNonce(payload.nonce, payload.exp);
    expect(first).toBe(true);
    expect(second).toBe(false);
  });
});
