import type { Metadata } from 'next';
import { DonationPage } from '@/components/donation-page/DonationPage';
import { getDonationPageContent } from '@/lib/queries/page-content';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDonationPageContent();
  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

async function DonateRoutePage() {
  return <DonationPage />;
}

export default DonateRoutePage;
