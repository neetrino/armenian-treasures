import type { Metadata } from 'next';
import { PartnershipPage } from '@/components/partnership-page/PartnershipPage';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Partnerships — Armenian Treasures',
  description:
    'Global institutional alliances safeguarding Armenian civilisation. Partner with Armenian Treasures — governments, museums, foundations and innovators.',
  pathname: '/partnership',
});

function PartnershipRoutePage() {
  return <PartnershipPage />;
}

export default PartnershipRoutePage;
