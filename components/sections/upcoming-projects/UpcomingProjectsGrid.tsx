import '@/components/project-portal/project-portal.css';
import { getPublishedProjects, HOME_UPCOMING_PROJECTS_LIMIT } from '@/lib/queries/projects';
import { mapProjectsToCulturalPortalProjects } from '@/lib/mappers/cultural-portal-projects';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { ProjectPortalCard } from '@/components/project-portal/ProjectPortalCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

export async function UpcomingProjectsGrid() {
  const [projects, locale] = await Promise.all([
    getPublishedProjects(HOME_UPCOMING_PROJECTS_LIMIT),
    getCurrentSiteLocale(),
  ]);
  const portalProjects = mapProjectsToCulturalPortalProjects(projects);

  if (portalProjects.length === 0) {
    return (
      <EmptyState
        title={uiMessage(locale, 'noProjectsPublished')}
        description={uiMessage(locale, 'noProjectsPublishedDescription')}
      />
    );
  }

  return (
    <Stagger className="project-portal project-portal--embedded">
      <div className="proj-grid">
        {portalProjects.map((project, index) => (
          <StaggerItem key={project.id ?? `${index}:${project.title}`} className="h-full">
            <ProjectPortalCard project={project} className="h-full" />
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
