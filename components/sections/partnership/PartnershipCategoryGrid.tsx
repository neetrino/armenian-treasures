import type { PartnershipCategory } from '@/lib/constants/home-partnership-section';
import { PartnershipCategoryCard } from '@/components/sections/partnership/PartnershipCategoryCard';

interface PartnershipCategoryGridProps {
  categories: PartnershipCategory[];
}

export function PartnershipCategoryGrid({ categories }: PartnershipCategoryGridProps) {
  return (
    <div className="partnership-grid">
      {categories.map((category) => (
        <PartnershipCategoryCard key={category.title} category={category} />
      ))}
    </div>
  );
}
