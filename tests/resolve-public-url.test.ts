import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

describe('resolvePublicAssetUrl', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    delete process.env.R2_PUBLIC_URL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('keeps svg assets on local paths', () => {
    expect(resolvePublicAssetUrl('/favicon.svg')).toBe('/favicon.svg');
    expect(resolvePublicAssetUrl('/icons/cultural-portal/churches.svg')).toBe(
      '/icons/cultural-portal/churches.svg',
    );
  });

  it('resolves raster assets from the committed manifest without env flags', () => {
    expect(resolvePublicAssetUrl('/images/hero/home-hero.webp')).toBe(
      'https://pub-81a5f477bfce448aa07a1fbbb9abfceb.r2.dev/images/hero/home-hero.webp',
    );
  });

  it('returns absolute URLs unchanged', () => {
    const url = 'https://cdn.example.com/images/hero.png';
    expect(resolvePublicAssetUrl(url)).toBe(url);
  });

  it('prefers configured R2 base URL for raster assets', () => {
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.example.com';

    expect(resolvePublicAssetUrl('/images/hero/home-hero.webp')).toBe(
      'https://assets.example.com/images/hero/home-hero.webp',
    );
  });

  it('rewrites legacy culture svg paths to the supported fallback image', () => {
    expect(resolvePublicAssetUrl('/images/culture/haghpat.svg')).toBe(
      'https://pub-81a5f477bfce448aa07a1fbbb9abfceb.r2.dev/images/culture/card-heritage.webp',
    );
  });

  it('resolves admin upload paths via manifest without R2 env flags', () => {
    expect(
      resolvePublicAssetUrl('/uploads/images/culture/culture-9f44566d18e7.webp'),
    ).toBe(
      'https://pub-81a5f477bfce448aa07a1fbbb9abfceb.r2.dev/uploads/images/culture/culture-9f44566d18e7.webp',
    );
  });

  it('prefers configured R2 base URL for admin upload paths', () => {
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://cdn.example.com';

    expect(resolvePublicAssetUrl('/uploads/images/culture/culture-abc123def456.webp')).toBe(
      'https://cdn.example.com/uploads/images/culture/culture-abc123def456.webp',
    );
  });

  it('resolves cultural portal card WebP assets from the committed manifest', () => {
    expect(resolvePublicAssetUrl('/icons/cultural-portal/churches.webp')).toBe(
      'https://pub-81a5f477bfce448aa07a1fbbb9abfceb.r2.dev/icons/cultural-portal/churches.webp',
    );
  });
});
