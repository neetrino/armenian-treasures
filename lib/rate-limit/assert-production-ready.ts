import {
  getProductionRateLimitMisconfiguration,
  isDistributedRateLimitConfigured,
  isProductionRateLimitRuntime,
} from './distributed-config';

const globalForAssert = globalThis as unknown as {
  __rateLimitProdAssertDone?: boolean;
  __rateLimitDevWarnDone?: boolean;
};

export class ProductionRateLimitMisconfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductionRateLimitMisconfiguredError';
  }
}

export function assertProductionRateLimitReady(): void {
  if (globalForAssert.__rateLimitProdAssertDone) return;

  const misconfiguration = getProductionRateLimitMisconfiguration();
  if (misconfiguration) {
    throw new ProductionRateLimitMisconfiguredError(misconfiguration);
  }

  if (isProductionRateLimitRuntime()) {
    globalForAssert.__rateLimitProdAssertDone = true;
    return;
  }

  if (
    process.env.NODE_ENV === 'development' &&
    !isDistributedRateLimitConfigured() &&
    !globalForAssert.__rateLimitDevWarnDone
  ) {
    globalForAssert.__rateLimitDevWarnDone = true;
    console.warn(
      '[rate-limit] Using in-memory limiters (development only). ' +
        'Production requires RATE_LIMIT_ENABLED=true with Upstash Redis credentials.',
    );
  }
}
