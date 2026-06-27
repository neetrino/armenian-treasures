import { describe, expect, it } from 'vitest';
import { buildMenuTree, type MenuNode } from '@/lib/culture-menu';
import {
  buildSubmitCategoryOptions,
  resolveSubmitCategoryFromMenuItem,
} from '@/lib/submit-category';

function node(
  partial: Pick<MenuNode, 'id' | 'title' | 'slug'> &
    Partial<Omit<MenuNode, 'id' | 'title' | 'slug'>>,
): MenuNode {
  return {
    description: null,
    image: null,
    catalogContent: null,
    routeType: 'CATEGORY',
    customUrl: null,
    order: 0,
    isActive: true,
    parentId: null,
    ...partial,
  };
}

describe('buildSubmitCategoryOptions', () => {
  it('uses menu item IDs and qualifies duplicate child slugs', () => {
    const tree = buildMenuTree([
      node({ id: 'parent-a', title: 'Architecture', slug: 'architecture', parentId: null, order: 0 }),
      node({
        id: 'child-a',
        title: 'Churches A',
        slug: 'churches',
        parentId: 'parent-a',
        routeType: 'SUBCATEGORY',
        order: 0,
      }),
      node({ id: 'parent-b', title: 'Heritage', slug: 'heritage', parentId: null, order: 1 }),
      node({
        id: 'child-b',
        title: 'Churches B',
        slug: 'churches',
        parentId: 'parent-b',
        routeType: 'SUBCATEGORY',
        order: 0,
      }),
    ]);

    const options = buildSubmitCategoryOptions(tree);
    expect(options.map((o) => o.id)).toEqual(['parent-a', 'child-a', 'parent-b', 'child-b']);
    expect(options.find((o) => o.id === 'child-a')?.title).toBe('Architecture / Churches A');
    expect(options.find((o) => o.id === 'child-b')?.title).toBe('Heritage / Churches B');
  });
});

describe('resolveSubmitCategoryFromMenuItem', () => {
  it('returns parent context for subcategories', () => {
    const resolved = resolveSubmitCategoryFromMenuItem({
      id: 'child-a',
      title: 'Churches',
      slug: 'churches',
      parent: { title: 'Architecture', slug: 'architecture' },
    });
    expect(resolved.categoryLabel).toBe('Architecture / Churches');
    expect(resolved.parentCategorySlug).toBe('architecture');
    expect(resolved.parentCategoryTitle).toBe('Architecture');
  });

  it('uses the category itself for top-level menu items', () => {
    const resolved = resolveSubmitCategoryFromMenuItem({
      id: 'legends',
      title: 'Legends',
      slug: 'legends',
    });
    expect(resolved.categoryLabel).toBe('Legends');
    expect(resolved.parentCategorySlug).toBe('legends');
    expect(resolved.parentCategoryTitle).toBe('Legends');
  });
});
