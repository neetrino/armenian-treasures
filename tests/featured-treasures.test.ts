import { describe, expect, it } from 'vitest';
import {
  DISCOVER_MORE_HIGHLIGHTS_TREASURE,
  FEATURED_TREASURE_COUNT,
  HIGHLIGHT_TREASURE_COUNT,
  HIGHLIGHTS_PAGE_PATH,
} from '@/lib/constants/featured-treasures';
import {
  excerptFeaturedTreasureText,
  mapCultureItemsToFeaturedTreasures,
  mapCultureItemsToHighlightTreasures,
} from '@/lib/mappers/featured-treasures';
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

  it('keeps the discover-more shortcut on /highlights with 30 archive slots', () => {
    expect(HIGHLIGHT_TREASURE_COUNT).toBe(30);
    expect(DISCOVER_MORE_HIGHLIGHTS_TREASURE.href).toBe(HIGHLIGHTS_PAGE_PATH);
    expect(DISCOVER_MORE_HIGHLIGHTS_TREASURE.layout).toBe('more');
  });

  it('keeps highlight cards short and links to the item page', () => {
    const longItem = item(8);
    longItem.description = `${'Ա'.repeat(80)} ${'բ'.repeat(120)}`;
    longItem.shortDescription = longItem.description;
    const [treasure] = mapCultureItemsToHighlightTreasures([longItem]);
    expect(treasure?.layout).toBe('tile');
    expect(treasure?.href).toBe('/culture/item/story-8');
    expect(treasure?.description.length).toBeLessThan(longItem.description.length);
    expect(treasure?.description.endsWith('…')).toBe(true);
  });

  it('truncates leftover full-article text on featured cards', () => {
    const excerpt = excerptFeaturedTreasureText('A '.repeat(120));
    expect(excerpt.endsWith('…')).toBe(true);
    expect(excerpt.length).toBeLessThan(200);
  });
});
