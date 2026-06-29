import { describe, expect, it } from 'vitest';
import { authConfig } from '@/lib/auth/config';
import { isRateLimitAuthError } from '@/lib/auth/rate-limit-error';

describe('authConfig redirect callback', () => {
  const redirect = authConfig.callbacks?.redirect;
  if (!redirect) throw new Error('redirect callback missing');

  it('returns baseUrl when url is undefined', async () => {
    await expect(
      redirect({ url: undefined as unknown as string, baseUrl: 'https://example.com' }),
    ).resolves.toBe('https://example.com');
  });

  it('allows same-origin relative paths', async () => {
    await expect(
      redirect({ url: '/admin/dashboard', baseUrl: 'https://example.com' }),
    ).resolves.toBe('https://example.com/admin/dashboard');
  });
});

describe('isRateLimitAuthError', () => {
  it('detects direct RATE_LIMITED errors', () => {
    expect(isRateLimitAuthError(new Error('RATE_LIMITED'))).toBe(true);
  });

  it('detects RATE_LIMITED wrapped in AuthError cause chain', () => {
    const wrapped = new Error('CallbackRouteError', {
      cause: new Error('RATE_LIMITED'),
    });
    expect(isRateLimitAuthError(wrapped)).toBe(true);
  });

  it('returns false for other auth errors', () => {
    expect(isRateLimitAuthError(new Error('CredentialsSignin'))).toBe(false);
  });
});
