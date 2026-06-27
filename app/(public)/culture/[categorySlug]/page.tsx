import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureCategoryPageView } from '@/components/culture-catalog/CultureCategoryPageView';
import { findCategoryPageNode } from '@/lib/culture-routes';
import { isFormRoute, type MenuNode } from '@/lib/culture-menu';
import { getItemsByMenuItem } from '@/lib/queries/culture-items';
import { getMenuTree } from '@/lib/queries/menu';
import { buildNotFoundMetadata, buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = findCategoryPageNode(tree, params.categorySlug);
  if (!node) return buildNotFoundMetadata('Category');
  return buildPublicPageMetadata({
    title: node.title,
    description: node.description ?? `Browse Armenian ${node.title.toLowerCase()} entries.`,
    pathname: `/culture/${node.slug}`,
  });
}

async function countChildItems(children: MenuNode[]): Promise<number> {
  const batches = await Promise.all(children.map((child) => getItemsByMenuItem(child.id)));
  return batches.reduce((sum, items) => sum + items.length, 0);
}

async function CultureCategoryPage(props: PageProps) {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = findCategoryPageNode(tree, params.categorySlug);
  if (!node) notFound();

  const subcategories = (node.children ?? []).filter(
    (child) => child.isActive && !isFormRoute(child.routeType),
  );
  const formChild = (node.children ?? []).find(
    (child) => child.isActive && child.routeType === 'SUBCATEGORY_FORM',
  );
  const items = await getItemsByMenuItem(node.id);
  const childItemCount =
    subcategories.length > 0 ? await countChildItems(subcategories) : 0;
  const totalChildItems = subcategories.length > 0 ? childItemCount + items.length : items.length;

  return (
    <CultureCategoryPageView
      category={node}
      subcategories={subcategories}
      formChild={formChild}
      items={items}
      totalChildItems={totalChildItems}
    />
  );
}

export default CultureCategoryPage;
