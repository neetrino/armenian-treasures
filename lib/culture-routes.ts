import { isFormRoute, type MenuNode } from '@/lib/culture-menu';

export function findCategoryPageNode(
  tree: MenuNode[],
  categorySlug: string,
): MenuNode | null {
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
      node.slug === subcategorySlug && node.isActive && !isFormRoute(node.routeType),
  );
  if (!child) return null;
  return { parent, child };
}
