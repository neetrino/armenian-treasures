import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import {
  getDevCanonicalOrigin,
  isPrivateNetworkHost,
  rewriteDevRedirectUrl,
} from '@/lib/auth/dev-canonical-url';

describe('dev canonical url', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('AUTH_URL', 'http://localhost:3000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('detects private network hosts', () => {
    expect(isPrivateNetworkHost('192.168.15.237:3000')).toBe(true);
    expect(isPrivateNetworkHost('localhost:3000')).toBe(false);
    expect(isPrivateNetworkHost('127.0.0.1:3000')).toBe(false);
  });

  it('rewrites admin redirects to localhost in development', () => {
    expect(
      rewriteDevRedirectUrl('/admin/dashboard', 'http://192.168.15.237:3000'),
    ).toBe('http://localhost:3000/admin/dashboard');
  });

  it('returns canonical origin from AUTH_URL', () => {
    expect(getDevCanonicalOrigin()?.origin).toBe('http://localhost:3000');
  });
});
