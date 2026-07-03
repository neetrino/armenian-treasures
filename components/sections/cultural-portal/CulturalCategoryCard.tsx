import Link from 'next/link';
import type { CulturalPortalCategory } from '@/lib/constants/cultural-portal';
import { CulturalCategoryIcon } from '@/components/sections/cultural-portal/CulturalCategoryIcon';

interface CulturalCategoryCardProps {
  category: CulturalPortalCategory;
}

export function CulturalCategoryCard({ category }: CulturalCategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="cultural-portal-card group block h-full outline-none"
      data-category-icon={category.icon}
    >
      <div className="cultural-portal-card__media">
        <CulturalCategoryIcon
          type={category.icon}
          withBadge={false}
          iconClassName="cultural-portal-card__image"
        />
      </div>

      <div className="cultural-portal-card__content">
        <h3 className="cultural-portal-card__title font-cinzel text-[12px] font-extrabold uppercase leading-[1.15] tracking-[0.04em] sm:text-[13px] sm:leading-[1.2]">
          {category.title}
        </h3>

        <p className="cultural-portal-card__description font-display text-[12px] leading-[1.35] sm:text-[13px]">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
