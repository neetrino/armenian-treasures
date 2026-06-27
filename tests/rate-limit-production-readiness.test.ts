import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getProductionRateLimitMisconfiguration,
  isDistributedRateLimitConfigured,
  isProductionRateLimitRuntime,
} from '@/lib/rate-limit/distributed-config';
import {
  assertProductionRateLimitReady,
  ProductionRateLimitMisconfiguredError,
} from '@/lib/rate-limit/assert-production-ready';
import { getPublicRateLimiter } from '@/lib/rate-limit';

function resetRateLimitGlobals(): void {
  const globalState = globalThis as unknown as {
    __rateLimitProdAssertDone?: boolean;
    __rateLimitDevWarnDone?: boolean;
    __rateLimiters?: Map<string, unknown>;
  };
  delete globalState.__rateLimitProdAssertDone;
  delete globalState.__rateLimitDevWarnDone;
  delete globalState.__rateLimiters;
}

describe('isDistributedRateLimitConfigured', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns false when disabled or incomplete', () => {
    vi.stubEnv('RATE_LIMIT_ENABLED', 'false');
    expect(isDistributedRateLimitConfigured()).toBe(false);

    vi.stubEnv('RATE_LIMIT_ENABLED', 'true');
    vi.stubEnv('RATE_LIMIT_REDIS_URL', 'https://example.upstash.io');
    vi.stubEnv('RATE_LIMIT_REDIS_TOKEN', '');
    expect(isDistributedRateLimitConfigured()).toBe(false);
  });

  it('returns true when all three vars are set', () => {
    vi.stubEnv('RATE_LIMIT_ENABLED', 'true');
    vi.stubEnv('RATE_LIMIT_REDIS_URL', 'https://example.upstash.io');
    vi.stubEnv('RATE_LIMIT_REDIS_TOKEN', 'token');
    expect(isDistributedRateLimitConfigured()).toBe(true);
  });
});

describe('isProductionRateLimitRuntime', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('is false during development and production build phase', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(isProductionRateLimitRuntime()).toBe(false);

    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-build');
    expect(isProductionRateLimitRuntime()).toBe(false);
  });

  it('is true for production server runtime', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-server');
    expect(isProductionRateLimitRuntime()).toBe(true);
  });
});

describe('getProductionRateLimitMisconfiguration', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    resetRateLimitGlobals();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetRateLimitGlobals();
  });

  it('returns null in development even without Redis', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'false');
    expect(getProductionRateLimitMisconfiguration()).toBeNull();
  });

  it('returns null in test environment', () => {
    vi.stubEnv('NODE_ENV', 'test');
    expect(getProductionRateLimitMisconfiguration()).toBeNull();
  });

  it('returns error when production runtime lacks distributed config', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-server');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'false');
    const message = getProductionRateLimitMisconfiguration();
    expect(message).toContain('Production requires distributed rate limiting');
  });

  it('returns error when enabled flag is set but Redis vars are missing', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-server');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'true');
    vi.stubEnv('RATE_LIMIT_REDIS_URL', '');
    vi.stubEnv('RATE_LIMIT_REDIS_TOKEN', '');
    const message = getProductionRateLimitMisconfiguration();
    expect(message).toContain('RATE_LIMIT_ENABLED=true');
    expect(message).toContain('missing');
  });

  it('returns null when production is fully configured', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-server');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'true');
    vi.stubEnv('RATE_LIMIT_REDIS_URL', 'https://example.upstash.io');
    vi.stubEnv('RATE_LIMIT_REDIS_TOKEN', 'token');
    expect(getProductionRateLimitMisconfiguration()).toBeNull();
  });

  it('returns null when RATE_LIMIT_ALLOW_IN_MEMORY opts out', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-server');
    vi.stubEnv('RATE_LIMIT_ALLOW_IN_MEMORY', 'true');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'false');
    expect(getProductionRateLimitMisconfiguration()).toBeNull();
  });
});

describe('assertProductionRateLimitReady', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    resetRateLimitGlobals();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetRateLimitGlobals();
    vi.restoreAllMocks();
  });

  it('throws in production runtime when Redis is not configured', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-server');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'false');
    expect(() => assertProductionRateLimitReady()).toThrow(ProductionRateLimitMisconfiguredError);
  });

  it('does not throw in development without Redis', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'false');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(() => assertProductionRateLimitReady()).not.toThrow();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('in-memory limiters'));
  });

  it('getPublicRateLimiter uses in-memory limiter in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('RATE_LIMIT_ENABLED', 'false');
    resetRateLimitGlobals();
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const limiter = getPublicRateLimiter();
    const first = await limiter.check('verify:dev');
    const second = await limiter.check('verify:dev');
    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
  });
});
