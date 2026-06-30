import type { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OrnamentRight } from '@/components/brand/OrnamentRight';
import { HERO_WEBP_DEFAULT, resolveHeroImageUrl } from '@/components/sections/hero/hero-image';
import { cn } from '@/lib/utils';

interface HeroPageProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  backgroundImage?: string;
  size?: 'sm' | 'md' | 'lg';
  alignment?: 'left' | 'center';
  children?: ReactNode;
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<HeroPageProps['size']>, string> = {
  sm: 'min-h-[320px] py-16 lg:min-h-[360px] lg:py-20',
  md: 'min-h-[420px] py-20 lg:min-h-[480px] lg:py-24',
  lg: 'min-h-[480px] py-24 lg:min-h-[560px] lg:py-28',
};

export function HeroPage({
  eyebrow,
  title,
  description,
  backgroundImage = HERO_WEBP_DEFAULT,
  size = 'md',
  alignment = 'left',
  children,
  className,
}: HeroPageProps) {
  return (
    <section
      id="page-hero"
      data-site-hero
      className={cn(
        'relative isolate overflow-hidden page-hero-bg',
        SIZE_CLASSES[size],
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden page-hero-bg">
        <Image
          src={resolveHeroImageUrl(backgroundImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-center brightness-[1.1] contrast-[1.04] saturate-[1.06]"
        />
        <div className="absolute inset-0 page-hero-gradient-r" />
        <div className="absolute inset-0 page-hero-gradient-b" />
      </div>
      <OrnamentRight className="pointer-events-none absolute right-4 top-1/2 hidden h-[360px] -translate-y-1/2 text-bronze-400/30 lg:block" />
      <Container
        className={cn(
          'relative flex h-full flex-col justify-end gap-5',
          alignment === 'center' && 'items-center text-center',
        )}
      >
        {eyebrow ? <Eyebrow tone="parchment" className="text-bronze-400">{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p
            className="max-w-2xl text-base sm:text-lg"
            style={{ color: 'var(--page-hero-text-muted)' }}
          >
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
