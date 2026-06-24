'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Fragment, useRef } from 'react';
import { Counter } from '@/components/motion/Counter';
import type { StatItem } from '@/components/ui/StatsBar';
import { cn } from '@/lib/utils';

export type { StatItem as HomeStat };

interface HeroStatsBarProps {
  stats: StatItem[];
}

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
} as const;

const ITEM = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

function mobileCellClassName(index: number): string {
  return cn(
    'relative flex min-h-[5.75rem] flex-col items-center justify-center px-4 py-4 text-center sm:min-h-[6.25rem] sm:px-6 sm:py-5',
    index % 2 === 1 && 'border-l border-[rgba(214,184,90,0.14)]',
    index >= 2 && 'border-t border-[rgba(214,184,90,0.14)]',
  );
}

function StatContent({ stat }: { stat: StatItem }) {
  return (
    <>
      <dt className="font-display text-[clamp(2.65rem,5.25vw,3.5rem)] font-semibold leading-[0.88] text-heritage-teal [text-shadow:0_0_28px_rgba(39,198,200,0.28)]">
        <Counter value={stat.value} />
      </dt>
      <dd className="mt-2.5 max-w-[11rem] font-cinzel text-[9px] uppercase leading-snug tracking-[0.2em] text-[rgba(232,216,155,0.72)] sm:mt-3 sm:max-w-none sm:text-[10px] sm:tracking-[0.24em]">
        {stat.label}
      </dd>
    </>
  );
}

function StatDivider() {
  return (
    <div
      aria-hidden
      className="hidden h-14 w-px shrink-0 bg-[rgba(214,184,90,0.16)] lg:block xl:h-16"
    />
  );
}

export function HeroStatsBar({ stats }: HeroStatsBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();

  if (stats.length === 0) return null;

  return (
    <div
      ref={ref}
      className="relative w-full border-t border-[rgba(214,184,90,0.14)] bg-[rgba(255,255,255,0.035)]"
      role="region"
      aria-label="Archive statistics"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,rgba(39,198,200,0.035)_0%,transparent_55%)]"
      />

      <motion.dl
        variants={STAGGER}
        initial={reduced ? false : 'hidden'}
        animate={inView || reduced ? 'show' : 'hidden'}
        className="relative mx-auto hidden w-full max-w-[96rem] items-center justify-between px-6 py-4 sm:px-10 sm:py-5 lg:flex xl:px-16 2xl:px-24"
      >
        {stats.map((stat, index) => (
          <Fragment key={`${stat.label}-${index}`}>
            {index > 0 ? <StatDivider /> : null}
            <motion.div variants={ITEM} className="flex flex-none flex-col items-center justify-center px-2 text-center xl:px-4">
              <StatContent stat={stat} />
            </motion.div>
          </Fragment>
        ))}
      </motion.dl>

      <motion.dl
        variants={STAGGER}
        initial={reduced ? false : 'hidden'}
        animate={inView || reduced ? 'show' : 'hidden'}
        className="relative mx-auto grid w-full grid-cols-2 gap-x-8 px-4 lg:hidden"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={`${stat.label}-${index}`}
            variants={ITEM}
            className={mobileCellClassName(index)}
          >
            <StatContent stat={stat} />
          </motion.div>
        ))}
      </motion.dl>
    </div>
  );
}
