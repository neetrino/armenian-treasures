import { getR2ManifestUrl } from '@/lib/assets/r2-manifest';

function normalizePublicPath(path: string): string {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}

function normalizeLegacyCultureSvgPath(path: string): string {
  if (/^\/images\/culture\/[^/]+\.svg$/i.test(path)) {
    return '/images/culture/card-heritage.webp';
  }
  return path;
}

function getPublicR2BaseUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim() || null;
  return base ? base.replace(/\/$/, '') : null;
}

function shouldUseR2PublicAssets(): boolean {
  if (getPublicR2BaseUrl()) return true;
  return process.env.NEXT_PUBLIC_USE_R2_PUBLIC_ASSETS === 'true';
}

/**
 * Resolves a site-root public asset path (e.g. `/images/hero/home-hero.png`)
 * to an R2 URL when migration is enabled, otherwise returns the local path.
 * Absolute URLs are returned unchanged. Local `/public` files remain the fallback.
 */
export function resolvePublicAssetUrl(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const normalized = normalizePublicPath(trimmed);
  const normalizedLegacySafe = normalizeLegacyCultureSvgPath(normalized);

  if (!shouldUseR2PublicAssets()) {
    return normalizedLegacySafe;
  }

  const base = getPublicR2BaseUrl();
  if (base) {
    return `${base}${normalizedLegacySafe}`;
  }

  const fromManifest = getR2ManifestUrl(normalizedLegacySafe);
  if (fromManifest) return fromManifest;

  return normalizedLegacySafe;
}
