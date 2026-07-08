import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureCategoryPageView } from '@/components/culture-catalog/CultureCategoryPageView';
import { findCategoryPageNode } from '@/lib/culture-routes';
import { isFormRoute } from '@/lib/culture-menu';
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

async function CultureCategoryPage(props: PageProps) {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = findCategoryPageNode(tree, params.categorySlug);
  if (!node) notFound();

  const subcategories = (node.children ?? []).filter(
    (child) => child.isActive && !isFormRoute(child.routeType),
  );
  const items = await getItemsByMenuItem(node.id);

  return (
    <CultureCategoryPageView
      category={node}
      subcategories={subcategories}
      items={items}
    />
  );
}

export default CultureCategoryPage;
