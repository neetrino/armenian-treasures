import { getR2ManifestPublicBaseUrl, getR2ManifestUrl } from '@/lib/assets/r2-manifest';
import { isRasterPublicPath, isSvgPublicPath } from '@/lib/assets/public-asset-path';
import { getRasterPublicBaseUrl } from '@/lib/storage/raster-r2';

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

function isAdminUploadPublicPath(path: string): boolean {
  return path.startsWith('/uploads/');
}

function isR2OnlyCulturalPortalIconPath(path: string): boolean {
  return /^\/icons\/cultural-portal\/[^/]+\.(png|webp)$/i.test(path);
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
  const normalizedLegacySafe = normalizeLegacyCultureSvgPath(normalized);

  if (isSvgPublicPath(normalizedLegacySafe)) {
    return normalizedLegacySafe;
  }

  if (
    isAdminUploadPublicPath(normalizedLegacySafe) ||
    isRasterPublicPath(normalizedLegacySafe) ||
    isR2OnlyCulturalPortalIconPath(normalizedLegacySafe)
  ) {
    return resolveRasterPathFromR2(normalizedLegacySafe);
  }

  const base = getRasterPublicBaseUrl() ?? getR2ManifestPublicBaseUrl();
  if (base) {
    return `${base}${normalizedLegacySafe}`;
  }

  return normalizedLegacySafe;
}
