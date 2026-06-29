import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resolveLandingImg } from '@/lib/page-content-images';

describe('resolveLandingImg', () => {
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

  it('returns absolute base paths unchanged', () => {
    expect(resolveLandingImg('https://assets.example.com/khndzoresk', 'hero.webp')).toBe(
      'https://assets.example.com/khndzoresk/hero.webp',
    );
  });

  it('resolves local base paths through R2 public URL', () => {
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.example.com';

    expect(resolveLandingImg('/images/khndzoresk', 'hero.webp')).toBe(
      'https://assets.example.com/images/khndzoresk/hero.webp',
    );
  });
});
