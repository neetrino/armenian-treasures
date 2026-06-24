import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    uploadMetadata: {
      create: vi.fn().mockResolvedValue({
        id: 'upload-1',
        storageKey: 'quarantine/incoming/abc-file.pdf',
        status: 'PENDING_SCAN',
        publicUrl: null,
      }),
    },
  },
}));

vi.mock('@/lib/storage', () => ({
  getStorage: () => ({
    upload: vi.fn().mockResolvedValue({ key: 'quarantine/incoming/abc-file.pdf', url: null }),
    publicUrl: vi.fn(),
  }),
}));

import { storeValidatedUpload } from '@/lib/uploads/store-upload';

describe('storeValidatedUpload', () => {
  it('does not return public URL for quarantined documents', async () => {
    const result = await storeValidatedUpload({
      ownerType: 'session',
      ownerId: 'session-1',
      originalFilename: 'notes.pdf',
      detectedMime: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4'),
      isImage: false,
    });
    expect(result.status).toBe('PENDING_SCAN');
    expect(result.publicUrl).toBeNull();
  });
});
