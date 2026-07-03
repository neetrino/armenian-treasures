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

export const revalidate = 60;

export const metadata = buildPublicPageMetadata({
  title: 'Projects',
  description: 'Active and funded digitization projects of the Armenian Treasures Foundation.',
  pathname: '/projects',
});

async function ProjectsPage() {
  const [projects, pageContent] = await Promise.all([getPublishedProjects(), getProjectsPageContent()]);
  const mappedProjects = mapProjectsToCulturalPortalProjects(projects);
  const heroImage = resolvePageHeroImageUrl(pageContent.heroImage);

  return (
    <HeritageLandingShell>
      <LandingHero
        eyebrow="PROJECTS"
        title="ARMENIAN TREASURES"
        accent="ACTIVE MISSIONS"
        subtitle="Field digitization campaigns, restoration initiatives, and archive programs powered by the foundation."
        heroImage={heroImage}
        ctas={[
          { label: 'Explore Projects', href: '#projects', variant: 'gold' },
          { label: 'Support The Mission', href: '/partnership', variant: 'teal' },
        ]}
      />

      <KhndzoreskDivider />

      <CulturalPortalProjects
        eyebrow="PROJECT PORTAL"
        title="UPCOMING & ACTIVE INITIATIVES"
        description="Browse the current foundation roadmap with transparent status, category, and regional focus."
        projects={mappedProjects}
      />
    </HeritageLandingShell>
  );
}

export default ProjectsPage;
