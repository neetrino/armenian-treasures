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
import { getKhndzoreskPageContent } from '@/lib/queries/page-content';

export async function KhndzoreskPage() {
  const content = await getKhndzoreskPageContent();

  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <SvgDefs />
      <KhndzoreskHero imgBase={content.imgBase} />
      <KhndzoreskStatsBar stats={content.stats} />
      <KhndzoreskAbout facts={content.facts} />
      <KhndzoreskDivider />
      <KhndzoreskSites sites={content.sites} />
      <KhndzoreskDivider />
      <KhndzoreskVirtualTour tours={content.tours} />
      <KhndzoreskDivider />
      <KhndzoreskAerial />
      <KhndzoreskDivider />
      <KhndzoreskPanorama />
      <KhndzoreskDivider />
      <KhndzoreskGallery gallery={content.gallery} />
      <KhndzoreskDivider />
      <KhndzoreskRestoration restorations={content.restorations} />
      <KhndzoreskDivider />
      <KhndzoreskMap />
      <KhndzoreskDivider />
      <KhndzoreskCredits imgBase={content.imgBase} />
      <KhndzoreskRelated related={content.related} />
      <KhndzoreskNewsletter />
    </div>
  );
}
