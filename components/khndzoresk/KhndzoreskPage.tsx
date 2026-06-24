import '@/components/khndzoresk/khndzoresk.css';
import { KhndzoreskAbout, KhndzoreskStatsBar } from '@/components/khndzoresk/KhndzoreskAbout';
import { KhndzoreskCredits, KhndzoreskMap, KhndzoreskRelated } from '@/components/khndzoresk/KhndzoreskFooterSections';
import { KhndzoreskGallery } from '@/components/khndzoresk/KhndzoreskGallery';
import { KhndzoreskHero } from '@/components/khndzoresk/KhndzoreskHero';
import { KhndzoreskAerial, KhndzoreskPanorama, KhndzoreskVirtualTour } from '@/components/khndzoresk/KhndzoreskMedia';
import { KhndzoreskNewsletter } from '@/components/khndzoresk/KhndzoreskNewsletter';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { KhndzoreskRestoration } from '@/components/khndzoresk/KhndzoreskRestoration';
import { KhndzoreskSites } from '@/components/khndzoresk/KhndzoreskSites';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { SvgDefs } from '@/components/khndzoresk/site-icons';

export function KhndzoreskPage() {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <SvgDefs />
      <KhndzoreskHero />
      <KhndzoreskStatsBar />
      <KhndzoreskAbout />
      <KhndzoreskDivider />
      <KhndzoreskSites />
      <KhndzoreskDivider />
      <KhndzoreskVirtualTour />
      <KhndzoreskDivider />
      <KhndzoreskAerial />
      <KhndzoreskDivider />
      <KhndzoreskPanorama />
      <KhndzoreskDivider />
      <KhndzoreskGallery />
      <KhndzoreskDivider />
      <KhndzoreskRestoration />
      <KhndzoreskDivider />
      <KhndzoreskMap />
      <KhndzoreskDivider />
      <KhndzoreskCredits />
      <KhndzoreskRelated />
      <KhndzoreskNewsletter />
    </div>
  );
}
