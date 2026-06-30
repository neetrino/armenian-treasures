import '@/components/khndzoresk/khndzoresk.css';
import '@/components/khachaturian-museum/khachaturian-museum.css';
import '@/components/national-gallery-armenia/national-gallery-armenia.css';
import { NationalGalleryAbout, NationalGalleryStatsBar } from '@/components/national-gallery-armenia/NationalGalleryAbout';
import { NationalGalleryArtists } from '@/components/national-gallery-armenia/NationalGalleryArtists';
import { NationalGalleryExhibitions } from '@/components/national-gallery-armenia/NationalGalleryExhibitions';
import { NationalGalleryRelated, NationalGalleryVisit } from '@/components/national-gallery-armenia/NationalGalleryFooterSections';
import { NationalGalleryGallery } from '@/components/national-gallery-armenia/NationalGalleryGallery';
import { NationalGalleryHero } from '@/components/national-gallery-armenia/NationalGalleryHero';
import { NationalGalleryCollection, NationalGalleryVirtualTour } from '@/components/national-gallery-armenia/NationalGalleryMedia';
import { NationalGalleryNewsletter } from '@/components/national-gallery-armenia/NationalGalleryNewsletter';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { SvgDefs } from '@/components/national-gallery-armenia/site-icons';
import { getNationalGalleryPageContent } from '@/lib/queries/page-content';

export async function NationalGalleryPage() {
  const content = await getNationalGalleryPageContent();

  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <SvgDefs />
      <NationalGalleryHero imgBase={content.imgBase} heroImage={content.heroImage} />
      <NationalGalleryStatsBar stats={content.stats} />
      <NationalGalleryAbout facts={content.facts} />
      <KhndzoreskDivider />
      <NationalGalleryCollection collections={content.collections} />
      <KhndzoreskDivider />
      <NationalGalleryArtists artists={content.artists} />
      <KhndzoreskDivider />
      <NationalGalleryVirtualTour />
      <KhndzoreskDivider />
      <NationalGalleryExhibitions exhibitions={content.exhibitions} />
      <KhndzoreskDivider />
      <NationalGalleryGallery gallery={content.gallery} />
      <KhndzoreskDivider />
      <NationalGalleryVisit tickets={content.tickets} />
      <KhndzoreskDivider />
      <NationalGalleryRelated related={content.related} />
      <NationalGalleryNewsletter />
    </div>
  );
}
