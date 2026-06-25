import { isFormRoute, resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { resolveMenuIconSlug } from '@/lib/navigation/menu-icons';
import type { MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';

export function buildCultureMegaMenu(tree: MenuNode[]): MegaMenuColumn[] {
  const columns: MegaMenuColumn[] = [];
  const leafTopLevel: MegaMenuColumn['items'] = [];

  for (const node of tree) {
    if (!node.isActive || isFormRoute(node.routeType)) continue;

    const children = (node.children ?? []).filter(
      (child) => child.isActive && !isFormRoute(child.routeType),
    );

    if (children.length > 0) {
      columns.push({
        heading: node.title,
        items: children.map((child) => ({
          label: child.title,
          href: resolveMenuHref(child, node),
          icon: resolveMenuIconSlug(child.slug, node.slug),
        })),
      });
      continue;
    }

    leafTopLevel.push({
      label: node.title,
      href: resolveMenuHref(node),
      icon: resolveMenuIconSlug(node.slug),
    });
  }

  if (leafTopLevel.length > 0) {
    columns.unshift({
      heading: 'Discover',
      items: leafTopLevel,
    });
  }

  return columns;
}
