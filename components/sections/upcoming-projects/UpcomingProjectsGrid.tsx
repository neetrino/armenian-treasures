import '@/components/project-portal/project-portal.css';
import { getPublishedProjects, HOME_UPCOMING_PROJECTS_LIMIT } from '@/lib/queries/projects';
import { mapProjectsToCulturalPortalProjects } from '@/lib/mappers/cultural-portal-projects';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { ProjectPortalCard } from '@/components/project-portal/ProjectPortalCard';
import { EmptyState } from '@/components/ui/EmptyState';

export async function UpcomingProjectsGrid() {
  const projects = await getPublishedProjects(HOME_UPCOMING_PROJECTS_LIMIT);
  const portalProjects = mapProjectsToCulturalPortalProjects(projects);

  if (portalProjects.length === 0) {
    return (
      <EmptyState
        title="No projects published yet"
        description="Projects will appear here once curators publish them in the admin panel."
      />
    );
  }

  return (
    <Stagger className="project-portal project-portal--embedded">
      <div className="proj-grid">
        {portalProjects.map((project) => (
          <StaggerItem key={project.title} className="h-full">
            <ProjectPortalCard project={project} className="h-full" />
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
