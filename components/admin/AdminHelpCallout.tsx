import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminHelpCalloutProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function AdminHelpCallout({ title = 'Tip', children, className }: AdminHelpCalloutProps) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-xl border border-bronze-200/50 bg-gradient-to-r from-bronze-50/70 to-parchment-50/80 px-4 py-3 text-sm text-ink-soft transition duration-300 hover:border-bronze-300/60',
        className,
      )}
    >
      <Info size={18} className="mt-0.5 shrink-0 text-bronze-700" aria-hidden />
      <div>
        <p className="font-medium text-ink">{title}</p>
        <div className="mt-1 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
