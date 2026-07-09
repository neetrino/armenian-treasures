import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export const UNIVERSAL_PAGE_HERO_IMAGE = '/images/hero/universal-page-hero.webp';

export function resolveLandingImg(base: string, filename: string): string {
  const normalizedBase = base.trim().replace(/\/$/, '');
  const normalizedFilename = filename.trim().replace(/^\/+/, '');
  return resolvePublicAssetUrl(`${normalizedBase}/${normalizedFilename}`);
}

export function resolvePageHeroImageUrl(value?: string | null): string {
  const trimmed = value?.trim();
  return resolvePublicAssetUrl(trimmed || UNIVERSAL_PAGE_HERO_IMAGE);
}

export function readPageHeroImage(content: Record<string, unknown>): string {
  const heroImage = content.heroImage;
  return typeof heroImage === 'string' ? heroImage : '';
}

