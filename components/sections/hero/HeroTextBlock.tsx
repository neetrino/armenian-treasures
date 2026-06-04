import { HeroTitleDivider } from '@/components/sections/hero/HeroTitleDivider';

interface HeroTextBlockProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export function HeroTextBlock({
  badge,
  title,
  highlight,
  description,
}: HeroTextBlockProps) {
  return (
    <div className="relative min-w-0 max-w-full">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] sm:text-[11px] sm:tracking-[0.24em]">
        {badge}
      </p>

      <HeroTitleDivider className="mt-3 sm:mt-4 md:mt-5" variant="above" />

      <h1
        id="hero-heading"
        className="mt-4 min-w-0 max-w-full text-balance break-words font-display font-medium tracking-tight sm:mt-5 md:mt-6"
      >
        <span className="block text-[clamp(1.625rem,4.8vw,2.15rem)] leading-[1.14] text-parchment-50 drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] sm:text-[clamp(1.75rem,5vw,2.35rem)] sm:leading-[1.12] md:text-[clamp(1.9rem,3.8vw,2.55rem)] lg:text-[clamp(2.25rem,3.2vw,2.85rem)] xl:text-[2.95rem]">
          {title}
        </span>
        <span className="mt-1 block bg-hero-gold-text bg-clip-text text-[clamp(1.875rem,7vw,2.5rem)] font-semibold leading-[1.06] text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mt-1.5 sm:text-[clamp(2rem,7.5vw,2.85rem)] md:text-[clamp(2.35rem,5.5vw,3.2rem)] md:leading-[1.05] lg:mt-2 lg:text-[clamp(3rem,4.5vw,4.15rem)] xl:mt-2.5 xl:text-[4.35rem] xl:leading-[1.02]">
          {highlight}
        </span>
      </h1>

      <HeroTitleDivider className="mt-4 sm:mt-5 md:mt-6" variant="below" />

      <p className="mt-4 max-w-lg min-w-0 text-[15px] font-normal leading-[1.65] text-parchment-50 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] sm:mt-5 sm:text-base sm:leading-[1.72] md:mt-6 md:text-[16px] lg:max-w-md lg:text-[17px] xl:max-w-lg xl:text-lg">
        {description}
      </p>
    </div>
  );
}
