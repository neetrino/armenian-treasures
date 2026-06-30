import { describe, expect, it } from 'vitest';
import { generateAdminImageStorageKey } from '@/lib/admin/generate-admin-image-key';
import { isAdminManagedUploadKey } from '@/lib/storage/key-policies';

describe('generateAdminImageStorageKey', () => {
  it('creates admin-managed keys for culture uploads', () => {
    const key = generateAdminImageStorageKey('culture', 'image/jpeg');
    expect(isAdminManagedUploadKey(key)).toBe(true);
    expect(key).toMatch(/^images\/culture\/culture-[a-f0-9]{12}\.jpg$/);
  });

  it('creates hero variant keys', () => {
    const key = generateAdminImageStorageKey('hero', 'image/webp', 'desktop');
    expect(isAdminManagedUploadKey(key)).toBe(true);
    expect(key).toMatch(/^images\/hero\/hero-[a-f0-9]{12}-desktop\.webp$/);
  });
});
