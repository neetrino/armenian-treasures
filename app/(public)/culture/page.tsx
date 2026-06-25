import type { Metadata } from 'next';
import { CulturalPortalPage } from '@/components/cultural-portal-page/CulturalPortalPage';
import { CULTURAL_PORTAL_PAGE } from '@/lib/constants/cultural-portal-page';

export const revalidate = 60;

export const metadata: Metadata = {
  title: CULTURAL_PORTAL_PAGE.metadata.title,
  description: CULTURAL_PORTAL_PAGE.metadata.description,
};

function CultureRoutePage() {
  return <CulturalPortalPage />;
}

export default CultureRoutePage;
