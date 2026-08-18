import { describe, expect, it } from 'vitest';
import { FEATURED_TREASURE_COUNT } from '@/lib/constants/featured-treasures';
import { mapCultureItemsToFeaturedTreasures } from '@/lib/mappers/featured-treasures';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';

function item(index: number): PublicCultureItemDetailDTO {
  return {
    id: String(index),
    title: `Story ${index}`,
    slug: `story-${index}`,
    description: null,
    shortDescription: `Short ${index}`,
    menuItemId: 'menu',
    region: 'Syunik',
    locationName: null,
    periodLabel: '9th c.',
    yearLabel: null,
    century: 9,
    image: null,
    cardBackgroundColor: null,
    cardBackgroundImage: null,
    galleryImages: [],
    tourUrl: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    mapType: 'MONASTERY',
    showOnMap: false,
    itemType: 'MONUMENT',
    order: index,
    menuItem: {
      id: 'menu',
      title: 'Churches',
      slug: 'churches',
      parent: { id: 'parent', title: 'Architecture', slug: 'architecture' },
    },
  };
}

describe('featured treasures mapping', () => {
  it('keeps five homepage slots including bottom-right', () => {
    expect(FEATURED_TREASURE_COUNT).toBe(5);
    const treasures = mapCultureItemsToFeaturedTreasures([
      item(1),
      item(2),
      item(3),
      item(4),
      item(5),
    ]);
    expect(treasures.map((entry) => entry.layout)).toEqual([
      'tall',
      'top-mid',
      'top-right',
      'bottom-mid',
      'bottom-right',
    ]);
  });
});
