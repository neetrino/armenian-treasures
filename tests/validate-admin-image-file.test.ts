import { describe, expect, it } from 'vitest';
import { ADMIN_IMAGE_MAX_SIZE_BYTES } from '@/lib/admin/image-upload-constants';
import { validateAdminImageFile } from '@/lib/admin/validate-admin-image-file';

function makeFile(name: string, type: string, size: number): File {
  const buffer = new Uint8Array(size);
  return new File([buffer], name, { type });
}

describe('validateAdminImageFile', () => {
  it('accepts valid jpeg files', () => {
    const file = makeFile('photo.jpg', 'image/jpeg', 1024);
    expect(validateAdminImageFile(file)).toEqual({ ok: true });
  });

  it('rejects unsupported mime types', () => {
    const file = makeFile('doc.pdf', 'application/pdf', 1024);
    expect(validateAdminImageFile(file).ok).toBe(false);
  });

  it('rejects oversized files', () => {
    const file = makeFile('large.png', 'image/png', ADMIN_IMAGE_MAX_SIZE_BYTES + 1);
    expect(validateAdminImageFile(file).ok).toBe(false);
  });
});
