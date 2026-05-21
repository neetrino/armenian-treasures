import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-200 bg-parchment-50 px-6 py-16 text-center',
        className,
      )}
    >
      <div className="rounded-full bg-bronze-500/10 p-3 text-bronze-600">
        {icon ?? <Inbox size={22} strokeWidth={1.5} aria-hidden />}
      </div>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      {description ? <p className="max-w-md text-sm text-ink-muted">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
