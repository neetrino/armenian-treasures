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
    expect(architecture?.items.at(-1)).toMatchObject({
      href: '/culture/architecture/ornaments',
      menuPath: 'architecture/ornaments',
    });
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
    expect(labels).toEqual(['Churches & Monasteries', 'Castles']);
  });

  it('keeps AT Features item order when no extra children exist', () => {
    const art = resolveCultureMegaMenu([]).find((column) => column.heading === 'Art & Culture');
    const labels = art?.items.map((item) => item.label) ?? [];
    expect(labels.indexOf('Museums')).toBeGreaterThan(labels.indexOf('Carpets'));
    expect(labels.indexOf('Museums')).toBeLessThan(labels.indexOf('Sculptors'));
  });
});
