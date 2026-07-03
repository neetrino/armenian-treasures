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
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects">
      <p className="sec-label">{eyebrow}</p>
      <h2 className="sec-title">{title}</h2>
      <p className="sec-desc">{description}</p>
      <ProjectPortalGrid projects={projects} />
    </section>
  );
}
