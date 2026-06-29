import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function AdminPageHeader({ title, description, actions, className }: AdminPageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-wrap items-end justify-between gap-4 motion-safe:animate-admin-fade-up motion-reduce:animate-none',
        className,
      )}
      style={{ animationDelay: '80ms' }}
    >
      <div className="min-w-0">
        <h2 className="font-display text-2xl text-ink sm:text-[1.75rem]">{title}</h2>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
