import { KhndzoreskAbout, KhndzoreskStatsBar } from '@/components/khndzoresk/KhndzoreskAbout';

import { KhndzoreskCredits, KhndzoreskMap, KhndzoreskRelated } from '@/components/khndzoresk/KhndzoreskFooterSections';

import { KhndzoreskGallery } from '@/components/khndzoresk/KhndzoreskGallery';

import { KhndzoreskHero } from '@/components/khndzoresk/KhndzoreskHero';

import { KhndzoreskAerial, KhndzoreskPanorama, KhndzoreskVirtualTour } from '@/components/khndzoresk/KhndzoreskMedia';

import { KhndzoreskRestoration } from '@/components/khndzoresk/KhndzoreskRestoration';

import { KhndzoreskSites } from '@/components/khndzoresk/KhndzoreskSites';

import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';

import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';

import { isSectionEnabled } from '@/lib/landing/landing-section-utils';

import { SvgDefs } from '@/components/khndzoresk/site-icons';

import { getKhndzoreskPageContent } from '@/lib/queries/page-content';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';



export async function KhndzoreskPage() {

  const [content, locale] = await Promise.all([
    getKhndzoreskPageContent(),
    getCurrentSiteLocale(),
  ]);

  const visibility = content.sectionVisibility;



  return (

    <HeritageLandingShell svgDefs={<SvgDefs />}>

      {isSectionEnabled(visibility, 'hero') ? (

        <KhndzoreskHero imgBase={content.imgBase} heroImage={content.heroImage} locale={locale} />

      ) : null}

      {isSectionEnabled(visibility, 'stats') ? <KhndzoreskStatsBar stats={content.stats} /> : null}

      {isSectionEnabled(visibility, 'about') ? <KhndzoreskAbout facts={content.facts} locale={locale} /> : null}

      <LandingSectionStack>

        {isSectionEnabled(visibility, 'sites') ? (
          <KhndzoreskSites sites={content.sites} locale={locale} />
        ) : null}

        {isSectionEnabled(visibility, 'virtualTour') ? (

          <KhndzoreskVirtualTour tours={content.tours} locale={locale} />

        ) : null}

        {isSectionEnabled(visibility, 'aerial') ? (
          <KhndzoreskAerial aerial={content.aerial} locale={locale} />
        ) : null}

        {isSectionEnabled(visibility, 'panorama') ? (
          <KhndzoreskPanorama panorama={content.panorama} locale={locale} />
        ) : null}

        {isSectionEnabled(visibility, 'gallery') ? <KhndzoreskGallery gallery={content.gallery} /> : null}

        {isSectionEnabled(visibility, 'restoration') ? (

          <KhndzoreskRestoration restorations={content.restorations} />

        ) : null}

        {isSectionEnabled(visibility, 'map') ? <KhndzoreskMap map={content.map} /> : null}

        {isSectionEnabled(visibility, 'credits') ? <KhndzoreskCredits imgBase={content.imgBase} /> : null}

        {isSectionEnabled(visibility, 'related') ? <KhndzoreskRelated related={content.related} /> : null}

      </LandingSectionStack>

    </HeritageLandingShell>

  );

}

