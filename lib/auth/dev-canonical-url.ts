export function getDevCanonicalOrigin(): URL | null {
  if (process.env.NODE_ENV !== 'development') return null;

  const raw = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  try {
    return new URL(raw);
  } catch {
    try {
      return new URL('http://localhost:3000');
    } catch {
      return null;
    }
  }
}

export function isPrivateNetworkHost(host: string): boolean {
  const hostname = host.split(':')[0]?.toLowerCase() ?? '';
  if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
    return false;
  }

  const match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!match) return false;

  const octets = match.slice(1, 5).map((part) => Number(part));
  if (octets.some((value) => value > 255)) return false;

  const [a, b] = octets;
  if (a === 10) return true;
  if (a === 172 && b !== undefined && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;

  return false;
}

export function rewriteDevRedirectUrl(url: string, baseUrl: string): string {
  const canonical = getDevCanonicalOrigin();
  if (!canonical) return url;

  const canonicalOrigin = canonical.origin;

  if (url.startsWith('/')) {
    return `${canonicalOrigin}${url}`;
  }

  try {
    const parsed = new URL(url);
    const base = new URL(baseUrl);
    const sameAsBase = parsed.origin === base.origin;
    const lanHost = isPrivateNetworkHost(parsed.host);

    if (sameAsBase && isPrivateNetworkHost(base.host)) {
      return `${canonicalOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    if (lanHost) {
      return `${canonicalOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return url;
  }

  return url;
}
