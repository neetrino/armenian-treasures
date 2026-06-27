import { describe, expect, it } from 'vitest';
import {
  isAdminManagedUploadKey,
  isPrivateStorageKey,
  resolveAdminManagedStorageKey,
} from '@/lib/storage/key-policies';

describe('storage key policies', () => {
  it('marks quarantine prefixes as private', () => {
    expect(isPrivateStorageKey('quarantine/incoming/abc-file.pdf')).toBe(true);
    expect(isPrivateStorageKey('images/hero/hero-abc123def456.jpg')).toBe(false);
  });

  it('recognizes admin-managed upload keys', () => {
    expect(isAdminManagedUploadKey('images/hero/hero-abc123def456-desktop.jpg')).toBe(true);
    expect(isAdminManagedUploadKey('images/hero/home-hero.webp')).toBe(false);
  });

  it('resolves managed keys from local upload paths', () => {
    const key = resolveAdminManagedStorageKey(
      '/uploads/images/culture/culture-abc123def456.jpg',
    );
    expect(key).toBe('images/culture/culture-abc123def456.jpg');
  });
});
