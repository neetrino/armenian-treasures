'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { HeroCtaButtons } from '@/components/sections/hero/HeroCtaButtons';
import { HeroBackground } from '@/components/sections/hero/HeroBackground';
import { HeroScrollIndicator } from '@/components/sections/hero/HeroScrollIndicator';
import { HeroStatsBar, type HomeStat } from '@/components/sections/hero/HeroStatsBar';
import { HeroTextBlock } from '@/components/sections/hero/HeroTextBlock';

interface HeroHomeProps {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  tagline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  stats: HomeStat[];
  heroImage?: string | null;
  heroMobileImage?: string | null;
}

export function HeroHome(props: HeroHomeProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="page-hero"
      data-site-hero
      className="relative isolate -mt-[var(--site-header-height)] flex min-h-[100svh] w-full flex-col overflow-x-hidden pt-[calc(var(--site-header-height)+clamp(4.5rem,9vh,6.5rem)+30px)] text-heritage-champagne"
      aria-labelledby="hero-heading"
    >
      <HeroBackground
        desktopImage={props.heroImage}
        mobileImage={props.heroMobileImage}
      />

      <div className="relative z-10 flex min-h-[calc(100svh-var(--site-header-height)-clamp(4.5rem,9vh,6.5rem)-30px)] flex-1 flex-col">
        <div className="mx-auto flex w-full min-w-0 max-w-[61.25rem] flex-1 flex-col items-center justify-center px-6 pb-6 text-center">
          <motion.div
            className="flex w-full min-w-0 flex-col items-center"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroTextBlock
              badge={props.badge}
              title={props.title}
              highlight={props.highlight}
              subtitle={props.subtitle}
              tagline={props.tagline}
              description={props.description}
            />
            <HeroCtaButtons
              className="mt-11"
              primaryText={props.primaryCtaText}
              primaryHref={props.primaryCtaUrl}
              secondaryText={props.secondaryCtaText}
              secondaryHref={props.secondaryCtaUrl}
            />
            <HeroScrollIndicator className="mt-14" />
          </motion.div>
        </div>

        <HeroStatsBar stats={props.stats} />
      </div>
    </section>
  );
}
