import { describe, expect, it } from 'vitest';
import { extractClientIp } from '@/lib/rate-limit/client-ip';

describe('extractClientIp', () => {
  it('does not trust spoofed x-forwarded-for by default', () => {
    const headers = new Headers({
      'x-forwarded-for': '1.2.3.4',
    });
    expect(extractClientIp(headers)).toBe('unknown');
  });

  it('uses x-forwarded-for only when TRUSTED_PROXY_HEADERS=true', () => {
    process.env.TRUSTED_PROXY_HEADERS = 'true';
    const headers = new Headers({
      'x-forwarded-for': '1.2.3.4, 5.6.7.8',
    });
    expect(extractClientIp(headers)).toBe('1.2.3.4');
    process.env.TRUSTED_PROXY_HEADERS = 'false';
  });
});
