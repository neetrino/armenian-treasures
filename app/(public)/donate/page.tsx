import type { Metadata } from 'next';
import { DonationPage } from '@/components/donation-page/DonationPage';
import { DONATION_PAGE } from '@/lib/constants/donation-page';

export const metadata: Metadata = {
  title: DONATION_PAGE.metadata.title,
  description: DONATION_PAGE.metadata.description,
};

function DonateRoutePage() {
  return <DonationPage />;
}

export default DonateRoutePage;
