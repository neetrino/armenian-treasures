import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: 'bronze' | 'parchment';
}

export function Eyebrow({ children, className, tone = 'bronze' }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs uppercase tracking-eyebrow',
        tone === 'bronze' ? 'text-bronze-500' : 'text-parchment-200',
        className,
      )}
    >
      {children}
    </span>
  );
}
