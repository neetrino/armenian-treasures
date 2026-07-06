import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { extractClientIp } from './client-ip';
import { InMemoryRateLimiter } from './in-memory';

export { extractClientIp };
export { InMemoryRateLimiter };

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

export interface RateLimitOptions {
  capacity: number;
  windowMs: number;
}

class UpstashRateLimiter implements RateLimiter {
  private readonly limiter: Ratelimit;

  constructor(capacity: number, windowMs: number, prefix: string) {
    const config = getRateLimitRedisConfig();
    if (!config) {
      throw new RateLimitMisconfiguredError(
        'RATE_LIMIT_ENABLED=true but Redis credentials are missing',
      );
    }

    const redis = new Redis({
      url: config.url,
      token: config.token,
    });
    this.limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(capacity, `${windowMs} ms`),
      prefix,
    });
  }

  async check(key: string): Promise<RateLimitResult> {
    try {
      const result = await this.limiter.limit(key);
      return {
        allowed: result.success,
        remaining: result.remaining,
        resetAt: result.reset,
      };
    } catch (error) {
      console.error('[rate-limit] Upstash check failed; allowing request', error);
      return {
        allowed: true,
        remaining: 0,
        resetAt: Date.now(),
      };
    }
  }
}

export class RateLimitMisconfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitMisconfiguredError';
  }
}

function getRateLimitRedisConfig(): { url: string; token: string } | null {
  const url = process.env.RATE_LIMIT_REDIS_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.RATE_LIMIT_REDIS_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function isRateLimitEnabled(): boolean {
  return process.env.RATE_LIMIT_ENABLED === 'true' && getRateLimitRedisConfig() !== null;
}

const globalForLimit = globalThis as unknown as {
  __rateLimiters?: Map<string, RateLimiter>;
};

function getLimiterMap(): Map<string, RateLimiter> {
  if (!globalForLimit.__rateLimiters) {
    globalForLimit.__rateLimiters = new Map();
  }
  return globalForLimit.__rateLimiters;
}

function getLimiter(name: string, options: RateLimitOptions): RateLimiter {
  const map = getLimiterMap();
  const existing = map.get(name);
  if (existing) return existing;

  let limiter: RateLimiter;
  if (isRateLimitEnabled()) {
    try {
      limiter = new UpstashRateLimiter(options.capacity, options.windowMs, `ratelimit:${name}`);
    } catch (error) {
      console.error('[rate-limit] Misconfigured; using in-memory fallback', error);
      limiter = new InMemoryRateLimiter(options);
    }
  } else {
    if (process.env.RATE_LIMIT_ENABLED === 'true') {
      console.warn(
        '[rate-limit] RATE_LIMIT_ENABLED=true but Redis env vars are missing; using in-memory limiter',
      );
    }
    limiter = new InMemoryRateLimiter(options);
  }

  map.set(name, limiter);
  return limiter;
}

export function getPublicRateLimiter(): RateLimiter {
  return getLimiter('public', { capacity: 20, windowMs: 10 * 60 * 1000 });
}

export function getPublicApiRateLimiter(): RateLimiter {
  return getLimiter('public-api', { capacity: 120, windowMs: 60 * 1000 });
}

export function getMemberLoginRateLimiter(): RateLimiter {
  return getLimiter('member-login', { capacity: 10, windowMs: 15 * 60 * 1000 });
}

export function getMemberRegisterRateLimiter(): RateLimiter {
  return getLimiter('member-register', { capacity: 5, windowMs: 60 * 60 * 1000 });
}

export function getAdminLoginRateLimiter(): RateLimiter {
  return getLimiter('admin-login', { capacity: 5, windowMs: 15 * 60 * 1000 });
}

export function getUploadRateLimiter(): RateLimiter {
  return getLimiter('upload', { capacity: 10, windowMs: 10 * 60 * 1000 });
}

/** Authenticated admin image uploads (presign only; higher than public upload cap). */
export function getAdminUploadRateLimiter(): RateLimiter {
  return getLimiter('admin-upload', { capacity: 40, windowMs: 10 * 60 * 1000 });
}

export function getUploadTokenMintRateLimiter(): RateLimiter {
  return getLimiter('upload-token-mint', { capacity: 5, windowMs: 15 * 60 * 1000 });
}

export function getAdminApiRateLimiter(): RateLimiter {
  return getLimiter('admin-api', { capacity: 120, windowMs: 60 * 1000 });
}

export function tooManyRequestsResponse(): Response {
  return Response.json({ error: 'Too many requests' }, { status: 429 });
}
