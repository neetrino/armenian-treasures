type QueryFallbackContext = {
  query: string;
  reason?: string;
};

/** Structured warning when a query falls back due to DB or parse errors. */
export function logQueryFallback({ query, reason = 'unavailable' }: QueryFallbackContext): void {
  if (process.env.NODE_ENV === 'test') return;

  console.warn('[query-fallback]', { query, reason });
}
