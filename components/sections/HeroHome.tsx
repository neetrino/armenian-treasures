'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { HeroCtaButtons } from '@/components/sections/hero/HeroCtaButtons';
import { Container } from '@/components/layout/Container';
import { HeroBackground } from '@/components/sections/hero/HeroBackground';
import { HeroTextBlock } from '@/components/sections/hero/HeroTextBlock';
import { HeroDecorations, HeroBottomDecor } from '@/components/sections/hero/HeroDecorations';
import { HeroStatsBar } from '@/components/sections/hero/HeroStatsBar';
import { resolveHomeHeroImageUrls } from '@/components/sections/hero/hero-image';

interface HomeStat {
  value: string;
  label: string;
}

interface HeroHomeProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  imageUrl: string;
  mobileImageUrl?: string | null;
  stats: HomeStat[];
}

const HEADER_OFFSET =
  '-mt-[4.5rem] pt-[4.5rem] sm:-mt-[4.75rem] sm:pt-[4.75rem] lg:-mt-[5.5rem] lg:pt-[5.5rem] xl:-mt-24 xl:pt-24';

export function HeroHome(props: HeroHomeProps) {
  const reduced = useReducedMotion();
  const { desktop, mobile } = resolveHomeHeroImageUrls(props.imageUrl, props.mobileImageUrl);

  return (
    <section
      id="page-hero"
      data-site-hero
      className={`relative isolate w-full overflow-x-hidden bg-midnight-900 text-parchment-50 ${HEADER_OFFSET} min-h-[100svh]`}
      aria-labelledby="hero-heading"
    >
      <HeroBackground desktopImageUrl={desktop} mobileImageUrl={mobile} />
      <HeroDecorations />

      <Container className="relative z-10 flex min-h-[inherit] w-full min-w-0 flex-col justify-center py-7 sm:py-10 md:py-12 lg:py-16 xl:py-20">
        <div className="grid min-w-0 flex-1 grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:items-center lg:gap-8 xl:gap-12">
          <motion.div
            className="min-w-0 w-full lg:pr-2 xl:pr-4"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroTextBlock
              badge={props.badge}
              title={props.title}
              highlight={props.highlight}
              description={props.description}
            />
            <HeroCtaButtons
              className="mt-6 sm:mt-7 md:mt-8"
              primaryText={props.primaryCtaText}
              primaryHref={props.primaryCtaUrl}
              secondaryText={props.secondaryCtaText}
              secondaryHref={props.secondaryCtaUrl}
            />
          </motion.div>

          <div className="hidden min-h-[min(44vh,400px)] min-w-0 lg:block" aria-hidden />
        </div>

        <div className="relative mt-7 min-w-0 w-full sm:mt-9 lg:mt-11">
          <HeroBottomDecor className="mb-3 hidden opacity-50 md:mb-4 md:block lg:mb-5 lg:opacity-70" />
          <HeroStatsBar stats={props.stats} />
        </div>
      </Container>
    </section>
  );
}
