import Link from 'next/link';
import type { CulturalPortalProject } from '@/lib/constants/cultural-portal-page';
import { ProjectFundingRange } from '@/components/project-portal/ProjectFundingRange';
import { ProjectPortalIcon } from '@/components/project-portal/ProjectPortalIcon';
import { getCardBackgroundStyle, hasCardBackground } from '@/lib/card-background-style';
import { cn } from '@/lib/utils';

interface ProjectPortalCardProps {
  project: CulturalPortalProject;
  className?: string;
}

export function ProjectPortalCard({ project, className }: ProjectPortalCardProps) {
  const hasCustomBackground = hasCardBackground(null, project.cardBackgroundImage);

  return (
    <Link
      href={project.href}
      style={getCardBackgroundStyle(null, project.cardBackgroundImage, {
        colorVarName: '--project-card-bg-color',
        imageVarName: '--project-card-bg-image',
        fallbackColor: 'var(--pp-card)',
      })}
      className={cn('proj-card reveal', hasCustomBackground && 'proj-card--has-bg', className)}
    >
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
