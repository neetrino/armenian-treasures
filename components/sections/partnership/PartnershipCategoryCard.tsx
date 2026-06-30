import Link from 'next/link';
import type { PartnershipCategory } from '@/lib/constants/home-partnership-section';
import { PartnershipCategoryIcon } from '@/components/sections/partnership/PartnershipCategoryIcon';
import { cn } from '@/lib/utils';

interface PartnershipCategoryCardProps {
  category: PartnershipCategory;
}

function PartnershipCategoryContent({ category }: PartnershipCategoryCardProps) {
  return (
    <>
      <PartnershipCategoryIcon type={category.icon} />
      <h3 className="mt-5 max-w-[9rem] text-center font-cinzel text-[11px] font-extrabold uppercase leading-[1.15] tracking-[0.04em] text-heritage-gold transition-colors duration-[240ms] group-hover:text-[var(--accent-hover)] sm:text-[12px]">
        {category.title}
      </h3>
    </>
  );
}

export function PartnershipCategoryCard({ category }: PartnershipCategoryCardProps) {
  const isCta = category.variant === 'cta';

  if (isCta && category.href) {
    return (
      <Link
        href={category.href}
        className={cn(
          'partnership-card partnership-card--cta group flex h-full flex-col items-center justify-center outline-none',
        )}
      >
        <PartnershipCategoryContent category={category} />
      </Link>
    );
  }

  return (
    <article className="partnership-card group flex h-full flex-col items-center justify-center">
      <PartnershipCategoryContent category={category} />
    </article>
  );
}
