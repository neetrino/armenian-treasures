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
    const redis = new Redis({
      url: requiredEnv('RATE_LIMIT_REDIS_URL'),
      token: requiredEnv('RATE_LIMIT_REDIS_TOKEN'),
    });
    this.limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(capacity, `${windowMs} ms`),
      prefix,
    });
  }

  async check(key: string): Promise<RateLimitResult> {
    const result = await this.limiter.limit(key);
    return {
      allowed: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  }
}

function requiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

function isRateLimitEnabled(): boolean {
  return (
    process.env.RATE_LIMIT_ENABLED === 'true' &&
    Boolean(process.env.RATE_LIMIT_REDIS_URL) &&
    Boolean(process.env.RATE_LIMIT_REDIS_TOKEN)
  );
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

  const limiter = isRateLimitEnabled()
    ? new UpstashRateLimiter(options.capacity, options.windowMs, `ratelimit:${name}`)
    : new InMemoryRateLimiter(options);

  map.set(name, limiter);
  return limiter;
}

export function getPublicRateLimiter(): RateLimiter {
  return getLimiter('public', { capacity: 20, windowMs: 10 * 60 * 1000 });
}

export function getAdminLoginRateLimiter(): RateLimiter {
  return getLimiter('admin-login', { capacity: 5, windowMs: 15 * 60 * 1000 });
}

export function getUploadRateLimiter(): RateLimiter {
  return getLimiter('upload', { capacity: 10, windowMs: 10 * 60 * 1000 });
}

export function getAdminApiRateLimiter(): RateLimiter {
  return getLimiter('admin-api', { capacity: 120, windowMs: 60 * 1000 });
}

export function tooManyRequestsResponse(): Response {
  return Response.json({ error: 'Too many requests' }, { status: 429 });
}
