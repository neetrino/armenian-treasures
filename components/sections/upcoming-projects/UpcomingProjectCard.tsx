import type { UpcomingProject } from '@/lib/constants/upcoming-projects';
import { UpcomingProjectIcon } from '@/components/sections/upcoming-projects/UpcomingProjectIcon';
import { cn } from '@/lib/utils';

interface UpcomingProjectCardProps {
  project: UpcomingProject;
}

const BADGE_STYLES = {
  teal: {
    text: 'text-heritage-teal',
    border: 'border-[rgba(39,198,200,0.32)]',
    bg: 'bg-[rgba(39,198,200,0.06)]',
  },
  gold: {
    text: 'text-heritage-gold',
    border: 'border-[rgba(214,184,90,0.24)]',
    bg: 'bg-[rgba(214,184,90,0.055)]',
  },
} as const;

export function UpcomingProjectCard({ project }: UpcomingProjectCardProps) {
  const badge = BADGE_STYLES[project.badgeTone];

  return (
    <article className="upcoming-project-card group">
      <div className="relative z-[2] flex h-full flex-col items-start text-left">
        <span
          className={cn(
            'heritage-cta-clip inline-flex h-[22px] items-center border px-3.5',
            'font-cinzel text-[8px] font-extrabold uppercase tracking-[0.2em] sm:text-[9px]',
            badge.text,
            badge.border,
            badge.bg,
          )}
        >
          {project.badge}
        </span>

        <UpcomingProjectIcon type={project.icon} className="mt-5" />

        <h3 className="mt-5 font-cinzel text-[clamp(0.9375rem,1.1vw,1.125rem)] font-extrabold uppercase leading-[1.15] tracking-[0.04em] text-heritage-gold transition-colors duration-[240ms] group-hover:text-[#E6C766]">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 font-display text-[clamp(0.8125rem,0.9vw,0.9375rem)] leading-[1.55] text-[rgba(232,216,155,0.58)] transition-colors duration-[240ms] group-hover:text-[rgba(232,216,155,0.72)]">
          {project.description}
        </p>

        <p className="mt-5 inline-flex items-center gap-2 font-cinzel text-[9px] font-extrabold uppercase tracking-[0.18em] text-heritage-teal sm:text-[10px]">
          <span className="h-1 w-1 rounded-full bg-heritage-teal shadow-[0_0_8px_rgba(39,198,200,0.65)]" aria-hidden />
          {project.timeline}
        </p>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[22px] right-6 z-0 select-none font-cinzel text-[clamp(3.5rem,5vw,5.25rem)] font-extrabold leading-none text-[rgba(214,184,90,0.035)] transition-colors duration-[240ms] group-hover:text-[rgba(214,184,90,0.055)]"
      >
        {project.number}
      </span>
    </article>
  );
}
