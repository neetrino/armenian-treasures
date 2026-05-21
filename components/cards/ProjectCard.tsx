import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { clamp, formatCurrency } from '@/lib/utils';
import type { PublicProjectDTO } from '@/lib/dto';

interface ProjectCardProps {
  project: PublicProjectDTO;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const percent = project.goalAmount
    ? clamp(Math.round((project.raisedAmount / project.goalAmount) * 100), 0, 100)
    : 0;
  const isFunded = project.status === 'FUNDED' || percent >= 100;
  return (
    <Card as="article" className="p-0">
      <div className="relative overflow-hidden rounded-t-2xl bg-stone-100">
        <div className="aspect-[4/3] w-full">
          <Image
            src={project.image ?? '/images/placeholder.svg'}
            alt={project.title}
            width={800}
            height={600}
            className="h-full w-full object-cover transition duration-700 ease-cinematic group-hover:scale-[1.03]"
          />
        </div>
        <Badge
          tone={isFunded ? 'pomegranate' : 'bronze'}
          className="absolute left-3 top-3 backdrop-blur"
        >
          {isFunded ? 'Funded' : project.status.charAt(0) + project.status.slice(1).toLowerCase()}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] uppercase tracking-eyebrow text-bronze-700">
            {project.category}
            {project.region ? ` · ${project.region}` : ''}
          </p>
          <h3 className="font-display text-xl text-ink">{project.title}</h3>
        </div>
        {project.description ? (
          <p className="text-sm leading-relaxed text-ink-soft line-clamp-3">
            {project.description}
          </p>
        ) : null}
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>
              <span className="font-medium text-ink">{formatCurrency(project.raisedAmount)}</span>
              {' raised of '}
              {formatCurrency(project.goalAmount)}
            </span>
            <span className="font-medium text-bronze-700">{percent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
            <div
              className={isFunded ? 'h-full rounded-full bg-pomegranate' : 'h-full rounded-full bg-bronze-500'}
              style={{ width: `${percent}%` }}
              aria-hidden
            />
          </div>
          <div className="pt-3">
            <ButtonLink
              href="/partnership"
              variant={isFunded ? 'ghost' : 'secondary'}
              size="sm"
              withArrow={!isFunded}
            >
              {isFunded ? 'See impact' : 'Support this project'}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Card>
  );
}
