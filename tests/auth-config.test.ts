import { describe, expect, it } from 'vitest';
import { isRateLimitAuthError } from '@/lib/auth/rate-limit-error';

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
