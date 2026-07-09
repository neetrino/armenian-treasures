import Link from 'next/link';
import type { FeaturedTreasure } from '@/lib/constants/featured-treasures';
import { CulturalCategoryIcon } from '@/components/sections/cultural-portal/CulturalCategoryIcon';
import {
  getFeaturedTreasureCardStyle,
  hasFeaturedTreasureCardBackground,
} from '@/lib/featured-treasure-card-background';
import { cn } from '@/lib/utils';

interface FeaturedTreasureCardProps {
  treasure: FeaturedTreasure;
}

const LAYOUT_CLASS: Record<FeaturedTreasure['layout'], string> = {
  tall: 'featured-treasure-card--tall',
  'top-mid': 'featured-treasure-card--top-mid',
  'bottom-mid': 'featured-treasure-card--bottom-mid',
  'top-right': 'featured-treasure-card--top-right',
};

export function FeaturedTreasureCard({ treasure }: FeaturedTreasureCardProps) {
  const { number, icon, categories, title, description, href, layout, cardBackgroundColor, cardBackgroundImage } =
    treasure;
  const hasCustomBackground = hasFeaturedTreasureCardBackground(
    cardBackgroundColor,
    cardBackgroundImage,
  );

  return (
    <Link
      href={href}
      style={getFeaturedTreasureCardStyle(cardBackgroundColor, cardBackgroundImage)}
      className={cn(
        'featured-treasure-card group block h-full outline-none',
        LAYOUT_CLASS[layout],
        hasCustomBackground && 'featured-treasure-card--has-bg',
      )}
    >
      <div className="relative z-[2] flex h-full flex-col items-start text-left">
        <CulturalCategoryIcon type={icon} />

        <p className="featured-treasure-card__categories mt-5 font-cinzel text-[9px] font-extrabold uppercase tracking-[0.22em] sm:text-[10px]">
          {categories[0]}
          <span className="px-1.5 text-[rgba(39,198,200,0.45)]">·</span>
          {categories[1]}
        </p>

        <h3 className="featured-treasure-card__title mt-3 max-w-[20rem] font-cinzel text-[clamp(0.8125rem,1vw,0.9375rem)] font-extrabold uppercase leading-[1.2] tracking-[0.03em]">
          {title}
        </h3>

        <p className="featured-treasure-card__description mt-3 max-w-[21.25rem] flex-1 font-display text-[clamp(0.8125rem,0.9vw,0.9375rem)] leading-[1.5]">
          {description}
        </p>
      </div>

      <span
        aria-hidden
        className="featured-treasure-card__number pointer-events-none absolute bottom-[22px] right-6 z-0 select-none font-cinzel text-[clamp(3.5rem,5vw,5.25rem)] font-extrabold leading-none"
      >
        {number}
      </span>

      <span className="featured-treasure-card__arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
