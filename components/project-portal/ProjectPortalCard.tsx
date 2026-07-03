import Link from 'next/link';
import type { CulturalPortalProject } from '@/lib/constants/cultural-portal-page';
import { ProjectFundingRange } from '@/components/project-portal/ProjectFundingRange';
import { ProjectPortalIcon } from '@/components/project-portal/ProjectPortalIcon';
import { cn } from '@/lib/utils';

interface ProjectPortalCardProps {
  project: CulturalPortalProject;
  className?: string;
}

export function ProjectPortalCard({ project, className }: ProjectPortalCardProps) {
  return (
    <Link href={project.href} className={cn('proj-card reveal', className)}>
      <div className={`proj-status status-${project.status}`}>{project.statusLabel}</div>
      <ProjectPortalIcon type={project.icon} />
      <div className="proj-title">{project.title}</div>
      <p className="proj-desc">{project.description}</p>
      {typeof project.goalUsd === 'number' && typeof project.raisedUsd === 'number' ? (
        <ProjectFundingRange raisedUsd={project.raisedUsd} goalUsd={project.goalUsd} />
      ) : null}
      <div className="proj-date">▸ {project.date}</div>
    </Link>
  );
}
