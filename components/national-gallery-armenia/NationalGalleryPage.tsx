import '@/components/khachaturian-museum/khachaturian-museum.css';

import '@/components/national-gallery-armenia/national-gallery-armenia.css';

import { NationalGalleryAbout, NationalGalleryStatsBar } from '@/components/national-gallery-armenia/NationalGalleryAbout';

import { NationalGalleryArtists } from '@/components/national-gallery-armenia/NationalGalleryArtists';

import { NationalGalleryExhibitions } from '@/components/national-gallery-armenia/NationalGalleryExhibitions';

import { NationalGalleryRelated, NationalGalleryVisit } from '@/components/national-gallery-armenia/NationalGalleryFooterSections';

import { NationalGalleryGallery } from '@/components/national-gallery-armenia/NationalGalleryGallery';

import { NationalGalleryHero } from '@/components/national-gallery-armenia/NationalGalleryHero';

import { NationalGalleryCollection, NationalGalleryVirtualTour } from '@/components/national-gallery-armenia/NationalGalleryMedia';

import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';

import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';

import { isSectionEnabled } from '@/lib/landing/landing-section-utils';

import { SvgDefs } from '@/components/national-gallery-armenia/site-icons';

import { getNationalGalleryPageContent } from '@/lib/queries/page-content';



export async function NationalGalleryPage() {

  const content = await getNationalGalleryPageContent();

  const visibility = content.sectionVisibility;



  return (

    <HeritageLandingShell svgDefs={<SvgDefs />}>

      {isSectionEnabled(visibility, 'hero') ? (

        <NationalGalleryHero imgBase={content.imgBase} heroImage={content.heroImage} />

      ) : null}

      {isSectionEnabled(visibility, 'stats') ? <NationalGalleryStatsBar stats={content.stats} /> : null}

      {isSectionEnabled(visibility, 'about') ? <NationalGalleryAbout facts={content.facts} /> : null}

      <LandingSectionStack>

        {isSectionEnabled(visibility, 'collections') ? (

          <NationalGalleryCollection collections={content.collections} />

        ) : null}

        {isSectionEnabled(visibility, 'artists') ? <NationalGalleryArtists artists={content.artists} /> : null}

        {isSectionEnabled(visibility, 'virtualTour') ? (

          <NationalGalleryVirtualTour virtualTour={content.virtualTour} />

        ) : null}

        {isSectionEnabled(visibility, 'exhibitions') ? (

          <NationalGalleryExhibitions exhibitions={content.exhibitions} />

        ) : null}

        {isSectionEnabled(visibility, 'gallery') ? <NationalGalleryGallery gallery={content.gallery} /> : null}

        {isSectionEnabled(visibility, 'visit') ? <NationalGalleryVisit tickets={content.tickets} /> : null}

        {isSectionEnabled(visibility, 'related') ? <NationalGalleryRelated related={content.related} /> : null}


      </LandingSectionStack>

    </HeritageLandingShell>

  );

}

