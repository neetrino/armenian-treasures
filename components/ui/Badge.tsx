import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'bronze' | 'pomegranate' | 'stone' | 'midnight' | 'green' | 'amber' | 'red';

const TONE_CLASSES: Record<Tone, string> = {
  bronze: 'bg-bronze-500/15 text-bronze-700',
  pomegranate: 'bg-pomegranate/10 text-pomegranate',
  stone: 'bg-stone-100 text-ink-soft',
  midnight: 'bg-midnight-900/10 text-midnight-900',
  green: 'bg-emerald-100 text-emerald-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-700',
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = 'stone', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
