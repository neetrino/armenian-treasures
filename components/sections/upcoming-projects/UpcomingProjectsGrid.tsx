import { getPublishedProjects } from '@/lib/queries/projects';
import { mapProjectsToUpcomingProjects } from '@/lib/mappers/upcoming-projects';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { UpcomingProjectCard } from '@/components/sections/upcoming-projects/UpcomingProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';

export async function UpcomingProjectsGrid() {
  const projects = await getPublishedProjects();
  const upcoming = mapProjectsToUpcomingProjects(projects.slice(0, 3));

  if (upcoming.length === 0) {
    return (
      <EmptyState
        title="No projects published yet"
        description="Projects will appear here once curators publish them in the admin panel."
      />
    );
  }

  return (
    <Stagger className="upcoming-projects-grid">
      {upcoming.map((project) => (
        <StaggerItem key={project.number} className="h-full">
          <UpcomingProjectCard project={project} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
