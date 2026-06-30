import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

describe('resolvePublicAssetUrl', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.USE_R2_PUBLIC_ASSETS = 'false';
    process.env.NEXT_PUBLIC_USE_R2_PUBLIC_ASSETS = 'false';
    delete process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    delete process.env.R2_PUBLIC_URL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns local paths when R2 is disabled', () => {
    expect(resolvePublicAssetUrl('/images/hero/home-hero.png')).toBe(
      '/images/hero/home-hero.png',
    );
  });

  it('returns absolute URLs unchanged', () => {
    const url = 'https://cdn.example.com/images/hero.png';
    expect(resolvePublicAssetUrl(url)).toBe(url);
  });

  it('maps to R2 when enabled and base URL is configured', () => {
    process.env.NEXT_PUBLIC_USE_R2_PUBLIC_ASSETS = 'true';
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.example.com';

    expect(resolvePublicAssetUrl('/images/hero/home-hero.png')).toBe(
      'https://assets.example.com/images/hero/home-hero.png',
    );
  });

  it('maps to R2 when base URL exists even without explicit flags', () => {
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.example.com';

    expect(resolvePublicAssetUrl('/images/hero/home-hero.png')).toBe(
      'https://assets.example.com/images/hero/home-hero.png',
    );
  });

  it('rewrites legacy culture svg paths to the supported fallback image', () => {
    expect(resolvePublicAssetUrl('/images/culture/haghpat.svg')).toBe(
      '/images/culture/card-heritage.webp',
    );
  });

  it('rewrites legacy culture svg paths before resolving to R2', () => {
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.example.com';

    expect(resolvePublicAssetUrl('/images/culture/haghpat.svg')).toBe(
      'https://assets.example.com/images/culture/card-heritage.webp',
    );
  });

  it('resolves admin upload paths via manifest without R2 env flags', () => {
    expect(
      resolvePublicAssetUrl('/uploads/images/culture/culture-9f44566d18e7.png'),
    ).toBe(
      'https://pub-81a5f477bfce448aa07a1fbbb9abfceb.r2.dev/uploads/images/culture/culture-9f44566d18e7.png',
    );
  });

  it('prefers configured R2 base URL for admin upload paths', () => {
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://cdn.example.com';

    expect(resolvePublicAssetUrl('/uploads/images/culture/culture-abc123def456.jpg')).toBe(
      'https://cdn.example.com/uploads/images/culture/culture-abc123def456.jpg',
    );
  });
});
