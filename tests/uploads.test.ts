import { describe, expect, it } from 'vitest';
import { detectMimeFromBuffer, validateFileBuffer } from '@/lib/uploads/file-signature';

function pngBuffer(): Buffer {
  return Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x00,
  ]);
}

describe('upload file signature validation', () => {
  it('rejects spoofed MIME for fake image content', () => {
    const buffer = Buffer.from('not-an-image');
    const result = validateFileBuffer(buffer, 'photo.png', 'image/png');
    expect(result.ok).toBe(false);
  });

  it('rejects wrong magic bytes', () => {
    const buffer = Buffer.from('%PDF-1.4 fake');
    const result = validateFileBuffer(buffer, 'photo.png', 'image/png');
    expect(result.ok).toBe(false);
  });

  it('rejects unsupported extension', () => {
    const result = validateFileBuffer(pngBuffer(), 'photo.exe', 'image/png');
    expect(result.ok).toBe(false);
  });

  it('accepts valid PNG after signature validation', () => {
    const result = validateFileBuffer(pngBuffer(), 'photo.png', 'image/png');
    expect(result.ok).toBe(true);
    expect(result.detectedMime).toBe('image/png');
    expect(detectMimeFromBuffer(pngBuffer())).toBe('image/png');
  });

  it('rejects too-large files', () => {
    const large = Buffer.concat([pngBuffer(), Buffer.alloc(6 * 1024 * 1024)]);
    const result = validateFileBuffer(large, 'photo.png', 'image/png');
    expect(result.ok).toBe(false);
  });
});
