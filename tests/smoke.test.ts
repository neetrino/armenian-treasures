import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { findCategoryPageNode, findSubcategoryPageNodes } from '@/lib/culture-routes';
import { isFormRoute, type MenuNode } from '@/lib/culture-menu';
import {
  PAGE_CONTENT_PUBLIC_PATHS,
  PUBLIC_API_ROUTES,
  PUBLIC_LAYOUT_PATHS,
} from '@/lib/cache/revalidation';

const APP_ROOT = join(process.cwd(), 'app', '(public)');

function publicRouteExists(route: string): boolean {
  const segments = route.replace(/^\//, '').split('/').filter(Boolean);
  const pagePath = join(APP_ROOT, ...segments, 'page.tsx');
  return existsSync(pagePath);
}

const SAMPLE_MENU: MenuNode[] = [
  {
    id: 'cat-1',
    slug: 'architecture',
    title: 'Architecture',
    description: null,
    order: 1,
    isActive: true,
    routeType: 'CATEGORY',
    customUrl: null,
    image: null,
    children: [
      {
        id: 'sub-1',
        slug: 'churches',
        title: 'Churches',
        description: null,
        order: 1,
        isActive: true,
        routeType: 'SUBCATEGORY',
        customUrl: null,
        image: null,
        children: [],
      },
      {
        id: 'form-1',
        slug: 'new',
        title: 'Add sub-catalog',
        description: null,
        order: 99,
        isActive: true,
        routeType: 'SUBCATEGORY_FORM',
        customUrl: null,
        image: null,
        children: [],
      },
    ],
  },
];

describe('public route smoke', () => {
  it('maps layout paths to existing public pages', () => {
    for (const path of PUBLIC_LAYOUT_PATHS) {
      expect(publicRouteExists(path), `missing page for ${path}`).toBe(true);
    }
  });

  it('maps page-content slugs to existing landing routes', () => {
    for (const paths of Object.values(PAGE_CONTENT_PUBLIC_PATHS)) {
      for (const path of paths) {
        expect(publicRouteExists(path), `missing landing page for ${path}`).toBe(true);
      }
    }
  });

  it('lists stable public API route paths', () => {
    expect(Object.values(PUBLIC_API_ROUTES).every((route) => route.startsWith('/api/'))).toBe(true);
  });
});

describe('culture routing smoke', () => {
  it('resolves category pages and skips form routes', () => {
    expect(findCategoryPageNode(SAMPLE_MENU, 'architecture')?.slug).toBe('architecture');
    expect(findCategoryPageNode(SAMPLE_MENU, 'missing')).toBeNull();
  });

  it('resolves subcategory pages and rejects form child routes', () => {
    const match = findSubcategoryPageNodes(SAMPLE_MENU, 'architecture', 'churches');
    expect(match?.child.slug).toBe('churches');
    expect(findSubcategoryPageNodes(SAMPLE_MENU, 'architecture', 'new')).toBeNull();
    expect(isFormRoute('SUBCATEGORY_FORM')).toBe(true);
  });
});
