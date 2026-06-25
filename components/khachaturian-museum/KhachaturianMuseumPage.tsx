import '@/components/khndzoresk/khndzoresk.css';
import '@/components/khachaturian-museum/khachaturian-museum.css';
import { KhachaturianMuseumBiography, KhachaturianMuseumStatsBar } from '@/components/khachaturian-museum/KhachaturianMuseumAbout';
import { KhachaturianMuseumAudio } from '@/components/khachaturian-museum/KhachaturianMuseumAudio';
import { KhachaturianMuseumRelated, KhachaturianMuseumVisit } from '@/components/khachaturian-museum/KhachaturianMuseumFooterSections';
import { KhachaturianMuseumGallery } from '@/components/khachaturian-museum/KhachaturianMuseumGallery';
import { KhachaturianMuseumHero } from '@/components/khachaturian-museum/KhachaturianMuseumHero';
import { KhachaturianMuseumHighlights } from '@/components/khachaturian-museum/KhachaturianMuseumHighlights';
import { KhachaturianMuseumVirtualTour, KhachaturianMuseumWorks } from '@/components/khachaturian-museum/KhachaturianMuseumMedia';
import { KhachaturianMuseumNewsletter } from '@/components/khachaturian-museum/KhachaturianMuseumNewsletter';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { SvgDefs } from '@/components/khachaturian-museum/site-icons';
import { getKhachaturianPageContent } from '@/lib/queries/page-content';

export async function KhachaturianMuseumPage() {
  const content = await getKhachaturianPageContent();

  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <SvgDefs />
      <KhachaturianMuseumHero imgBase={content.imgBase} />
      <KhachaturianMuseumStatsBar stats={content.stats} />
      <KhachaturianMuseumBiography facts={content.facts} />
      <KhndzoreskDivider />
      <KhachaturianMuseumWorks works={content.works} />
      <KhndzoreskDivider />
      <KhachaturianMuseumVirtualTour />
      <KhndzoreskDivider />
      <KhachaturianMuseumAudio audioTracks={content.audioTracks} />
      <KhndzoreskDivider />
      <KhachaturianMuseumGallery gallery={content.gallery} />
      <KhndzoreskDivider />
      <KhachaturianMuseumHighlights highlights={content.highlights} />
      <KhndzoreskDivider />
      <KhachaturianMuseumVisit />
      <KhndzoreskDivider />
      <KhachaturianMuseumRelated related={content.related} />
      <KhachaturianMuseumNewsletter />
    </div>
  );
}
