import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export function resolveLandingImg(base: string, filename: string): string {
  const normalizedBase = base.trim().replace(/\/$/, '');
  const normalizedFilename = filename.trim().replace(/^\/+/, '');
  return resolvePublicAssetUrl(`${normalizedBase}/${normalizedFilename}`);
}

export function resolvePageHeroImageUrl(value?: string | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return resolvePublicAssetUrl(trimmed);
}

export function readPageHeroImage(content: Record<string, unknown>): string {
  const heroImage = content.heroImage;
  return typeof heroImage === 'string' ? heroImage : '';
}

