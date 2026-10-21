import { describe, expect, it } from 'vitest';
import type { MenuNode } from '@/lib/culture-menu';
import { resolveCultureMegaMenu } from '@/lib/navigation/resolve-header-nav';

function node(partial: Partial<MenuNode> & Pick<MenuNode, 'id' | 'slug' | 'title'>): MenuNode {
  return {
    description: null,
    image: null,
    routeType: 'SUBCATEGORY',
    customUrl: null,
    order: 0,
    isActive: true,
    children: [],
    ...partial,
  };
}

function architectureTree(children: MenuNode[]): MenuNode[] {
  return [
    node({
      id: 'architecture',
      slug: 'architecture',
      title: 'Architecture',
      routeType: 'CATEGORY',
      order: 1,
      children,
    }),
  ];
}

describe('resolveCultureMegaMenu', () => {
  it('appends Ornaments from the live Architecture tree after Castles', () => {
    const columns = resolveCultureMegaMenu(
      architectureTree([
        node({ id: 'churches', slug: 'churches', title: 'Churches & Monasteries', order: 1 }),
        node({ id: 'castles', slug: 'castles', title: 'Castles', order: 2 }),
        node({ id: 'ornaments', slug: 'ornaments', title: 'Ornaments', order: 3 }),
        node({
          id: 'new',
          slug: 'new',
          title: 'Add a new sub-catalog',
          order: 99,
          routeType: 'SUBCATEGORY_FORM',
        }),
      ]),
    );

    const architecture = columns.find((column) => column.heading === 'Architecture');
    expect(architecture?.items.map((item) => item.label)).toEqual([
      'Churches & Monasteries',
      'Castles',
      'Ornaments',
    ]);
    expect(architecture?.items.find((item) => item.menuPath === 'architecture/ornaments')).toMatchObject({
      href: '/culture/architecture/ornaments',
      label: 'Ornaments',
    });
  });

  it('translates the live Ornaments item in Armenian', () => {
    const columns = resolveCultureMegaMenu(
      architectureTree([
        node({ id: 'ornaments', slug: 'ornaments', title: 'Ornaments', order: 3 }),
      ]),
      'HY',
    );

    const ornaments = columns
      .find((column) => column.heading === 'Ճարտարապետություն')
      ?.items.find((item) => item.menuPath === 'architecture/ornaments');
    expect(ornaments?.label).toBe('Զարդանախշեր');
  });

  it('does not list Armaments in the menu', () => {
    const columns = resolveCultureMegaMenu(
      architectureTree([
        node({ id: 'armaments', slug: 'armaments', title: 'Armaments', order: 4 }),
      ]),
    );

    expect(columns.some((column) => column.items.some((item) => item.label === 'Armaments'))).toBe(
      false,
    );
  });

  it('does not duplicate sheet items or include form routes', () => {
    const columns = resolveCultureMegaMenu(
      architectureTree([
        node({ id: 'churches', slug: 'churches', title: 'Churches', order: 1 }),
        node({
          id: 'new',
          slug: 'new',
          title: 'Add a new sub-catalog',
          order: 99,
          routeType: 'SUBCATEGORY_FORM',
        }),
      ]),
    );

    const labels = columns.find((column) => column.heading === 'Architecture')?.items.map(
      (item) => item.label,
    );
    expect(labels).toEqual(['Churches & Monasteries', 'Castles', 'Ornaments']);
  });

  it('follows the linked sheet columns', () => {
    const columns = resolveCultureMegaMenu([
      node({
        id: 'legends',
        slug: 'legends',
        title: 'Legends',
        routeType: 'CATEGORY',
        children: [
          node({ id: 'epic', slug: 'epic', title: 'Epic', order: 3 }),
        ],
      }),
      node({
        id: 'heritage',
        slug: 'heritage',
        title: 'Art & Culture',
        routeType: 'CATEGORY',
        children: [
          node({ id: 'museums', slug: 'museums', title: 'Museums', order: 12 }),
        ],
      }),
    ]);

    expect(columns.map((column) => column.heading)).toEqual([
      'Architecture',
      'Myths & Gods',
      'Icons of History',
      'Art & Culture',
      'Historical Highlights',
    ]);
    expect(columns.find((column) => column.heading === 'Myths & Gods')?.items.map((item) => item.label)).toEqual([
      'Mythology',
      'Legendaries & Heroes',
      'Epic',
    ]);
    expect(columns.find((column) => column.heading === 'Icons of History')?.items[0]?.label).toBe(
      'Kings & Dynasties',
    );
    expect(columns.find((column) => column.heading === 'Art & Culture')?.items.map((item) => item.label)).toEqual([
      'Paintings',
      'Music',
      'Writers',
      'Taraz',
      'Carpets & Textile Arts',
      'Museums',
      'Sculptors',
      'Theatre',
      'Dance',
      'Food & Drink',
      'Publications',
    ]);
    const myths = columns.find((column) => column.heading === 'Myths & Gods');
    expect(myths?.items.find((item) => item.label === 'Epic')).toMatchObject({
      href: '/culture/legends/epic',
    });
    expect(columns.find((column) => column.heading === 'Architecture')?.items.some((item) => item.label === 'Museums')).toBe(
      false,
    );
  });
});
