import type { CulturalPortalProject } from '@/lib/constants/cultural-portal-page';
import { ProjectPortalCard } from '@/components/project-portal/ProjectPortalCard';
import { cn } from '@/lib/utils';

interface ProjectPortalGridProps {
  projects: CulturalPortalProject[];
  className?: string;
  embedded?: boolean;
}

export function ProjectPortalGrid({ projects, className, embedded = false }: ProjectPortalGridProps) {
  return (
    <div className={cn('project-portal', embedded && 'project-portal--embedded', className)}>
      <div className="proj-grid">
        {projects.map((project) => (
          <ProjectPortalCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
