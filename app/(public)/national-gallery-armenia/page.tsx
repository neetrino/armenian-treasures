import type { Metadata } from 'next';
import { NationalGalleryPage } from '@/components/national-gallery-armenia/NationalGalleryPage';

export const metadata: Metadata = {
  title: 'National Gallery of Armenia — Armenian Treasures',
  description:
    'National Gallery of Armenia Yerevan — virtual tour, collection, exhibitions, Aivazovsky Hall and the world\'s largest Armenian fine arts collection.',
};

function NationalGalleryRoutePage() {
  return <NationalGalleryPage />;
}

export default NationalGalleryRoutePage;
