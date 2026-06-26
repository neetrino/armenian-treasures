import { assertProductionRateLimitReady } from '@/lib/rate-limit/assert-production-ready';
import { isProductionRateLimitRuntime } from '@/lib/rate-limit/distributed-config';

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (!isProductionRateLimitRuntime()) return;
  assertProductionRateLimitReady();
}
