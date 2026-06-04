'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
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

const STAGGER_CHILDREN = 0.11;
const DELAY_CHILDREN = 0.08;
const CARD_DURATION = 0.72;

function marqueeDelayMs(count: number): number {
  const lastChildStart = DELAY_CHILDREN + Math.max(0, count - 1) * STAGGER_CHILDREN;
  return Math.round((lastChildStart + CARD_DURATION) * 1000) + 180;
}

export function CulturePortalCarousel({ nodes, className }: CulturePortalCarouselProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.25 });
  const [marqueeReady, setMarqueeReady] = useState(false);

  useEffect(() => {
    if (!inView || nodes.length === 0) {
      return;
    }

    if (reduced) {
      setMarqueeReady(true);
      return;
    }

    setMarqueeReady(false);
    const timer = window.setTimeout(() => setMarqueeReady(true), marqueeDelayMs(nodes.length));
    return () => window.clearTimeout(timer);
  }, [inView, nodes.length, reduced]);

  if (nodes.length === 0) return null;

  const showCarousel = inView;

  return (
    <div
      ref={rootRef}
      className={cn('relative left-1/2 w-screen -translate-x-1/2', className)}
    >
      {showCarousel ? (
        <>
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-parchment via-parchment/90 to-transparent sm:w-20 lg:w-28"
            aria-hidden
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.35, ease: EASE }}
          />
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-parchment via-parchment/90 to-transparent sm:w-20 lg:w-28"
            aria-hidden
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.35, ease: EASE }}
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
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduced ? 0 : STAGGER_CHILDREN,
                    delayChildren: reduced ? 0 : DELAY_CHILDREN,
                  },
                },
              }}
            >
              <MarqueeStrip nodes={nodes} animated />
              {marqueeReady ? <MarqueeStrip nodes={nodes} duplicate /> : null}
            </motion.div>
          </div>
        </>
      ) : (
        <div className="min-h-[23rem]" aria-hidden />
      )}
    </div>
  );
}
