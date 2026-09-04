import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureCategoryPageView } from '@/components/culture-catalog/CultureCategoryPageView';
import { findCategoryPageNode } from '@/lib/culture-routes';
import { isFormRoute } from '@/lib/culture-menu';
import { parseCatalogSearchParams } from '@/lib/culture-catalog/catalog-search-params';
import { getItemsByMenuItem } from '@/lib/queries/culture-items';
import { getMenuTree } from '@/lib/queries/menu';
import { buildNotFoundMetadata, buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const [tree, locale] = await Promise.all([getMenuTree(), getCurrentSiteLocale()]);
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
      filters={parseCatalogSearchParams(searchParams)}
      locale={locale}
    />
  );
}

export default CultureCategoryPage;
