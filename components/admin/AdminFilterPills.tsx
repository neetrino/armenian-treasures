import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface AdminFilterPill {
  href: string;
  label: string;
  active: boolean;
  badge?: ReactNode;
}

interface AdminFilterPillsProps {
  pills: AdminFilterPill[];
  className?: string;
}

export function AdminFilterPills({ pills, className }: AdminFilterPillsProps) {
  return (
    <nav className={cn('flex flex-wrap gap-2', className)} aria-label="Filters">
      {pills.map((pill) => (
        <Link
          key={pill.href}
          href={pill.href}
          className={cn(
            'inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-200',
            pill.active
              ? 'border-pomegranate bg-gradient-to-r from-pomegranate to-pomegranate-600 text-parchment-50 shadow-sm shadow-pomegranate/20'
              : 'border-stone-200/80 bg-white/90 text-ink-soft hover:border-bronze-300 hover:text-bronze-800',
          )}
          aria-current={pill.active ? 'page' : undefined}
        >
          {pill.label}
          {pill.badge}
        </Link>
      ))}
    </nav>
  );
}
