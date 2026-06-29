'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
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
    <LayoutGroup id="admin-filter-pills">
      <nav className={cn('flex flex-wrap gap-2', className)} aria-label="Filters">
        {pills.map((pill) => (
          <Link
            key={pill.href}
            href={pill.href}
            className={cn(
              'relative inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-200',
              pill.active
                ? 'border-pomegranate text-parchment-50 shadow-sm shadow-pomegranate/20'
                : 'border-stone-200/80 bg-white/90 text-ink-soft hover:border-bronze-300 hover:text-bronze-800',
            )}
            aria-current={pill.active ? 'page' : undefined}
          >
            {pill.active ? (
              <motion.span
                layoutId="admin-filter-pill"
                className="absolute inset-0 overflow-hidden rounded-full"
                transition={{ type: 'spring', stiffness: 205, damping: 30, mass: 1.15 }}
              >
                <span className="absolute inset-0 bg-pomegranate-600" />
                <span className="absolute inset-x-[-34%] bottom-[-80%] h-[145%] rounded-[44%] bg-white/20 motion-safe:animate-admin-water-drift" />
                <span className="absolute inset-x-[-28%] bottom-[-84%] h-[134%] rounded-[49%] bg-white/12 motion-safe:animate-admin-water-drift-soft" />
              </motion.span>
            ) : null}
            <span className="relative z-10 inline-flex items-center">
              {pill.label}
              {pill.badge}
            </span>
          </Link>
        ))}
      </nav>
    </LayoutGroup>
  );
}
