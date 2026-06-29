import { getR2ManifestUrl } from '@/lib/assets/r2-manifest';

function normalizePublicPath(path: string): string {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}

function getPublicR2BaseUrl(): string | null {
  const base =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim() ||
    process.env.R2_PUBLIC_URL?.trim() ||
    null;
  return base ? base.replace(/\/$/, '') : null;
}

function shouldUseR2PublicAssets(): boolean {
  if (getPublicR2BaseUrl()) return true;
  return (
    process.env.NEXT_PUBLIC_USE_R2_PUBLIC_ASSETS === 'true' ||
    process.env.USE_R2_PUBLIC_ASSETS === 'true'
  );
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

  if (!shouldUseR2PublicAssets()) {
    return normalized;
  }

  const fromManifest = getR2ManifestUrl(normalized);
  if (fromManifest) return fromManifest;

  const base = getPublicR2BaseUrl();
  if (base) {
    return `${base}${normalized}`;
  }

  return normalized;
}
