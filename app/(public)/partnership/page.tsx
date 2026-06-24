import type { Metadata } from 'next';
import { PartnershipPage } from '@/components/partnership-page/PartnershipPage';

export const metadata: Metadata = {
  title: 'Partnerships — Armenian Treasures',
  description:
    'Global institutional alliances safeguarding Armenian civilisation. Partner with Armenian Treasures — governments, museums, foundations and innovators.',
};

function PartnershipRoutePage() {
  return <PartnershipPage />;
}

export default PartnershipRoutePage;
