import { describe, expect, it } from 'vitest';
import {
  convertRasterToWebp,
  isConvertibleRasterMime,
  toWebpFilename,
} from '@/lib/images/convert-raster-to-webp';

describe('convert-raster-to-webp', () => {
  it('detects convertible raster mime types', () => {
    expect(isConvertibleRasterMime('image/jpeg')).toBe(true);
    expect(isConvertibleRasterMime('image/png')).toBe(true);
    expect(isConvertibleRasterMime('image/webp')).toBe(false);
    expect(isConvertibleRasterMime('image/svg+xml')).toBe(false);
  });

  it('rewrites filenames to webp', () => {
    expect(toWebpFilename('photo.jpg')).toBe('photo.webp');
    expect(toWebpFilename('photo.PNG')).toBe('photo.webp');
    expect(toWebpFilename('photo.webp')).toBe('photo.webp');
  });

  it('converts a png buffer to webp', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );
    const webp = await convertRasterToWebp(png);
    expect(webp.length).toBeGreaterThan(0);
    expect(webp.subarray(0, 4).toString('ascii')).toBe('RIFF');
  });
});
