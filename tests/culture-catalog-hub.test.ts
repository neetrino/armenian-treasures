import { describe, expect, it } from 'vitest';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { resolveMenuHeroImage } from '@/lib/culture-catalog/resolve-menu-hero-image';
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
  it('keeps the menu card image out of the banner field', () => {
    const content = resolveCultureCatalogContent(
      node({ image: '/images/culture/churches.webp' }),
      node({ id: 'parent', title: 'Architecture', slug: 'architecture' }),
    );
    expect(content.heroImage).toBeUndefined();
    expect(resolveMenuHeroImage('/images/culture/churches.webp', content.heroImage)).toBe(
      '/images/culture/churches.webp',
    );
  });

  it('keeps copy empty until it is saved in admin', () => {
    const content = resolveCultureCatalogContent(node({}));
    expect(content.eyebrow).toBe('');
    expect(content.accent).toBe('');
    expect(content.slogan).toBe('');
    expect(content.about.title).toBe('');
  });

  it('uses the admin hero banner when one is stored', () => {
    const content = resolveCultureCatalogContent(
      node({
        image: '/images/culture/card.webp',
        catalogContent: { heroImage: '/images/culture/hero.webp' },
      }),
    );
    expect(content.heroImage).toBe('/images/culture/hero.webp');
    expect(resolveMenuHeroImage('/images/culture/card.webp', content.heroImage)).toBe(
      '/images/culture/hero.webp',
    );
  });
});
