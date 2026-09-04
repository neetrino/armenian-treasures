import '@/components/cultural-portal-page/cultural-portal-page.css';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { CulturalPortalProjects } from '@/components/cultural-portal-page/CulturalPortalProjects';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { mapProjectsToCulturalPortalProjects } from '@/lib/mappers/cultural-portal-projects';
import { getPublishedProjects } from '@/lib/queries/projects';
import { getProjectsPageContent } from '@/lib/queries/page-content';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export const revalidate = 60;

export const metadata = buildPublicPageMetadata({
  title: 'Projects',
  description: 'Active and funded digitization projects of the Armenian Treasures Foundation.',
  pathname: '/projects',
});

async function ProjectsPage() {
  const [projects, pageContent, locale] = await Promise.all([
    getPublishedProjects(),
    getProjectsPageContent(),
    getCurrentSiteLocale(),
  ]);
  const mappedProjects = mapProjectsToCulturalPortalProjects(projects);
  const heroImage = resolvePageHeroImageUrl(pageContent.heroImage);

  return (
    <HeritageLandingShell>
      <LandingHero
        locale={locale}
        eyebrow={uiMessage(locale, 'projectsEyebrow')}
        title={uiMessage(locale, 'projectsTitle')}
        accent={uiMessage(locale, 'projectsAccent')}
        subtitle={uiMessage(locale, 'projectsSubtitle')}
        heroImage={heroImage}
        ctas={[
          { label: uiMessage(locale, 'exploreProjects'), href: '#projects', variant: 'gold' },
          { label: uiMessage(locale, 'supportTheMission'), href: '/donate', variant: 'teal' },
        ]}
      />

      <KhndzoreskDivider />

      <CulturalPortalProjects
        eyebrow={uiMessage(locale, 'projectPortal')}
        title={uiMessage(locale, 'activeInitiatives')}
        description={uiMessage(locale, 'projectsPortalDescription')}
        projects={mappedProjects}
      />
    </HeritageLandingShell>
  );
}

export default ProjectsPage;
