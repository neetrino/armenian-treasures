import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureFormPageView } from '@/components/culture-catalog/CultureFormPageView';
import { SubcategoryProposalForm } from '@/components/forms/SubcategoryProposalForm';
import { isFormRoute } from '@/lib/culture-menu';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = tree.find((n) => n.slug === params.categorySlug);
  if (!node) return { title: 'Add a new sub-catalog' };
  return {
    title: `Add a new ${node.title} sub-catalog`,
    description: `Propose a new ${node.title.toLowerCase()} sub-catalog to expand the open archive.`,
  };
}

async function NewSubcategoryFormPage(props: PageProps) {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = tree.find((n) => n.slug === params.categorySlug && n.isActive);
  if (!node || isFormRoute(node.routeType)) notFound();

  return (
    <CultureFormPageView
      kind="new-subcatalog"
      category={node}
      title="Add a new sub-catalog"
      description={`Propose a new ${node.title.toLowerCase()} sub-catalog to expand the open archive. Every proposal is reviewed by our curators before it goes live.`}
      breadcrumb={[
        { label: node.title, href: `/culture/${node.slug}` },
        { label: 'New sub-catalog' },
      ]}
      form={<SubcategoryProposalForm parentCategorySlug={node.slug} />}
      aside={
        <>
          <p className="sec-label">How we review</p>
          <h2 className="sec-title">A curator reads every proposal.</h2>
          <p>
            Submissions are queued for review by our cultural curators. We may follow up by email
            to ask for sources, photos or references before publishing.
          </p>
          <p>
            Approval here is for tracking only — your proposal will be added to the menu manually
            once a curator approves the scope.
          </p>
        </>
      }
    />
  );
}

export default NewSubcategoryFormPage;
