import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdminPanelCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const PADDING: Record<NonNullable<AdminPanelCardProps['padding']>, string> = {
  none: '',
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

export function AdminPanelCard({ children, className, padding = 'md' }: AdminPanelCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-stone-200/70 bg-white/95 shadow-card backdrop-blur-sm transition duration-300 ease-cinematic motion-safe:animate-admin-fade-up hover:-translate-y-0.5 hover:shadow-card-hover',
        PADDING[padding],
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze-300/60 to-transparent"
        aria-hidden
      />
      {children}
    </div>
  );
}
