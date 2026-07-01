import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HomeSectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function HomeSectionHeader({
  id,
  eyebrow,
  title,
  description,
  action,
  className,
}: HomeSectionHeaderProps) {
  return (
    <header
      className={cn(
        'mb-10 flex flex-col gap-5 text-left sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className="max-w-[43.75rem]">
        <p className="mb-3 inline-flex items-center gap-2 font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
          <span aria-hidden className="h-px w-8 bg-[rgba(39,198,200,0.5)]" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="font-cinzel text-[clamp(2rem,3vw,3.25rem)] font-extrabold uppercase leading-[1.03] tracking-[0.01em] text-heritage-gold"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-[41.25rem] font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.55] text-surface-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
