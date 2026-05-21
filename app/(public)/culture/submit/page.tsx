import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { ProjectSubmissionForm } from '@/components/forms/ProjectSubmissionForm';
import { isFormRoute } from '@/lib/culture-menu';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Add your project',
  description:
    'Submit a culture project, material or proposal to Armenian Treasures. Every submission is reviewed by hand.',
};

async function SubmitProjectPage() {
  const tree = await getMenuTree();
  const categories: { slug: string; title: string }[] = [];
  for (const node of tree) {
    if (!node.isActive || isFormRoute(node.routeType)) continue;
    categories.push({ slug: node.slug, title: node.title });
    for (const child of node.children ?? []) {
      if (!child.isActive || isFormRoute(child.routeType)) continue;
      categories.push({ slug: child.slug, title: `${node.title} / ${child.title}` });
    }
  }

  return (
    <>
      <HeroPage
        eyebrow="Add your project"
        title="Contribute to the archive."
        description="Researchers, photographers, families and institutions can submit projects, materials or proposals. We review every submission by hand."
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-[2fr_1fr] lg:py-24">
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card lg:p-10">
          <ProjectSubmissionForm categories={categories} />
        </div>
        <aside className="rounded-2xl border border-dashed border-stone-200 bg-parchment-50 p-6 text-sm text-ink-soft lg:p-8">
          <p className="eyebrow">What we accept</p>
          <h2 className="mt-3 font-display text-2xl text-ink">
            Field reports, photography, manuscripts, oral history.
          </h2>
          <p className="mt-4 leading-relaxed">
            We accept proposals from individuals and institutions. Tell us what you have, where
            it&apos;s located, and how we can verify the material with you.
          </p>
          <p className="mt-4 leading-relaxed">
            Submissions are queued for curatorial review. We will not auto-publish your material
            and will only contact you if we need to follow up.
          </p>
        </aside>
      </Container>
    </>
  );
}

export default SubmitProjectPage;
