import type { Metadata } from 'next';
import { CulturalPortalPage } from '@/components/cultural-portal-page/CulturalPortalPage';
import { getCulturalPortalPageContent } from '@/lib/queries/page-content';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCulturalPortalPageContent();
  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

function CultureRoutePage() {
  return <CulturalPortalPage />;
}

export default CultureRoutePage;
