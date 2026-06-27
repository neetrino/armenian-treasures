import { Suspense } from 'react';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
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
import { HomeSectionGridFallback } from '@/components/sections/HomeSectionGridFallback';
import { buildCulturePortalCategories } from '@/lib/mappers/culture-portal-categories';
import { mapCultureItemsToHighlights } from '@/lib/mappers/cultural-portal-highlights';
import { mapProjectsToCulturalPortalProjects } from '@/lib/mappers/cultural-portal-projects';
import { mapItemsToHeritageMapNodes } from '@/lib/mappers/heritage-map-preview';
import { groupDonatorsForHomeSection } from '@/lib/mappers/donations-patrons';
import { getFeaturedCultureItems, getMapItems } from '@/lib/queries/culture-items';
import { getHomeContent } from '@/lib/queries/home';
import { getMenuTree } from '@/lib/queries/menu';
import { getPublishedProjects } from '@/lib/queries/projects';
import { getPublicDonators } from '@/lib/queries/donators';
import { getAboutContent } from '@/lib/queries/about';
import { getCulturalPortalPageContent } from '@/lib/queries/page-content';

async function CulturalPortalPrimarySections() {
  const [pageContent, home, menuTree] = await Promise.all([
    getCulturalPortalPageContent(),
    getHomeContent(),
    getMenuTree(),
  ]);
  const categories = buildCulturePortalCategories(menuTree);

  return (
    <>
      <CulturalPortalHero
        eyebrow={home.heroBadge}
        title={`${home.heroTitle} ${home.heroHighlight}`.trim()}
        accent={(home.heroSubtitle || 'CULTURAL HERITAGE PORTAL').replace('\n', ' ')}
        subtitle={home.heroDescription}
      />
      <CulturalPortalStatsBar stats={home.stats} />
      <CulturalPortalCategories
        section={pageContent.CULTURAL_PORTAL_SECTION}
        categories={categories}
      />
      <KhndzoreskDivider />
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
  const [featuredItems, mapItems, projects, donators, about] = await Promise.all([
    getFeaturedCultureItems(4),
    getMapItems(),
    getPublishedProjects(),
    getPublicDonators(),
    getAboutContent(),
  ]);

  const highlights = mapCultureItemsToHighlights(featuredItems);
  const mapNodes = mapItemsToHeritageMapNodes(mapItems);
  const donorGroups = groupDonatorsForHomeSection(donators);
  const mapSection = pageContent.CULTURAL_PORTAL_MAP;
  const donorsSection = pageContent.CULTURAL_PORTAL_DONORS;
  const projectsSection = pageContent.CULTURAL_PORTAL_PROJECTS_SECTION;

  return (
    <>
      <CulturalPortalHighlights highlights={highlights} />
      <CulturalPortalMap
        eyebrow={mapSection.eyebrow}
        title={mapSection.title}
        description={mapSection.description}
        ctaHref={mapSection.ctaHref}
        placeholderTitle={mapSection.placeholderTitle}
        placeholderSubtitle={
          mapItems.length > 0
            ? `${mapItems.length} mapped locations`
            : mapSection.placeholderSubtitle
        }
        pins={mapNodes.map((node, index) => ({
          top: `${node.y}%`,
          left: `${node.x}%`,
          tone: node.tone,
          delay: `${index * 0.15}s`,
        }))}
        legend={[...mapSection.legend]}
      />
      <KhndzoreskDivider />
      <CulturalPortalProjects
        eyebrow={projectsSection.eyebrow}
        title={projectsSection.title}
        description={projectsSection.description}
        projects={mapProjectsToCulturalPortalProjects(projects)}
      />
      <CulturalPortalPartnership
        section={pageContent.HOME_PARTNERSHIP_SECTION}
        categories={pageContent.HOME_PARTNERSHIP_CATEGORIES}
      />
      <CulturalPortalDonors
        eyebrow={donorsSection.eyebrow}
        title={donorsSection.title}
        description={donorsSection.description}
        groups={donorGroups}
        ctaHref={donorsSection.ctaHref}
        ctaLabel={donorsSection.ctaLabel}
      />
      <KhndzoreskDivider />
      <CulturalPortalAbout
        section={{
          eyebrow: about.teamEyebrow,
          title: about.teamTitle,
          description: about.teamIntro,
        }}
        cards={pageContent.CULTURAL_PORTAL_ABOUT.cards}
      />
      <CulturalPortalNewsletter
        title={pageContent.CULTURAL_PORTAL_NEWSLETTER.title}
        description={pageContent.CULTURAL_PORTAL_NEWSLETTER.description}
      />
    </>
  );
}

export function CulturalPortalPage() {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <Suspense fallback={<HomeSectionGridFallback minHeightClass="min-h-[32rem]" />}>
        <CulturalPortalPrimarySections />
      </Suspense>
    </div>
  );
}
