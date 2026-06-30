import type { PageContentSlug } from '@/lib/types/page-content';
import {
  PAGE_CONTENT_DESCRIPTIONS,
  PAGE_CONTENT_TITLES,
} from '@/lib/types/page-content';

export interface CulturePageContentNavItem {
  slug: PageContentSlug;
  label: string;
  description: string;
  publicHref: string;
  adminHref: string;
}

function culturePageNav(
  slug: PageContentSlug,
  publicHref: string,
): CulturePageContentNavItem {
  return {
    slug,
    label: PAGE_CONTENT_TITLES[slug],
    description: PAGE_CONTENT_DESCRIPTIONS[slug],
    publicHref,
    adminHref: `/admin/page-content/${slug}`,
  };
}

/** Main /culture portal landing copy — not a catalog sub-page. */
export const CULTURE_PORTAL_PAGE_NAV = culturePageNav('cultural-portal-page', '/culture');

/** Full-page heritage landings with dedicated routes and grid cards in the catalog. */
export const CULTURE_LANDING_PAGE_NAV: CulturePageContentNavItem[] = [
  culturePageNav('khndzoresk', '/khndzoresk'),
  culturePageNav('khachaturian-museum', '/khachaturian-museum'),
  culturePageNav('national-gallery-armenia', '/national-gallery-armenia'),
];

export const CULTURE_PAGE_CONTENT_INDEX_SLUGS: readonly PageContentSlug[] = [
  CULTURE_PORTAL_PAGE_NAV.slug,
  ...CULTURE_LANDING_PAGE_NAV.map((item) => item.slug),
];

export const CULTURE_LANDING_PAGE_SLUGS = CULTURE_LANDING_PAGE_NAV.map((item) => item.slug);

/** Culture grid card slug → standalone landing route. */
export const CULTURE_LANDING_ITEM_HREFS: Record<string, string> = {
  'khndzoresk-cave-settlement': '/khndzoresk',
  'aram-khachaturian-museum': '/khachaturian-museum',
  'national-gallery-of-armenia': '/national-gallery-armenia',
};

export function pageContentAdminHref(slug: PageContentSlug): string {
  return `/admin/page-content/${slug}`;
}
