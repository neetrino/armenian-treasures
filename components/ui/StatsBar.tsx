'use client';

import type { LucideIcon } from 'lucide-react';
import { Building2, Globe2, History, Sparkles } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Counter } from '@/components/motion/Counter';
import { cn } from '@/lib/utils';

export interface StatItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

const LABEL_ICONS: Record<string, LucideIcon> = {
  'monuments scanned': Building2,
  'virtual tours': Globe2,
  'years of history': History,
  'cultural domains': Sparkles,
};

const FALLBACK_ICONS: LucideIcon[] = [Building2, Globe2, History, Sparkles];

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
} as const;

const ITEM = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

interface StatsBarProps {
  stats: StatItem[];
  icons?: LucideIcon[];
  className?: string;
  'aria-label'?: string;
}

function resolveIcon(stat: StatItem, index: number, icons?: LucideIcon[]): LucideIcon {
  if (stat.icon) return stat.icon;

  const byLabel = LABEL_ICONS[stat.label.trim().toLowerCase()];
  if (byLabel) return byLabel;

  if (icons?.[index]) return icons[index];
  return FALLBACK_ICONS[index % FALLBACK_ICONS.length] ?? Building2;
}

export function StatsBar({
  stats,
  icons,
  className,
  'aria-label': ariaLabel = 'Statistics',
}: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  if (stats.length === 0) return null;

  return (
    <div ref={ref} className={cn('relative min-w-0 w-full', className)} role="region" aria-label={ariaLabel}>
      <motion.dl
        variants={STAGGER}
        initial={reduced ? false : 'hidden'}
        animate={inView || reduced ? 'show' : 'hidden'}
        className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = resolveIcon(stat, index, icons);

          return (
            <motion.div
              key={`${stat.label}-${index}`}
              variants={ITEM}
              className="group relative overflow-hidden rounded-xl border border-parchment-200/12 bg-parchment/[0.07] p-4 backdrop-blur-md transition-[border-color,background-color,transform] duration-300 hover:border-bronze-400/35 hover:bg-parchment/[0.11] sm:p-[1.125rem] lg:p-5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-bronze-400 via-bronze-500/70 to-pomegranate/60 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-center gap-3.5 pl-2 sm:gap-4">
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-parchment-200/20 bg-midnight-900/35 text-bronze-400 transition-colors duration-300 group-hover:border-bronze-400/40 group-hover:text-bronze-300 sm:h-12 sm:w-12"
                  aria-hidden
                >
                  <Icon size={20} strokeWidth={1.35} />
                </span>

                <div className="min-w-0 flex-1">
                  <dt className="font-display text-[clamp(1.45rem,4.5vw,1.85rem)] leading-none text-parchment-50 sm:text-[1.75rem] lg:text-[2rem]">
                    <Counter value={stat.value} />
                  </dt>
                  <dd className="mt-1.5 text-[9px] font-medium uppercase leading-snug tracking-[0.13em] text-parchment-200/75 sm:mt-2 sm:text-[10px] sm:tracking-stat">
                    {stat.label}
                  </dd>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.dl>
    </div>
  );
}
