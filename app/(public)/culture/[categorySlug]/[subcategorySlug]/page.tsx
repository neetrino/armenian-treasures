import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureSubcategoryPageView } from '@/components/culture-catalog/CultureSubcategoryPageView';
import { isFormRoute, type MenuNode } from '@/lib/culture-menu';
import { getItemsByMenuItem } from '@/lib/queries/culture-items';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}

function findChild(tree: MenuNode[], categorySlug: string, subSlug: string): {
  parent: MenuNode;
  child: MenuNode;
} | null {
  const parent = tree.find((node) => node.slug === categorySlug && node.isActive);
  if (!parent) return null;
  const child = (parent.children ?? []).find(
    (node) => node.slug === subSlug && node.isActive && !isFormRoute(node.routeType),
  );
  if (!child) return null;
  return { parent, child };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const tree = await getMenuTree();
  const found = findChild(tree, params.categorySlug, params.subcategorySlug);
  if (!found) return { title: 'Subcategory not found' };
  return {
    title: `${found.child.title} · ${found.parent.title}`,
    description:
      found.child.description ??
      `Curated ${found.parent.title.toLowerCase()} / ${found.child.title.toLowerCase()} entries.`,
  };
}

async function CultureSubcategoryPage(props: PageProps) {
  const params = await props.params;
  const tree = await getMenuTree();
  const found = findChild(tree, params.categorySlug, params.subcategorySlug);
  if (!found) notFound();
  const { parent, child } = found;
  const items = await getItemsByMenuItem(child.id);

  return <CultureSubcategoryPageView parent={parent} subcategory={child} items={items} />;
}

export default CultureSubcategoryPage;
