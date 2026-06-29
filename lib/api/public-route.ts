import { extractClientIp, getPublicApiRateLimiter, tooManyRequestsResponse } from '@/lib/rate-limit';

export async function withPublicApiRateLimit(
  request: Request,
  handler: () => Promise<Response>,
): Promise<Response> {
  const ip = extractClientIp(request.headers);
  const pathname = new URL(request.url).pathname;
  const limiter = getPublicApiRateLimiter();
  const check = await limiter.check(`public-api:${pathname}:${ip}`);
  if (!check.allowed) {
    return tooManyRequestsResponse();
  }
  return handler();
}
