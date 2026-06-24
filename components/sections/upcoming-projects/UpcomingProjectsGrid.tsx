import { UPCOMING_PROJECTS } from '@/lib/constants/upcoming-projects';
import { UpcomingProjectCard } from '@/components/sections/upcoming-projects/UpcomingProjectCard';

export function UpcomingProjectsGrid() {
  return (
    <div className="upcoming-projects-grid">
      {UPCOMING_PROJECTS.map((project) => (
        <UpcomingProjectCard key={project.number} project={project} />
      ))}
    </div>
  );
}
