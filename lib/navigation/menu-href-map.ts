import { isFormRoute, resolveMenuHref, type MenuNode } from '@/lib/culture-menu';

/** Maps menu path keys (e.g. `architecture/churches`, `museums`) to resolved hrefs. */
export function buildMenuHrefMap(tree: MenuNode[]): Map<string, string> {
  const map = new Map<string, string>();

  const walk = (node: MenuNode, parent?: MenuNode): void => {
    if (!node.isActive || isFormRoute(node.routeType)) return;

    const href = resolveMenuHref(node, parent);
    const path = parent ? `${parent.slug}/${node.slug}` : node.slug;
    map.set(path, href);
    map.set(node.slug, href);

    for (const child of node.children ?? []) {
      walk(child, node);
    }
  };

  for (const root of tree) {
    walk(root);
  }

  return map;
}

export function resolveMenuHrefFromMap(
  map: Map<string, string>,
  menuPath: string,
  fallback: string,
): string {
  return map.get(menuPath) ?? fallback;
}
