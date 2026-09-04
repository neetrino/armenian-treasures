import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureFormPageView } from '@/components/culture-catalog/CultureFormPageView';
import { SubcategoryProposalForm } from '@/components/forms/SubcategoryProposalForm';
import { findCategoryPageNode } from '@/lib/culture-routes';
import { getMenuTree } from '@/lib/queries/menu';
import { buildNotFoundMetadata, buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage, uiMessageFormat } from '@/lib/i18n/ui-messages';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = findCategoryPageNode(tree, params.categorySlug);
  const formChild = node?.children?.find(
    (child) => child.isActive && child.routeType === 'SUBCATEGORY_FORM',
  );
  if (!node || !formChild) return buildNotFoundMetadata('Sub-catalog form');
  return buildPublicPageMetadata({
    title: `Add a new ${node.title} sub-catalog`,
    description: `Propose a new ${node.title.toLowerCase()} sub-catalog to expand the open archive.`,
    pathname: `/culture/${node.slug}/new`,
  });
}

async function NewSubcategoryFormPage(props: PageProps) {
  const params = await props.params;
  const [tree, locale] = await Promise.all([getMenuTree(), getCurrentSiteLocale()]);
  const node = findCategoryPageNode(tree, params.categorySlug);
  const formChild = node?.children?.find(
    (child) => child.isActive && child.routeType === 'SUBCATEGORY_FORM',
  );
  if (!node || !formChild) notFound();

  return (
    <CultureFormPageView
      kind="new-subcatalog"
      category={node}
      title={uiMessage(locale, 'addNewSubcatalog')}
      description={uiMessageFormat(locale, 'proposeSubcatalogDescription', {
        category: node.title.toLowerCase(),
      })}
      breadcrumb={[
        { label: node.title, href: `/culture/${node.slug}` },
        { label: uiMessage(locale, 'newSubcatalog') },
      ]}
      form={<SubcategoryProposalForm parentCategorySlug={node.slug} locale={locale} />}
      aside={
        <>
          <p className="sec-label">{uiMessage(locale, 'howWeReview')}</p>
          <h2 className="sec-title">{uiMessage(locale, 'curatorReadsEveryProposal')}</h2>
          <p>{uiMessage(locale, 'proposalReviewDetails')}</p>
          <p>{uiMessage(locale, 'proposalApprovalDetails')}</p>
        </>
      }
    />
  );
}

export default NewSubcategoryFormPage;
