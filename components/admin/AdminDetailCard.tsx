import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdminDetailCardProps {
  title?: string;
  description?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: 'article' | 'aside' | 'div';
}

export function AdminDetailCard({
  title,
  description,
  badge,
  children,
  className,
  as: Tag = 'article',
}: AdminDetailCardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-stone-200/70 bg-white/95 p-6 shadow-card backdrop-blur-sm',
        className,
      )}
    >
      {title || badge || description ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-stone-200/50 pb-3">
          <div>
            {title ? <h3 className="font-display text-xl text-ink">{title}</h3> : null}
            {description ? <p className="mt-1 text-xs text-ink-muted">{description}</p> : null}
          </div>
          {badge}
        </div>
      ) : null}
      {children}
    </Tag>
  );
}
