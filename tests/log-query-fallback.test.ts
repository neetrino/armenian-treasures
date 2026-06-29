import { afterEach, describe, expect, it, vi } from 'vitest';
import { logQueryFallback } from '@/lib/observability/log-query-fallback';

describe('logQueryFallback', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not log during tests', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    logQueryFallback({ query: 'home-content' });
    expect(warn).not.toHaveBeenCalled();
  });

  it('logs structured fallback context outside tests', () => {
    vi.stubEnv('NODE_ENV', 'development');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    logQueryFallback({ query: 'page-content', reason: 'db-error' });

    expect(warn).toHaveBeenCalledWith('[query-fallback]', {
      query: 'page-content',
      reason: 'db-error',
    });
  });
});
