import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdminFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'white';
}

export function AdminFormSection({
  title,
  description,
  children,
  className,
  tone = 'default',
}: AdminFormSectionProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-stone-200/60 p-5 transition duration-300 sm:p-6',
        tone === 'white' ? 'bg-white/95' : 'bg-parchment-50/80',
        className,
      )}
    >
      <div className="mb-4 border-b border-stone-200/50 pb-3">
        <h3 className="font-display text-lg text-ink">{title}</h3>
        {description ? (
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-muted">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
