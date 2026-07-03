import '@/components/khachaturian-museum/khachaturian-museum.css';

import { KhachaturianMuseumBiography, KhachaturianMuseumStatsBar } from '@/components/khachaturian-museum/KhachaturianMuseumAbout';

import { KhachaturianMuseumAudio } from '@/components/khachaturian-museum/KhachaturianMuseumAudio';

import { KhachaturianMuseumRelated, KhachaturianMuseumVisit } from '@/components/khachaturian-museum/KhachaturianMuseumFooterSections';

import { KhachaturianMuseumGallery } from '@/components/khachaturian-museum/KhachaturianMuseumGallery';

import { KhachaturianMuseumHero } from '@/components/khachaturian-museum/KhachaturianMuseumHero';

import { KhachaturianMuseumHighlights } from '@/components/khachaturian-museum/KhachaturianMuseumHighlights';

import { KhachaturianMuseumVirtualTour, KhachaturianMuseumWorks } from '@/components/khachaturian-museum/KhachaturianMuseumMedia';

import { KhachaturianMuseumNewsletter } from '@/components/khachaturian-museum/KhachaturianMuseumNewsletter';

import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';

import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';

import { isSectionEnabled } from '@/lib/landing/landing-section-utils';

import { SvgDefs } from '@/components/khachaturian-museum/site-icons';

import { getKhachaturianPageContent } from '@/lib/queries/page-content';



export async function KhachaturianMuseumPage() {

  const content = await getKhachaturianPageContent();

  const visibility = content.sectionVisibility;



  return (

    <HeritageLandingShell svgDefs={<SvgDefs />}>

      {isSectionEnabled(visibility, 'hero') ? (

        <KhachaturianMuseumHero imgBase={content.imgBase} heroImage={content.heroImage} />

      ) : null}

      {isSectionEnabled(visibility, 'stats') ? <KhachaturianMuseumStatsBar stats={content.stats} /> : null}

      {isSectionEnabled(visibility, 'about') ? <KhachaturianMuseumBiography facts={content.facts} /> : null}

      <LandingSectionStack>

        {isSectionEnabled(visibility, 'works') ? <KhachaturianMuseumWorks works={content.works} /> : null}

        {isSectionEnabled(visibility, 'virtualTour') ? (

          <KhachaturianMuseumVirtualTour virtualTour={content.virtualTour} />

        ) : null}

        {isSectionEnabled(visibility, 'audio') ? <KhachaturianMuseumAudio audioTracks={content.audioTracks} /> : null}

        {isSectionEnabled(visibility, 'gallery') ? <KhachaturianMuseumGallery gallery={content.gallery} /> : null}

        {isSectionEnabled(visibility, 'highlights') ? (

          <KhachaturianMuseumHighlights highlights={content.highlights} />

        ) : null}

        {isSectionEnabled(visibility, 'visit') ? <KhachaturianMuseumVisit /> : null}

        {isSectionEnabled(visibility, 'related') ? <KhachaturianMuseumRelated related={content.related} /> : null}

        {isSectionEnabled(visibility, 'newsletter') ? <KhachaturianMuseumNewsletter /> : null}

      </LandingSectionStack>

    </HeritageLandingShell>

  );

}

