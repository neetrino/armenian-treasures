export function isRateLimitAuthError(error: unknown): boolean {
  let current: unknown = error;
  while (current instanceof Error) {
    if (current.message === 'RATE_LIMITED') return true;
    current = current.cause;
  }
  return false;
}
