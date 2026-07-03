import '@/components/project-portal/project-portal.css';
import type { CulturalPortalProject } from '@/lib/constants/cultural-portal-page';
import { ProjectPortalGrid } from '@/components/project-portal/ProjectPortalGrid';

interface CulturalPortalProjectsProps {
  eyebrow: string;
  title: string;
  description: string;
  projects: CulturalPortalProject[];
}

export function CulturalPortalProjects({ eyebrow, title, description, projects }: CulturalPortalProjectsProps) {
  return (
    <section id="projects">
      <p className="sec-label">{eyebrow}</p>
      <h2 className="sec-title">{title}</h2>
      <p className="sec-desc">{description}</p>
      {projects.length === 0 ? (
        <p className="sec-desc">Projects will appear here once published in the admin panel.</p>
      ) : (
        <ProjectPortalGrid projects={projects} />
      )}
    </section>
  );
}
