import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export const HERO_HOME_IMAGE = resolvePublicAssetUrl('/images/hero/universal-page-hero.png');

/** @deprecated Use HERO_HOME_IMAGE for home hero; kept for inner-page heroes. */
export const HERO_WEBP_DEFAULT = resolvePublicAssetUrl('/images/hero/universal-page-hero.png');

const HERO_SOURCE_MAP: Record<string, string> = {
  '/images/hero/home-hero.png': HERO_HOME_IMAGE,
  '/images/hero/home-hero.webp': HERO_HOME_IMAGE,
  '/images/hero/home.svg': HERO_HOME_IMAGE,
  '/images/hero/about.svg': HERO_WEBP_DEFAULT,
  '/images/hero/universal-page-hero.png': HERO_HOME_IMAGE,
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
): { desktop: string | null; mobile: string | null } {
  const desktopTrimmed = desktopSource?.trim();
  const mobileTrimmed = mobileSource?.trim();

  if (!desktopTrimmed && !mobileTrimmed) {
    return { desktop: HERO_HOME_IMAGE, mobile: HERO_HOME_IMAGE };
  }

  const desktop = desktopTrimmed ? resolveHeroImageUrl(desktopTrimmed) : null;
  const mobile = mobileTrimmed
    ? resolveHeroImageUrl(mobileTrimmed)
    : desktop;

  return { desktop, mobile };
}
