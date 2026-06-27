import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureSubcategoryPageView } from '@/components/culture-catalog/CultureSubcategoryPageView';
import { findSubcategoryPageNodes } from '@/lib/culture-routes';
import { getItemsByMenuItem } from '@/lib/queries/culture-items';
import { getMenuTree } from '@/lib/queries/menu';
import { buildNotFoundMetadata, buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const tree = await getMenuTree();
  const found = findSubcategoryPageNodes(tree, params.categorySlug, params.subcategorySlug);
  if (!found) return buildNotFoundMetadata('Subcategory');
  return buildPublicPageMetadata({
    title: found.child.title,
    description:
      found.child.description ??
      `Curated ${found.parent.title.toLowerCase()} / ${found.child.title.toLowerCase()} entries.`,
    pathname: `/culture/${found.parent.slug}/${found.child.slug}`,
  });
}

async function CultureSubcategoryPage(props: PageProps) {
  const params = await props.params;
  const tree = await getMenuTree();
  const found = findSubcategoryPageNodes(tree, params.categorySlug, params.subcategorySlug);
  if (!found) notFound();
  const { parent, child } = found;
  const items = await getItemsByMenuItem(child.id);

  return <CultureSubcategoryPageView parent={parent} subcategory={child} items={items} />;
}

export default CultureSubcategoryPage;
