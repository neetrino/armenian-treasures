import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { ButtonLink } from '@/components/ui/Button';
import { clamp, formatCurrency } from '@/lib/utils';
import type { PublicProjectDTO } from '@/lib/dto';
import { cn } from '@/lib/utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage, uiMessageFormat } from '@/lib/i18n/ui-messages';

interface ProjectCardProps {
  project: PublicProjectDTO;
  locale: SiteLocaleCode;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const percent = project.goalAmount
    ? clamp(Math.round((project.raisedAmount / project.goalAmount) * 100), 0, 100)
    : 0;
  const isFunded = project.status === 'FUNDED' || percent >= 100;
  const statusLabel = isFunded
    ? uiMessage(locale, 'funded')
    : project.status.charAt(0) + project.status.slice(1).toLowerCase();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-surface bg-[var(--surface-card-bg)] transition-[border-color,box-shadow,transform,background] duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--surface-card-hover-border)] hover:bg-[var(--surface-card-bg-hover)] hover:shadow-[var(--surface-card-hover-shadow)]">
      <div className="relative overflow-hidden border-b border-[rgba(214,184,90,0.14)] bg-[rgba(5,5,5,0.5)]">
        <div className="aspect-[4/3] w-full opacity-90 transition duration-500 group-hover:opacity-100">
          <Image
            src={project.image ? resolvePublicAssetUrl(project.image) : resolvePublicAssetUrl('/images/placeholder.svg')}
            alt={project.title}
            width={800}
            height={600}
            className="h-full w-full object-cover transition duration-700 ease-cinematic group-hover:scale-[1.04]"
          />
        </div>
        <span
          className={cn(
            'heritage-cta-clip absolute left-4 top-4 inline-flex h-[22px] items-center border px-3.5 font-cinzel text-[8px] font-extrabold uppercase tracking-[0.2em] sm:text-[9px]',
            isFunded
              ? 'border-[rgba(39,198,200,0.35)] bg-[rgba(39,198,200,0.08)] text-heritage-teal'
              : 'border-[rgba(214,184,90,0.3)] bg-[rgba(214,184,90,0.08)] text-heritage-gold',
          )}
        >
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-1">
          <p className="font-cinzel text-[10px] font-extrabold uppercase tracking-[0.2em] text-heritage-teal/85">
            {project.category}
            {project.region ? ` · ${project.region}` : ''}
          </p>
          <h3 className="font-cinzel text-[clamp(1rem,1.35vw,1.25rem)] font-extrabold uppercase leading-[1.2] tracking-[0.02em] text-heritage-gold">
            {project.title}
          </h3>
        </div>

        {project.description ? (
          <p className="line-clamp-3 font-display text-sm leading-relaxed text-surface-body">
            {project.description}
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-surface-body">
            <span>
              {uiMessageFormat(locale, 'raisedOf', {
                raised: formatCurrency(project.raisedAmount),
                goal: formatCurrency(project.goalAmount),
              })}
            </span>
            <span className="font-semibold text-heritage-teal">{percent}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(214,184,90,0.12)]">
            <div
              className={cn(
                'h-full rounded-full',
                isFunded ? 'bg-heritage-teal' : 'bg-heritage-gold',
              )}
              style={{ width: `${percent}%` }}
              aria-hidden
            />
          </div>

          <div className="pt-3">
            <ButtonLink
              href="/donate"
              variant={isFunded ? 'ghost' : 'secondary'}
              size="sm"
              withArrow={!isFunded}
            >
              {isFunded ? uiMessage(locale, 'seeImpact') : uiMessage(locale, 'supportThisProject')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
