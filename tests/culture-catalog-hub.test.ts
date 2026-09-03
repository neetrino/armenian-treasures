import { describe, expect, it } from 'vitest';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { resolveCultureCatalogHubDescription } from '@/lib/mappers/culture-catalog-page';
import type { MenuNode } from '@/lib/culture-menu';

function node(partial: Partial<MenuNode>): MenuNode {
  return {
    id: '1',
    title: 'Churches',
    slug: 'churches-test-hero',
    routeType: 'SUBCATEGORY',
    order: 0,
    isActive: true,
    ...partial,
  };
}

describe('culture catalog hub description', () => {
  it('prefers the admin category description', () => {
    expect(
      resolveCultureCatalogHubDescription(
        '  Legends curated for the archive.  ',
        'Fallback about copy',
        'Fallback items copy',
      ),
    ).toBe('Legends curated for the archive.');
  });

  it('falls back to about copy when the category field is empty', () => {
    expect(
      resolveCultureCatalogHubDescription('   ', 'Myths, gods, and heroic cycles.', 'Browse sections'),
    ).toBe('Myths, gods, and heroic cycles.');
  });

  it('uses the items section copy as the last fallback', () => {
    expect(resolveCultureCatalogHubDescription(null, '', 'Browse churches and castles.')).toBe(
      'Browse churches and castles.',
    );
  });
});

describe('culture catalog hero image', () => {
  it('uses the menu card image as the page hero fallback', () => {
    const content = resolveCultureCatalogContent(
      node({ image: '/images/culture/churches.webp' }),
      node({ id: 'parent', title: 'Architecture', slug: 'architecture' }),
    );
    expect(content.heroImage).toBe('/images/culture/churches.webp');
  });

  it('prefers catalogContent.heroImage over the card image', () => {
    const content = resolveCultureCatalogContent(
      node({
        image: '/images/culture/card.webp',
        catalogContent: { heroImage: '/images/culture/hero.webp' },
      }),
    );
    expect(content.heroImage).toBe('/images/culture/hero.webp');
  });
});
