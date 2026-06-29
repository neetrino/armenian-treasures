import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdminGroupCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function AdminGroupCard({ title, description, children, className }: AdminGroupCardProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-stone-200/70 bg-white/95 p-5 shadow-card backdrop-blur-sm sm:p-6',
        className,
      )}
    >
      <div className="border-b border-stone-200/50 pb-3">
        <h2 className="font-display text-lg text-ink">{title}</h2>
        {description ? <p className="mt-1 text-sm text-ink-muted">{description}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
