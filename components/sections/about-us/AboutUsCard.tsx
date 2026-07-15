import Link from 'next/link';
import type { HomeAboutCard } from '@/lib/constants/home-about-section';
import { AboutUsCardIcon } from '@/components/sections/about-us/AboutUsCardIcon';
import { getCardBackgroundStyle, hasCardBackground } from '@/lib/card-background-style';
import { cn } from '@/lib/utils';

interface AboutUsCardProps {
  card: HomeAboutCard;
}

export function AboutUsCard({ card }: AboutUsCardProps) {
  const hasCustomBackground = hasCardBackground(card.cardBackgroundColor, card.cardBackgroundImage);

  return (
    <Link
      href={card.href}
      style={getCardBackgroundStyle(card.cardBackgroundColor, card.cardBackgroundImage, {
        colorVarName: '--about-card-bg-color',
        imageVarName: '--about-card-bg-image',
        fallbackColor: 'var(--surface-card-bg)',
      })}
      className={cn('about-us-card group block h-full outline-none', hasCustomBackground && 'about-us-card--has-bg')}
    >
      <AboutUsCardIcon type={card.icon} />

      <h3 className="mt-5 font-cinzel text-[clamp(0.8125rem,1vw,0.9375rem)] font-extrabold uppercase leading-[1.15] tracking-[0.04em] text-heritage-gold transition-colors duration-[240ms] group-hover:text-[var(--accent-hover)]">
        {card.title}
      </h3>

      <p className="mt-3 max-w-[24rem] font-display text-[clamp(0.8125rem,0.9vw,0.9375rem)] leading-[1.55] text-surface-body transition-colors duration-[240ms] group-hover:text-surface-muted">
        {card.description}
      </p>
    </Link>
  );
}
