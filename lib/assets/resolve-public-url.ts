import { getR2ManifestPublicBaseUrl, getR2ManifestUrl } from '@/lib/assets/r2-manifest';
import { isRasterPublicPath, isSvgPublicPath } from '@/lib/assets/public-asset-path';
import { getRasterPublicBaseUrl } from '@/lib/storage/raster-public-url';

function normalizePublicPath(path: string): string {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}

function normalizeLegacyMissingSvgPath(path: string): string {
  if (
    /^\/images\/culture\/[^/]+\.svg$/i.test(path) ||
    /^\/images\/projects\/[^/]+\.svg$/i.test(path)
  ) {
    return '/images/culture/card-heritage.webp';
  }
  return path;
}

function isAdminUploadPublicPath(path: string): boolean {
  return path.startsWith('/uploads/');
}

function isR2OnlyCulturalPortalIconPath(path: string): boolean {
  return /^\/icons\/cultural-portal\/[^/]+\.(png|webp)$/i.test(path);
}

function culturalPortalRasterFallbackSvg(path: string): string {
  if (path.includes('castles-v2.webp') || path.includes('castles-v2.png')) {
    return '/icons/cultural-portal/armaments.svg';
  }
  return path.replace(/\.(webp|png)$/i, '.svg');
}

function resolveRasterPathFromR2(path: string): string {
  const envBase =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim().replace(/\/$/, '') ||
    process.env.R2_PUBLIC_URL?.trim().replace(/\/$/, '');
  if (envBase) return `${envBase}${path}`;

  const fromManifest = getR2ManifestUrl(path);
  if (fromManifest) return fromManifest;

  const base = getRasterPublicBaseUrl();
  if (base) return `${base}${path}`;

  return path;
}

/**
 * Resolves a site-root public asset path (e.g. `/images/hero/home-hero.webp`).
 * SVG assets stay on the local `/public` tree. Raster images resolve to R2.
 * Absolute URLs are returned unchanged.
 */
export function resolvePublicAssetUrl(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const normalized = normalizePublicPath(trimmed);
  const normalizedLegacySafe = normalizeLegacyMissingSvgPath(normalized);

  if (isSvgPublicPath(normalizedLegacySafe)) {
    return normalizedLegacySafe;
  }

  if (
    isAdminUploadPublicPath(normalizedLegacySafe) ||
    isRasterPublicPath(normalizedLegacySafe) ||
    isR2OnlyCulturalPortalIconPath(normalizedLegacySafe)
  ) {
    const resolved = resolveRasterPathFromR2(normalizedLegacySafe);
    if (
      isR2OnlyCulturalPortalIconPath(normalizedLegacySafe) &&
      (resolved === normalizedLegacySafe || !/^https?:\/\//i.test(resolved))
    ) {
      return culturalPortalRasterFallbackSvg(normalizedLegacySafe);
    }
    return resolved;
  }

  const base = getRasterPublicBaseUrl() ?? getR2ManifestPublicBaseUrl();
  if (base) {
    return `${base}${normalizedLegacySafe}`;
  }

  return normalizedLegacySafe;
}
