import { Suspense } from 'react';

import '@/components/cultural-portal-page/cultural-portal-page.css';

import { CulturalPortalAbout } from '@/components/cultural-portal-page/CulturalPortalAbout';

import { CulturalPortalCategories } from '@/components/cultural-portal-page/CulturalPortalCategories';

import { CulturalPortalDonors } from '@/components/cultural-portal-page/CulturalPortalDonors';

import { CulturalPortalHero } from '@/components/cultural-portal-page/CulturalPortalHero';

import { CulturalPortalHighlights } from '@/components/cultural-portal-page/CulturalPortalHighlights';

import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';

import { CulturalPortalNewsletter } from '@/components/cultural-portal-page/CulturalPortalNewsletter';

import { CulturalPortalPartnership } from '@/components/cultural-portal-page/CulturalPortalPartnership';

import { CulturalPortalProjects } from '@/components/cultural-portal-page/CulturalPortalProjects';

import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';

import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';

import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';

import { isSectionEnabled } from '@/lib/landing/landing-section-utils';

import { HomeSectionGridFallback } from '@/components/sections/HomeSectionGridFallback';

import { buildCulturePortalCategories } from '@/lib/mappers/culture-portal-categories';

import { mapProjectsToCulturalPortalProjects } from '@/lib/mappers/cultural-portal-projects';

import { mapItemsToHeritageMapNodes } from '@/lib/mappers/heritage-map-preview';

import { groupDonatorsForHomeSection } from '@/lib/mappers/donations-patrons';

import { getMapItems } from '@/lib/queries/culture-items';

import { getHomeContent } from '@/lib/queries/home';

import { getMenuTree } from '@/lib/queries/menu';

import { getPublishedProjects } from '@/lib/queries/projects';

import { getPublicDonators } from '@/lib/queries/donators';

import { getAboutContent } from '@/lib/queries/about';

import { getCulturalPortalPageContent } from '@/lib/queries/page-content';

import { resolvePageHeroImageUrl } from '@/lib/page-content-images';



async function CulturalPortalPrimarySections() {

  const [pageContent, home, menuTree] = await Promise.all([

    getCulturalPortalPageContent(),

    getHomeContent(),

    getMenuTree(),

  ]);

  const visibility = pageContent.sectionVisibility;

  const categories = buildCulturePortalCategories(menuTree);



  return (

    <>

      {isSectionEnabled(visibility, 'hero') ? (

        <CulturalPortalHero

          eyebrow={home.heroBadge}

          title={`${home.heroTitle} ${home.heroHighlight}`.trim()}

          accent={(home.heroSubtitle || 'CULTURAL HERITAGE PORTAL').replace('\n', ' ')}

          subtitle={home.heroDescription}

          heroImage={resolvePageHeroImageUrl(pageContent.heroImage)}

        />

      ) : null}

      {isSectionEnabled(visibility, 'stats') ? <CulturalPortalStatsBar stats={home.stats} /> : null}

      {isSectionEnabled(visibility, 'categories') && categories.length > 0 ? (

        <CulturalPortalCategories section={pageContent.CULTURAL_PORTAL_SECTION} categories={categories} />

      ) : null}

      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[48rem]" />}>

        <CulturalPortalDeferredSections pageContent={pageContent} />

      </Suspense>

    </>

  );

}



async function CulturalPortalDeferredSections({

  pageContent,

}: {

  pageContent: Awaited<ReturnType<typeof getCulturalPortalPageContent>>;

}) {

  const visibility = pageContent.sectionVisibility;

  const [mapItems, projects, donators, about] = await Promise.all([

    getMapItems(),

    getPublishedProjects(),

    getPublicDonators(),

    getAboutContent(),

  ]);



  const mapNodes = mapItemsToHeritageMapNodes(mapItems);

  const donorGroups = groupDonatorsForHomeSection(donators);

  const portalProjects = mapProjectsToCulturalPortalProjects(projects);

  const mapSection = pageContent.CULTURAL_PORTAL_MAP;

  const donorsSection = pageContent.CULTURAL_PORTAL_DONORS;

  const projectsSection = pageContent.CULTURAL_PORTAL_PROJECTS_SECTION;

  const aboutCards = pageContent.CULTURAL_PORTAL_ABOUT.cards;



  return (

    <LandingSectionStack>

      {isSectionEnabled(visibility, 'highlights') ? <CulturalPortalHighlights /> : null}

      {isSectionEnabled(visibility, 'map') && mapNodes.length > 0 ? (

        <CulturalPortalMap

          eyebrow={mapSection.eyebrow}

          title={mapSection.title}

          description={mapSection.description}

          ctaHref={mapSection.ctaHref}

          placeholderTitle={mapSection.placeholderTitle}

          placeholderSubtitle={`${mapItems.length} mapped locations`}

          pins={mapNodes.map((node, index) => ({

            top: `${node.y}%`,

            left: `${node.x}%`,

            tone: node.tone,

            delay: `${index * 0.15}s`,

          }))}

          legend={[...mapSection.legend]}

        />

      ) : null}

      {isSectionEnabled(visibility, 'projects') && portalProjects.length > 0 ? (

        <CulturalPortalProjects

          eyebrow={projectsSection.eyebrow}

          title={projectsSection.title}

          description={projectsSection.description}

          projects={portalProjects}

        />

      ) : null}

      {isSectionEnabled(visibility, 'partnership') ? (

        <CulturalPortalPartnership

          section={pageContent.HOME_PARTNERSHIP_SECTION}

          categories={pageContent.HOME_PARTNERSHIP_CATEGORIES}

        />

      ) : null}

      {isSectionEnabled(visibility, 'donors') && donorGroups.length > 0 ? (

        <CulturalPortalDonors

          eyebrow={donorsSection.eyebrow}

          title={donorsSection.title}

          description={donorsSection.description}

          groups={donorGroups}

          ctaHref={donorsSection.ctaHref}

          ctaLabel={donorsSection.ctaLabel}

        />

      ) : null}

      {isSectionEnabled(visibility, 'about') && aboutCards.length > 0 ? (

        <CulturalPortalAbout

          section={{

            eyebrow: about.teamEyebrow,

            title: about.teamTitle,

            description: about.teamIntro,

          }}

          cards={aboutCards}

        />

      ) : null}

      {isSectionEnabled(visibility, 'newsletter') ? (

        <CulturalPortalNewsletter

          title={pageContent.CULTURAL_PORTAL_NEWSLETTER.title}

          description={pageContent.CULTURAL_PORTAL_NEWSLETTER.description}

        />

      ) : null}

    </LandingSectionStack>

  );

}



export function CulturalPortalPage() {

  return (

    <HeritageLandingShell>

      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[32rem]" />}>

        <CulturalPortalPrimarySections />

      </Suspense>

    </HeritageLandingShell>

  );

}

