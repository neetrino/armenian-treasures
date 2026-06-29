import { Redis } from '@upstash/redis';
import { isDistributedRateLimitConfigured } from '@/lib/rate-limit/distributed-config';

const globalForNonce = globalThis as unknown as {
  __uploadNonceStore?: Map<string, number>;
};

function getInMemoryStore(): Map<string, number> {
  if (!globalForNonce.__uploadNonceStore) {
    globalForNonce.__uploadNonceStore = new Map();
  }
  return globalForNonce.__uploadNonceStore;
}

function pruneExpiredEntries(store: Map<string, number>, now: number): void {
  if (store.size < 256) return;
  for (const [nonce, expiresAt] of store) {
    if (expiresAt <= now) store.delete(nonce);
  }
}

async function consumeInMemory(nonce: string, expiresAtMs: number): Promise<boolean> {
  const now = Date.now();
  if (expiresAtMs <= now) return false;

  const store = getInMemoryStore();
  pruneExpiredEntries(store, now);
  if (store.has(nonce)) return false;

  store.set(nonce, expiresAtMs);
  return true;
}

function requiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

async function consumeDistributed(nonce: string, expiresAtMs: number): Promise<boolean> {
  const ttlSeconds = Math.max(1, Math.ceil((expiresAtMs - Date.now()) / 1000));
  const redis = new Redis({
    url: requiredEnv('RATE_LIMIT_REDIS_URL'),
    token: requiredEnv('RATE_LIMIT_REDIS_TOKEN'),
  });
  const result = await redis.set(`upload-nonce:${nonce}`, '1', { nx: true, ex: ttlSeconds });
  return result === 'OK';
}

export async function consumeUploadTokenNonce(
  nonce: string,
  expiresAtMs: number,
): Promise<boolean> {
  if (!nonce.trim()) return false;
  if (isDistributedRateLimitConfigured()) {
    return consumeDistributed(nonce, expiresAtMs);
  }
  return consumeInMemory(nonce, expiresAtMs);
}
