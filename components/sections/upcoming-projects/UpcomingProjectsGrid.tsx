import { UPCOMING_PROJECTS } from '@/lib/constants/upcoming-projects';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { UpcomingProjectCard } from '@/components/sections/upcoming-projects/UpcomingProjectCard';

export function UpcomingProjectsGrid() {
  return (
    <Stagger className="upcoming-projects-grid">
      {UPCOMING_PROJECTS.map((project) => (
        <StaggerItem key={project.number} className="h-full">
          <UpcomingProjectCard project={project} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
