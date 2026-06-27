import type { Metadata } from 'next';
import { KhndzoreskPage } from '@/components/khndzoresk/KhndzoreskPage';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPublicPageMetadata({
  title: 'Khndzoresk — Armenian Treasures Heritage Portal',
  description:
    'Khndzoresk digital preservation — cave settlements, sacred gorge, virtual tours, 3D aerial and visual restorations.',
  pathname: '/khndzoresk',
});

function KhndzoreskRoutePage() {
  return <KhndzoreskPage />;
}

export default KhndzoreskRoutePage;
