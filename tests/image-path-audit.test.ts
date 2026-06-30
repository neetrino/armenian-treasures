import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { auditImagePath } from '@/lib/assets/image-path-audit';

describe('auditImagePath', () => {
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

  it('marks empty paths as empty', () => {
    expect(auditImagePath('')).toEqual({ status: 'empty', resolvedUrl: '' });
  });

  it('marks absolute URLs as external', () => {
    const url = 'https://cdn.example.com/images/hero.webp';
    expect(auditImagePath(url)).toEqual({ status: 'external', resolvedUrl: url });
  });

  it('marks migrated upload paths as ok via manifest resolution', () => {
    const result = auditImagePath('/uploads/images/culture/culture-9f44566d18e7.png');
    expect(result.status).toBe('ok');
    expect(result.resolvedUrl).toContain('r2.dev/uploads/images/culture/culture-9f44566d18e7.png');
  });
});
