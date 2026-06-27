const LOCAL_FALLBACK = 'http://localhost:3000';

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

/**
 * Canonical public site origin for metadata, sitemap, robots, and absolute URLs.
 * Prefer SITE_URL; fall back to AUTH_URL then NEXTAUTH_URL for Auth.js compatibility.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL?.trim() ||
    process.env.AUTH_URL?.trim() ||
    process.env.NEXTAUTH_URL?.trim() ||
    LOCAL_FALLBACK;
  return normalizeOrigin(raw);
}
