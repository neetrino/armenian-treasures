import { resolveMenuHref, type MenuNode } from '@/lib/culture-menu';

const NON_INDEXABLE_PREFIXES = ['/admin', '/api'];

/** Internal app paths suitable for sitemap.xml (same rules as live in-app navigation). */
export function isIndexableInternalPath(href: string): boolean {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  if (href === '#') return false;
  return !NON_INDEXABLE_PREFIXES.some((prefix) => href.startsWith(prefix));
}

/**
 * Collects unique internal culture menu paths using resolveMenuHref.
 * Excludes inactive nodes, external CUSTOM_URL targets, and non-indexable paths.
 */
export function collectMenuSitemapPaths(tree: MenuNode[]): string[] {
  const paths = new Set<string>();

  const walk = (node: MenuNode, parent?: MenuNode): void => {
    if (!node.isActive) return;

    const href = resolveMenuHref(node, parent);
    if (isIndexableInternalPath(href)) {
      paths.add(href);
    }

    for (const child of node.children ?? []) {
      walk(child, node);
    }
  };

  for (const root of tree) {
    walk(root);
  }

  return [...paths];
}
