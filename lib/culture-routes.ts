import { isFormRoute, type MenuNode } from '@/lib/culture-menu';

const RETIRED_CULTURE_SLUGS = new Set(['armaments']);

export function isRetiredCultureSlug(slug: string): boolean {
  return RETIRED_CULTURE_SLUGS.has(slug);
}

export function omitRetiredCultureNodes(nodes: MenuNode[]): MenuNode[] {
  return nodes
    .filter((node) => !isRetiredCultureSlug(node.slug))
    .map((node) =>
      node.children ? { ...node, children: omitRetiredCultureNodes(node.children) } : node,
    );
}

export function findCategoryPageNode(
  tree: MenuNode[],
  categorySlug: string,
): MenuNode | null {
  if (isRetiredCultureSlug(categorySlug)) return null;
  const node = tree.find((n) => n.slug === categorySlug && n.isActive);
  if (!node || isFormRoute(node.routeType)) return null;
  return node;
}

export function findSubcategoryPageNodes(
  tree: MenuNode[],
  categorySlug: string,
  subcategorySlug: string,
): { parent: MenuNode; child: MenuNode } | null {
  const parent = tree.find((node) => node.slug === categorySlug && node.isActive);
  if (!parent) return null;
  const child = (parent.children ?? []).find(
    (node) =>
      node.slug === subcategorySlug &&
      node.isActive &&
      !isFormRoute(node.routeType) &&
      !isRetiredCultureSlug(node.slug),
  );
  if (!child) return null;
  return { parent, child };
}
