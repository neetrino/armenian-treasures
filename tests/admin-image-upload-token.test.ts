import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  createImageUploadConfirmToken,
  verifyImageUploadConfirmToken,
} from '@/lib/admin/image-upload-confirm-token';

describe('image upload confirm token', () => {
  const originalSecret = process.env.AUTH_SECRET;

  beforeEach(() => {
    process.env.AUTH_SECRET = 'test-secret';
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.AUTH_SECRET;
    } else {
      process.env.AUTH_SECRET = originalSecret;
    }
  });

  it('round-trips a valid confirm token', () => {
    const token = createImageUploadConfirmToken({
      storageKey: 'images/culture/culture-abc123def456.jpg',
      mimeType: 'image/jpeg',
      maxSize: 5 * 1024 * 1024,
      ownerId: 'admin-1',
      exp: Date.now() + 60_000,
    });

    const payload = verifyImageUploadConfirmToken(token);
    expect(payload?.storageKey).toBe('images/culture/culture-abc123def456.jpg');
    expect(payload?.ownerId).toBe('admin-1');
  });

  it('rejects expired tokens', () => {
    const token = createImageUploadConfirmToken({
      storageKey: 'images/culture/culture-abc123def456.jpg',
      mimeType: 'image/jpeg',
      maxSize: 5 * 1024 * 1024,
      ownerId: 'admin-1',
      exp: Date.now() - 1,
    });

    expect(verifyImageUploadConfirmToken(token)).toBeNull();
  });
});
