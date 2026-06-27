import type { Metadata } from 'next';
import { CultureFormPageView } from '@/components/culture-catalog/CultureFormPageView';
import { ProjectSubmissionForm } from '@/components/forms/ProjectSubmissionForm';
import { getMenuTree } from '@/lib/queries/menu';
import { buildSubmitCategoryOptions } from '@/lib/submit-category';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Add your project',
  description:
    'Submit a culture project, material or proposal to Armenian Treasures. Every submission is reviewed by hand.',
  pathname: '/culture/submit',
});

async function SubmitProjectPage() {
  const tree = await getMenuTree();
  const categories = buildSubmitCategoryOptions(tree);

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
