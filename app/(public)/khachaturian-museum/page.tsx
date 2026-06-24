import type { Metadata } from 'next';
import { KhachaturianMuseumPage } from '@/components/khachaturian-museum/KhachaturianMuseumPage';

export const metadata: Metadata = {
  title: 'Aram Khachaturian House-Museum — Armenian Treasures',
  description:
    'Aram Khachaturian House-Museum Yerevan — digital preservation, virtual tour, biography, works and the legacy of Armenia\'s greatest composer.',
};

function KhachaturianMuseumRoutePage() {
  return <KhachaturianMuseumPage />;
}

export default KhachaturianMuseumRoutePage;
