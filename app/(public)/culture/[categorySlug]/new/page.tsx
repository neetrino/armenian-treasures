import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { SubcategoryProposalForm } from '@/components/forms/SubcategoryProposalForm';
import { getMenuTree } from '@/lib/queries/menu';
import { isFormRoute } from '@/lib/culture-menu';

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
    <>
      <HeroPage
        eyebrow={node.title.toUpperCase()}
        title="Add a new sub-catalog"
        description={`Propose a new ${node.title.toLowerCase()} sub-catalog to expand the open archive. Every proposal is reviewed by our curators before it goes live.`}
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-[2fr_1fr] lg:py-24">
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card lg:p-10">
          <SubcategoryProposalForm parentCategorySlug={node.slug} />
        </div>
        <aside className="rounded-2xl border border-dashed border-stone-200 bg-parchment-50 p-6 text-sm text-ink-soft lg:p-8">
          <p className="eyebrow">How we review</p>
          <h2 className="mt-3 font-display text-2xl text-ink">A curator reads every proposal.</h2>
          <p className="mt-4 leading-relaxed">
            Submissions are queued for review by our cultural curators. We may follow up by email
            to ask for sources, photos or references before publishing.
          </p>
          <p className="mt-4 leading-relaxed">
            Approval here is for tracking only — your proposal will be added to the menu manually
            once a curator approves the scope.
          </p>
        </aside>
      </Container>
    </>
  );
}

export default NewSubcategoryFormPage;
