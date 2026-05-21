import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OrnamentRight } from '@/components/brand/OrnamentRight';
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
  backgroundImage = '/images/hero/about.svg',
  size = 'md',
  alignment = 'left',
  children,
  className,
}: HeroPageProps) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-midnight-900 text-parchment-50',
        SIZE_CLASSES[size],
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-pomegranate-700/85 to-midnight-900/85"
      />
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
          <p className="max-w-2xl text-base text-parchment-200/90 sm:text-lg">{description}</p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
