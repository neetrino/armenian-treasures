import type { Metadata } from 'next';
import { DonationPage } from '@/components/donation-page/DonationPage';
import { getDonationPageContent } from '@/lib/queries/page-content';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDonationPageContent();
  return buildPublicPageMetadata({
    title: content.metadata.title,
    description: content.metadata.description,
    pathname: '/donate',
  });
}

async function DonateRoutePage() {
  return <DonationPage />;
}

export default DonateRoutePage;
