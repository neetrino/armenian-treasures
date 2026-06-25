import type { Metadata } from 'next';
import { CultureFormPageView } from '@/components/culture-catalog/CultureFormPageView';
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
    <CultureFormPageView
      kind="submit"
      title="Contribute to the archive."
      description="Researchers, photographers, families and institutions can submit projects, materials or proposals. We review every submission by hand."
      breadcrumb={[{ label: 'Add your project' }]}
      form={<ProjectSubmissionForm categories={categories} />}
      aside={
        <>
          <p className="sec-label">What we accept</p>
          <h2 className="sec-title">Field reports, photography, manuscripts, oral history.</h2>
          <p>
            We accept proposals from individuals and institutions. Tell us what you have, where
            it&apos;s located, and how we can verify the material with you.
          </p>
          <p>
            Submissions are queued for curatorial review. We will not auto-publish your material
            and will only contact you if we need to follow up.
          </p>
        </>
      }
    />
  );
}

export default SubmitProjectPage;
