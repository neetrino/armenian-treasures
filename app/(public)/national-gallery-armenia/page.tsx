import type { Metadata } from 'next';
import { NationalGalleryPage } from '@/components/national-gallery-armenia/NationalGalleryPage';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'National Gallery of Armenia — Armenian Treasures',
  description:
    'National Gallery of Armenia Yerevan — virtual tour, collection, exhibitions, Aivazovsky Hall and the world\'s largest Armenian fine arts collection.',
  pathname: '/national-gallery-armenia',
});

function NationalGalleryRoutePage() {
  return <NationalGalleryPage />;
}

export default NationalGalleryRoutePage;
