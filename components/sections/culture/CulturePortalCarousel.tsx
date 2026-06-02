'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CultureCategoryCard } from '@/components/cards/CultureCategoryCard';
import type { MenuNode } from '@/lib/culture-menu';
import { cn } from '@/lib/utils';

interface CulturePortalCarouselProps {
  nodes: MenuNode[];
  className?: string;
}

const CARD_SLOT =
  'w-[13.5rem] shrink-0 sm:w-[14.75rem] motion-reduce:w-[calc(50%-0.625rem)] motion-reduce:max-w-[14.75rem]';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: EASE },
  },
};

const cardVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

interface MarqueeStripProps {
  nodes: MenuNode[];
  duplicate?: boolean;
  animated?: boolean;
}

function MarqueeStrip({ nodes, duplicate = false, animated = false }: MarqueeStripProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? cardVariantsReduced : cardVariants;

  return (
    <div
      className={cn('flex gap-5 sm:gap-6', duplicate && 'motion-reduce:hidden')}
      aria-hidden={duplicate || undefined}
    >
      {nodes.map((node, i) => {
        const content = (
          <CultureCategoryCard node={node} index={i + 1} className="h-full min-h-[23rem]" />
        );

        if (!animated || duplicate) {
          return (
            <div key={`${node.id}-${duplicate ? 'dup' : 'orig'}`} className={CARD_SLOT} role="listitem">
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={`${node.id}-orig`}
            className={CARD_SLOT}
            role="listitem"
            variants={variants}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}

function MarqueeDots({ count, visible }: { count: number; visible: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="mt-8 flex items-center justify-center gap-2"
      aria-hidden
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.55, ease: EASE, delay: visible ? 0.12 : 0 }}
    >
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className={cn(
            'rounded-full bg-stone-300/80',
            i === 1 ? 'h-2.5 w-2.5 bg-bronze-500' : 'h-2 w-2',
          )}
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.4, ease: EASE, delay: visible ? 0.2 + i * 0.06 : 0 }}
        />
      ))}
    </motion.div>
  );
}

function marqueeDelayMs(count: number): number {
  return 520 + count * 120;
}

export function CulturePortalCarousel({ nodes, className }: CulturePortalCarouselProps) {
  const reduced = useReducedMotion();
  const [marqueeReady, setMarqueeReady] = useState(Boolean(reduced));
  const dotCount = Math.min(nodes.length, 7);

  useEffect(() => {
    if (reduced || nodes.length === 0) {
      setMarqueeReady(true);
      return;
    }

    setMarqueeReady(false);
    const timer = window.setTimeout(() => setMarqueeReady(true), marqueeDelayMs(nodes.length));
    return () => window.clearTimeout(timer);
  }, [nodes.length, reduced]);

  if (nodes.length === 0) return null;

  return (
    <motion.div
      className={cn('relative left-1/2 w-screen -translate-x-1/2', className)}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-parchment via-parchment/90 to-transparent sm:w-20 lg:w-28"
        aria-hidden
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-parchment via-parchment/90 to-transparent sm:w-20 lg:w-28"
        aria-hidden
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
      />

      <div className="overflow-hidden motion-reduce:overflow-x-auto">
        <motion.div
          className={cn(
            'flex w-max gap-5 py-1 pl-4 sm:gap-6 sm:pl-6',
            'motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4 motion-reduce:gap-5',
            marqueeReady &&
              'motion-safe:animate-portal-marquee motion-safe:hover:[animation-play-state:paused]',
          )}
          role="list"
          aria-label="Culture portal categories"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduced ? 0 : 0.11,
                delayChildren: reduced ? 0 : 0.08,
              },
            },
          }}
        >
          <MarqueeStrip nodes={nodes} animated />
          {marqueeReady ? <MarqueeStrip nodes={nodes} duplicate /> : null}
        </motion.div>
      </div>

      <MarqueeDots count={dotCount} visible={marqueeReady} />
    </motion.div>
  );
}
