import { afterEach, describe, expect, it } from 'vitest';
import { getSiteUrl } from '@/lib/site-url';

const ENV_KEYS = ['SITE_URL', 'AUTH_URL', 'NEXTAUTH_URL'] as const;

function clearUrlEnv(): void {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
}

describe('getSiteUrl', () => {
  afterEach(() => {
    clearUrlEnv();
  });

  it('prefers SITE_URL over auth env vars', () => {
    process.env.SITE_URL = 'https://armeniantreasures.org/';
    process.env.AUTH_URL = 'https://auth.example.com';
    process.env.NEXTAUTH_URL = 'https://nextauth.example.com';
    expect(getSiteUrl()).toBe('https://armeniantreasures.org');
  });

  it('falls back to AUTH_URL then NEXTAUTH_URL', () => {
    process.env.AUTH_URL = 'https://armeniantreasures.org/';
    process.env.NEXTAUTH_URL = 'https://legacy.example.com';
    expect(getSiteUrl()).toBe('https://armeniantreasures.org');
  });

  it('uses localhost when unset', () => {
    clearUrlEnv();
    expect(getSiteUrl()).toBe('http://localhost:3000');
  });
});
