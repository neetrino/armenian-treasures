import type { Metadata } from 'next';
import { KhachaturianMuseumPage } from '@/components/khachaturian-museum/KhachaturianMuseumPage';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Aram Khachaturian House-Museum — Armenian Treasures',
  description:
    'Aram Khachaturian House-Museum Yerevan — digital preservation, virtual tour, biography, works and the legacy of Armenia\'s greatest composer.',
  pathname: '/khachaturian-museum',
});

function KhachaturianMuseumRoutePage() {
  return <KhachaturianMuseumPage />;
}

export default KhachaturianMuseumRoutePage;
