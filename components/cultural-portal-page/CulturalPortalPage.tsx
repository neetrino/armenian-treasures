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
import { buildCulturePortalCategories } from '@/lib/mappers/culture-portal-categories';
import { mapCultureItemsToHighlights } from '@/lib/mappers/cultural-portal-highlights';
import { groupDonatorsForHomeSection } from '@/lib/mappers/donations-patrons';
import { getFeaturedCultureItems, getMapItems } from '@/lib/queries/culture-items';
import { getHomeContent } from '@/lib/queries/home';
import { getMenuTree } from '@/lib/queries/menu';
import { getPublishedProjects } from '@/lib/queries/projects';
import { getPublicDonators } from '@/lib/queries/donators';
import { HOME_HERO_COPY } from '@/lib/constants/home-hero';
import { CULTURAL_PORTAL_SECTION } from '@/lib/constants/cultural-portal';
import { HOME_DONATIONS_SECTION } from '@/lib/constants/home-donations-section';
import { HOME_ABOUT_CARDS } from '@/lib/constants/home-about-section';
import { mapProjectsToCulturalPortalProjects } from '@/lib/mappers/cultural-portal-projects';
import { mapItemsToHeritageMapNodes } from '@/lib/mappers/heritage-map-preview';
import { HERITAGE_MAP_LEGEND, HERITAGE_MAP_SECTION } from '@/lib/constants/heritage-map-section';
import { getAboutContent } from '@/lib/queries/about';

export async function CulturalPortalPage() {
  const [home, menuTree, featuredItems, mapItems, projects, donators, about] = await Promise.all([
    getHomeContent(),
    getMenuTree(),
    getFeaturedCultureItems(4),
    getMapItems(),
    getPublishedProjects(),
    getPublicDonators(),
    getAboutContent(),
  ]);

  const categories = buildCulturePortalCategories(menuTree);
  const highlights = mapCultureItemsToHighlights(featuredItems);
  const mapNodes = mapItemsToHeritageMapNodes(mapItems);
  const donorGroups = groupDonatorsForHomeSection(donators);

  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      <CulturalPortalHero
        eyebrow={home.heroBadge}
        title={`${home.heroTitle} ${home.heroHighlight}`.trim()}
        accent={HOME_HERO_COPY.subtitle.replace('\n', ' ')}
        subtitle={home.heroDescription}
      />
      <CulturalPortalStatsBar stats={home.stats as { value: string; label: string }[]} />
      <CulturalPortalCategories
        section={CULTURAL_PORTAL_SECTION}
        categories={categories}
      />
      <KhndzoreskDivider />
      <CulturalPortalHighlights highlights={highlights} />
      <CulturalPortalMap
        eyebrow="Interactive Map"
        title={HERITAGE_MAP_SECTION.title}
        description={HERITAGE_MAP_SECTION.description}
        ctaHref={HERITAGE_MAP_SECTION.ctaUrl}
        placeholderTitle={HERITAGE_MAP_SECTION.placeholderTitle}
        placeholderSubtitle={
          mapItems.length > 0
            ? `${mapItems.length} mapped locations`
            : HERITAGE_MAP_SECTION.placeholderSubtitle
        }
        pins={mapNodes.map((node, index) => ({
          top: `${node.y}%`,
          left: `${node.x}%`,
          tone: node.tone,
          delay: `${index * 0.15}s`,
        }))}
        legend={HERITAGE_MAP_LEGEND}
      />
      <KhndzoreskDivider />
      <CulturalPortalProjects projects={mapProjectsToCulturalPortalProjects(projects)} />
      <CulturalPortalPartnership />
      <CulturalPortalDonors
        eyebrow={HOME_DONATIONS_SECTION.eyebrow}
        title={HOME_DONATIONS_SECTION.title}
        description={HOME_DONATIONS_SECTION.description}
        groups={donorGroups}
        ctaHref={HOME_DONATIONS_SECTION.ctaUrl}
        ctaLabel={HOME_DONATIONS_SECTION.ctaLabel}
      />
      <KhndzoreskDivider />
      <CulturalPortalAbout
        section={{
          eyebrow: about.teamEyebrow,
          title: about.teamTitle,
          description: about.teamIntro,
        }}
        cards={HOME_ABOUT_CARDS}
      />
      <CulturalPortalNewsletter />
    </div>
  );
}
