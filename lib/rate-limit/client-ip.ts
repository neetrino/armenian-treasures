
export function extractClientIp(headers: Headers): string {
  if (isTrustedProxyEnabled()) {
    const forwarded = headers.get('x-forwarded-for');
    if (forwarded) {
      const first = forwarded.split(',')[0]?.trim();
      if (first) return first;
    }
    const realIp = headers.get('x-real-ip')?.trim();
    if (realIp) return realIp;
  }

  const platformIp = headers.get('x-vercel-forwarded-for')?.trim();
  if (platformIp) return platformIp;

  return 'unknown';
}

function isTrustedProxyEnabled(): boolean {
  return process.env.TRUSTED_PROXY_HEADERS === 'true';
}
