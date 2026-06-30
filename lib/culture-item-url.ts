import { CULTURE_LANDING_ITEM_HREFS } from '@/lib/admin/culture-landing-pages';

export function resolveCultureItemHref(slug: string): string {
  return CULTURE_LANDING_ITEM_HREFS[slug] ?? `/culture/item/${slug}`;
}
