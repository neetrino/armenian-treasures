import { describe, expect, it } from 'vitest';
import { findCategoryPageNode } from '@/lib/culture-routes';
import { buildMenuTree, type MenuNode } from '@/lib/culture-menu';
import { collectMenuSitemapPaths, isIndexableInternalPath } from '@/lib/sitemap/menu-paths';
import { resolvePageTitle } from '@/lib/seo/metadata';

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

describe('isIndexableInternalPath', () => {
  it('accepts internal culture paths and rejects external or admin paths', () => {
    expect(isIndexableInternalPath('/culture/architecture')).toBe(true);
    expect(isIndexableInternalPath('https://example.com/x')).toBe(false);
    expect(isIndexableInternalPath('#')).toBe(false);
    expect(isIndexableInternalPath('/admin/settings')).toBe(false);
  });
});

describe('collectMenuSitemapPaths', () => {
  it('uses resolveMenuHref and excludes inactive, external, and form-only slugs', () => {
    const tree = buildMenuTree([
      node({ id: 'arch', title: 'Architecture', slug: 'architecture', order: 0 }),
      node({
        id: 'churches',
        title: 'Churches',
        slug: 'churches',
        parentId: 'arch',
        routeType: 'SUBCATEGORY',
        order: 0,
      }),
      node({
        id: 'form',
        title: 'Add sub-catalog',
        slug: 'add-subcatalog',
        parentId: 'arch',
        routeType: 'SUBCATEGORY_FORM',
        order: 1,
      }),
      node({
        id: 'inactive',
        title: 'Hidden',
        slug: 'hidden',
        isActive: false,
        order: 2,
      }),
      node({
        id: 'external',
        title: 'Museum partner',
        slug: 'museum-partner',
        routeType: 'CUSTOM_URL',
        customUrl: 'https://partner.example.org',
        order: 3,
      }),
      node({
        id: 'internal-custom',
        title: 'Gallery',
        slug: 'gallery',
        routeType: 'CUSTOM_URL',
        customUrl: '/national-gallery-armenia',
        order: 4,
      }),
    ]);

    const paths = collectMenuSitemapPaths(tree);
    expect(paths).toContain('/culture/architecture');
    expect(paths).toContain('/culture/architecture/churches');
    expect(paths).toContain('/culture/architecture/new');
    expect(paths).not.toContain('/culture/hidden');
    expect(paths).not.toContain('https://partner.example.org');
    expect(paths).toContain('/national-gallery-armenia');
  });
});

describe('resolvePageTitle', () => {
  it('uses absolute title when the site name is already present', () => {
    expect(resolvePageTitle('Khndzoresk — Armenian Treasures Heritage Portal')).toEqual({
      absolute: 'Khndzoresk — Armenian Treasures Heritage Portal',
    });
    expect(resolvePageTitle('Churches')).toBe('Churches');
  });
});

describe('findCategoryPageNode', () => {
  it('matches category page guards (active, non-form route)', () => {
    const tree = buildMenuTree([
      node({ id: 'cat', title: 'Legends', slug: 'legends', order: 0 }),
      node({
        id: 'form-root',
        title: 'Submit',
        slug: 'submit-node',
        routeType: 'PROJECT_SUBMIT_FORM',
        order: 1,
      }),
      node({ id: 'off', title: 'Hidden', slug: 'hidden', isActive: false, order: 2 }),
    ]);
    expect(findCategoryPageNode(tree, 'legends')?.title).toBe('Legends');
    expect(findCategoryPageNode(tree, 'submit-node')).toBeNull();
    expect(findCategoryPageNode(tree, 'hidden')).toBeNull();
    expect(findCategoryPageNode(tree, 'missing')).toBeNull();
  });
});
