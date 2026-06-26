/**
 * Distributed (Upstash) rate limiting requires all three env vars.
 * Partial configuration falls back to in-memory — unsafe in multi-instance production.
 */
export function isDistributedRateLimitConfigured(): boolean {
  return (
    process.env.RATE_LIMIT_ENABLED === 'true' &&
    Boolean(process.env.RATE_LIMIT_REDIS_URL?.trim()) &&
    Boolean(process.env.RATE_LIMIT_REDIS_TOKEN?.trim())
  );
}

export function isProductionRateLimitRuntime(): boolean {
  if (process.env.NODE_ENV !== 'production') return false;
  // next build sets NODE_ENV=production; skip enforcement during compile-only phase.
  if (process.env.NEXT_PHASE === 'phase-production-build') return false;
  return true;
}

export function getProductionRateLimitMisconfiguration(): string | null {
  if (!isProductionRateLimitRuntime()) return null;
  if (process.env.RATE_LIMIT_ALLOW_IN_MEMORY === 'true') return null;

  const enabled = process.env.RATE_LIMIT_ENABLED === 'true';
  const hasUrl = Boolean(process.env.RATE_LIMIT_REDIS_URL?.trim());
  const hasToken = Boolean(process.env.RATE_LIMIT_REDIS_TOKEN?.trim());

  if (enabled && hasUrl && hasToken) return null;

  if (enabled && (!hasUrl || !hasToken)) {
    return (
      'RATE_LIMIT_ENABLED=true but RATE_LIMIT_REDIS_URL and/or RATE_LIMIT_REDIS_TOKEN are missing. ' +
      'In-memory rate limiting is not safe for multi-instance production.'
    );
  }

  return (
    'Production requires distributed rate limiting (Upstash Redis). ' +
    'Set RATE_LIMIT_ENABLED=true, RATE_LIMIT_REDIS_URL, and RATE_LIMIT_REDIS_TOKEN. ' +
    'See README.md deployment notes and SECURITY_NOTES.md.'
  );
}
