import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export const HERO_HOME_IMAGE = resolvePublicAssetUrl('/images/hero/home-hero.png');

/** @deprecated Use HERO_HOME_IMAGE for home hero; kept for inner-page heroes. */
export const HERO_WEBP_DEFAULT = resolvePublicAssetUrl('/images/hero/home-hero.webp');

const HERO_SOURCE_MAP: Record<string, string> = {
  '/images/hero/home-hero.png': HERO_HOME_IMAGE,
  '/images/hero/home-hero.webp': HERO_HOME_IMAGE,
  '/images/hero/home.svg': HERO_HOME_IMAGE,
  '/images/hero/about.svg': HERO_WEBP_DEFAULT,
};

export function resolveHeroImageUrl(source?: string | null): string {
  const trimmed = source?.trim();
  if (!trimmed) return HERO_HOME_IMAGE;

  const mapped = HERO_SOURCE_MAP[trimmed];
  if (mapped) return mapped;

  if (/home-hero\.webp$/i.test(trimmed)) return HERO_HOME_IMAGE;
  if (/\.webp$/i.test(trimmed)) return resolvePublicAssetUrl(trimmed);

  return resolvePublicAssetUrl(trimmed);
}

export function resolveHomeHeroImageUrls(
  desktopSource?: string | null,
  mobileSource?: string | null,
): { desktop: string; mobile: string } {
  const desktop = resolveHeroImageUrl(desktopSource);
  const mobile = resolveHeroImageUrl(
    mobileSource?.trim() ? mobileSource : desktopSource ?? null,
  );
  return { desktop, mobile };
}
