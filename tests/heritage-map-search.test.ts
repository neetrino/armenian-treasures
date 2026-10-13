import { describe, expect, it } from 'vitest';
import { filterMapItemsBySearch } from '@/lib/constants/heritage-map-filters';
import type { PublicCultureItemDTO } from '@/lib/dto';

function place(title: string): PublicCultureItemDTO {
  return {
    id: title,
    title,
    slug: title.toLowerCase(),
    locationName: title,
    region: null,
    periodLabel: null,
    yearLabel: null,
    shortDescription: null,
    description: null,
    mapType: 'MONASTERY',
  } as PublicCultureItemDTO;
}

describe('filterMapItemsBySearch', () => {
  const items = [place('ARUCHAVANK'), place('Առուճի Վանք'), place('Matenadaran')];

  it('matches a later Armenian word against a Latin monastery name', () => {
    expect(filterMapItemsBySearch(items, 'Վանք').map((item) => item.title)).toEqual([
      'ARUCHAVANK',
      'Առուճի Վանք',
    ]);
  });

  it('matches half of a word in either script', () => {
    expect(filterMapItemsBySearch(items, 'վան').map((item) => item.title)).toEqual([
      'ARUCHAVANK',
      'Առուճի Վանք',
    ]);
    expect(filterMapItemsBySearch(items, 'aruch').map((item) => item.title)).toEqual([
      'ARUCHAVANK',
      'Առուճի Վանք',
    ]);
  });
});
