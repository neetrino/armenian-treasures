export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export interface RateLimitOptions {
  capacity: number;
  windowMs: number;
}

interface Bucket {
  tokens: number;
  resetAt: number;
}

export class InMemoryRateLimiter {
  private readonly buckets = new Map<string, Bucket>();
  private readonly capacity: number;
  private readonly windowMs: number;

  constructor(options: RateLimitOptions) {
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
