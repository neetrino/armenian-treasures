export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

interface Bucket {
  tokens: number;
  resetAt: number;
}

export interface RateLimitOptions {
  capacity: number;
  windowMs: number;
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  capacity: 10,
  windowMs: 10 * 60 * 1000,
};

class InMemoryRateLimiter implements RateLimiter {
  private readonly buckets = new Map<string, Bucket>();
  private readonly capacity: number;
  private readonly windowMs: number;

  constructor(options: RateLimitOptions = DEFAULT_OPTIONS) {
    this.capacity = options.capacity;
    this.windowMs = options.windowMs;
  }

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      const next: Bucket = { tokens: this.capacity - 1, resetAt: now + this.windowMs };
      this.buckets.set(key, next);
      return { allowed: true, remaining: next.tokens, resetAt: next.resetAt };
    }
    if (bucket.tokens <= 0) {
      return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
    }
    bucket.tokens -= 1;
    return { allowed: true, remaining: bucket.tokens, resetAt: bucket.resetAt };
  }
}

const globalForLimit = globalThis as unknown as {
  __publicRateLimiter?: RateLimiter;
};

export function getPublicRateLimiter(): RateLimiter {
  if (!globalForLimit.__publicRateLimiter) {
    globalForLimit.__publicRateLimiter = new InMemoryRateLimiter();
  }
  return globalForLimit.__publicRateLimiter;
}

export function extractClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') ?? '0.0.0.0';
}
