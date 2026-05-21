'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { OrnamentRight } from '@/components/brand/OrnamentRight';
import { Counter } from '@/components/motion/Counter';
import { Container } from '@/components/layout/Container';

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
  stats: HomeStat[];
}

export function HeroHome(props: HeroHomeProps) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], reduced ? [0, 0] : [0, 90]);

  return (
    <section className="relative isolate overflow-hidden bg-midnight-900 text-parchment-50">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ y: parallaxY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${props.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pomegranate-700/85 via-pomegranate-800/75 to-midnight-900/85" />
      </motion.div>
      <OrnamentRight className="pointer-events-none absolute right-4 top-1/2 hidden h-[480px] -translate-y-1/2 text-bronze-400/30 lg:block" />

      <Container className="relative flex min-h-[560px] flex-col justify-center gap-10 py-24 lg:min-h-[640px] lg:py-32">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-eyebrow text-bronze-400">
            {props.badge}
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
            {props.title}{' '}
            <span className="italic text-bronze-400">{props.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-parchment-200/90 sm:text-lg">
            {props.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={props.primaryCtaUrl} variant="primary" size="lg" withArrow>
              {props.primaryCtaText}
            </ButtonLink>
            <ButtonLink href={props.secondaryCtaUrl} variant="on-dark" size="lg">
              {props.secondaryCtaText}
            </ButtonLink>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {props.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="font-display text-4xl text-bronze-400 sm:text-5xl">
                <Counter value={stat.value} />
              </dt>
              <dd className="text-[11px] uppercase tracking-stat text-parchment-200/80">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
