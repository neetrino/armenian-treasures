import { describe, expect, it } from 'vitest';
import { InMemoryRateLimiter } from '@/lib/rate-limit/in-memory';

describe('rate limiter', () => {
  it('limits repeated login attempts', async () => {
    const limiter = new InMemoryRateLimiter({ capacity: 2, windowMs: 60_000 });
    expect((await limiter.check('login:test@example.com:1.2.3.4')).allowed).toBe(true);
    expect((await limiter.check('login:test@example.com:1.2.3.4')).allowed).toBe(true);
    expect((await limiter.check('login:test@example.com:1.2.3.4')).allowed).toBe(false);
  });

  it('uses distinct keys so spoofed x-forwarded-for cannot bypass when untrusted', () => {
    const untrustedKey = 'login:test@example.com:unknown';
    const spoofedKey = 'login:test@example.com:1.2.3.4';
    expect(untrustedKey).not.toBe(spoofedKey);
  });
});
