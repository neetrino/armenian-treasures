import type { Metadata } from 'next';
import { CultureFormPageView } from '@/components/culture-catalog/CultureFormPageView';
import { ProjectSubmissionForm } from '@/components/forms/ProjectSubmissionForm';
import { getMenuTree } from '@/lib/queries/menu';
import { buildSubmitCategoryOptions } from '@/lib/submit-category';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const revalidate = 60;

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Add your project',
  description:
    'Submit a culture project, material or proposal to Armenian Treasures. Every submission is reviewed by hand.',
  pathname: '/culture/submit',
});

async function SubmitProjectPage() {
  const [tree, locale] = await Promise.all([getMenuTree(), getCurrentSiteLocale()]);
  const categories = buildSubmitCategoryOptions(tree);

  return (
    <CultureFormPageView
      kind="submit"
      title={uiMessage(locale, 'contributeToArchive')}
      description={uiMessage(locale, 'submissionPageDescription')}
      breadcrumb={[{ label: uiMessage(locale, 'addYourProject') }]}
      form={<ProjectSubmissionForm categories={categories} locale={locale} />}
      aside={
        <>
          <p className="sec-label">{uiMessage(locale, 'whatWeAccept')}</p>
          <h2 className="sec-title">{uiMessage(locale, 'acceptedMaterials')}</h2>
          <p>{uiMessage(locale, 'submissionProposalHelp')}</p>
          <p>{uiMessage(locale, 'submissionReviewNotice')}</p>
        </>
      }
    />
  );
}

export default SubmitProjectPage;
