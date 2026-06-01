import { describe, expect, it } from 'vitest';
import { createUploadToken, verifyUploadToken } from '@/lib/uploads/upload-token';

describe('upload auth tokens', () => {
  it('rejects missing upload token', () => {
    expect(verifyUploadToken('')).toBeNull();
    expect(verifyUploadToken('invalid.token.value')).toBeNull();
  });

  it('accepts valid signed upload token', () => {
    const token = createUploadToken('session-123');
    const payload = verifyUploadToken(token);
    expect(payload?.sessionId).toBe('session-123');
  });
});
