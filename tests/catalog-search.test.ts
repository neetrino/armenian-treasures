import { describe, expect, it } from 'vitest';
import { filterCatalogItems } from '@/lib/culture-catalog/filter-catalog-entries';
import {
  catalogSearchHref,
  hasCatalogSearchFilters,
  parseCatalogSearchParams,
} from '@/lib/culture-catalog/catalog-search-params';
import type { PublicCultureItemDTO } from '@/lib/dto';
import { emptyMediaContent } from '@/lib/culture-item-media';

function item(partial: Partial<PublicCultureItemDTO>): PublicCultureItemDTO {
  return {
    id: partial.id ?? '1',
    title: partial.title ?? 'Tatev Monastery',
    slug: partial.slug ?? 'tatev-monastery',
    description: null,
    shortDescription: null,
    menuItemId: 'menu',
    region: partial.region ?? 'Syunik',
    locationName: null,
    periodLabel: partial.periodLabel ?? '9th c.',
    yearLabel: null,
    century: partial.century ?? 9,
    image: null,
    coverImage: null,
    cardBackgroundColor: null,
    cardBackgroundImage: null,
    galleryImages: [],
    tourUrl: null,
    videoUrl: null,
    media: emptyMediaContent(),
    latitude: null,
    longitude: null,
    mapUrl: null,
    mapType: 'MONASTERY',
    showOnMap: false,
    itemType: partial.itemType ?? 'MONUMENT',
    order: 0,
  };
}

describe('catalog search params', () => {
  it('parses query params and ignores blanks', () => {
    const filters = parseCatalogSearchParams({
      q: ' tatev ',
      region: 'Syunik',
      period: '',
      type: 'MONUMENT',
    });
    expect(filters).toEqual({
      q: 'tatev',
      region: 'Syunik',
      period: '',
      type: 'MONUMENT',
    });
    expect(hasCatalogSearchFilters(filters)).toBe(true);
    expect(catalogSearchHref(filters)).toBe(
      '/search?q=tatev&region=Syunik&type=MONUMENT',
    );
    expect(catalogSearchHref(filters, '/culture/architecture/churches')).toBe(
      '/culture/architecture/churches?q=tatev&region=Syunik&type=MONUMENT',
    );
  });
});

describe('filterCatalogItems', () => {
  const items = [
    item({ id: '1', title: 'Tatev Monastery', region: 'Syunik', itemType: 'MONUMENT' }),
    item({
      id: '2',
      title: 'Komitas Museum',
      slug: 'komitas',
      region: 'Yerevan',
      periodLabel: 'Est. 1978',
      century: null,
      itemType: 'MUSEUM',
    }),
  ];

  it('filters by region, period, and type together', () => {
    const matches = filterCatalogItems(items, {
      q: '',
      region: 'Syunik',
      period: '9th c.',
      type: 'MONUMENT',
    });
    expect(matches.map((entry) => entry.id)).toEqual(['1']);
  });

  it('uses text search across title and region', () => {
    const matches = filterCatalogItems(items, {
      q: 'yerevan',
      region: '',
      period: '',
      type: '',
    });
    expect(matches.map((entry) => entry.id)).toEqual(['2']);
  });
});
