import type { Metadata } from 'next';
import { KhndzoreskPage } from '@/components/khndzoresk/KhndzoreskPage';

export const metadata: Metadata = {
  title: 'Khndzoresk — Armenian Treasures Heritage Portal',
  description:
    'Khndzoresk digital preservation — cave settlements, sacred gorge, virtual tours, 3D aerial and visual restorations.',
};

function KhndzoreskRoutePage() {
  return <KhndzoreskPage />;
}

export default KhndzoreskRoutePage;
