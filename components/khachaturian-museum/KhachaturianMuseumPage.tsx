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

export function KhachaturianMuseumPage() {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <SvgDefs />
      <KhachaturianMuseumHero />
      <KhachaturianMuseumStatsBar />
      <KhachaturianMuseumBiography />
      <KhndzoreskDivider />
      <KhachaturianMuseumWorks />
      <KhndzoreskDivider />
      <KhachaturianMuseumVirtualTour />
      <KhndzoreskDivider />
      <KhachaturianMuseumAudio />
      <KhndzoreskDivider />
      <KhachaturianMuseumGallery />
      <KhndzoreskDivider />
      <KhachaturianMuseumHighlights />
      <KhndzoreskDivider />
      <KhachaturianMuseumVisit />
      <KhndzoreskDivider />
      <KhachaturianMuseumRelated />
      <KhachaturianMuseumNewsletter />
    </div>
  );
}
