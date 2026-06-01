export const HERO_HOME_IMAGE = '/images/hero/home-hero.png';

/** @deprecated Use HERO_HOME_IMAGE for home hero; kept for inner-page heroes. */
export const HERO_WEBP_DEFAULT = '/images/hero/home-hero.webp';

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
  if (/\.webp$/i.test(trimmed)) return trimmed;

  return trimmed;
}
