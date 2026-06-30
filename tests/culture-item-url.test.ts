import { describe, expect, it } from 'vitest';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import {
  CULTURE_PAGE_CONTENT_INDEX_SLUGS,
  CULTURE_LANDING_ITEM_HREFS,
} from '@/lib/admin/culture-landing-pages';
import {
  MARKETING_PAGE_CONTENT_INDEX_SLUGS,
  PAGE_CONTENT_SLUGS,
} from '@/lib/types/page-content';

describe('resolveCultureItemHref', () => {
  it('routes standard items to culture item detail', () => {
    expect(resolveCultureItemHref('tatev-monastery')).toBe('/culture/item/tatev-monastery');
  });

  it.each(Object.entries(CULTURE_LANDING_ITEM_HREFS))(
    'routes %s grid card to its landing page',
    (slug, href) => {
      expect(resolveCultureItemHref(slug)).toBe(href);
    },
  );
});

describe('page content admin index split', () => {
  it('keeps marketing and culture page slugs disjoint and complete', () => {
    const marketing = [...MARKETING_PAGE_CONTENT_INDEX_SLUGS];
    const culture = [...CULTURE_PAGE_CONTENT_INDEX_SLUGS];
    const combined = [...marketing, ...culture].sort();

    expect(marketing).toEqual(['donation-page', 'partnership-page']);
    expect(culture).toContain('cultural-portal-page');
    expect(culture).toContain('khndzoresk');
    expect(culture).toContain('khachaturian-museum');
    expect(culture).toContain('national-gallery-armenia');
    expect(combined).toEqual([...PAGE_CONTENT_SLUGS].sort());
    expect(new Set(combined).size).toBe(PAGE_CONTENT_SLUGS.length);
  });
});
