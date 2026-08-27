import { CULTURE_LANDING_ITEM_HREFS } from '@/lib/admin/culture-landing-pages';

export function resolveCultureItemHref(slug: string): string {
  return CULTURE_LANDING_ITEM_HREFS[slug] ?? `/culture/item/${slug}`;
}

/** Public article URL for admin preview — works for draft, published, and archived. */
export function resolveCultureItemPreviewHref(slug: string, status?: string): string {
  const trimmed = slug.trim();
  if (!trimmed) return '';
  if (status === 'PUBLISHED') {
    return resolveCultureItemHref(trimmed);
  }
  return `/culture/item/${trimmed}?preview=1`;
}
