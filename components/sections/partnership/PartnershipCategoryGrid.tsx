import { HOME_PARTNERSHIP_CATEGORIES } from '@/lib/constants/home-partnership-section';
import { PartnershipCategoryCard } from '@/components/sections/partnership/PartnershipCategoryCard';

export function PartnershipCategoryGrid() {
  return (
    <div className="partnership-grid">
      {HOME_PARTNERSHIP_CATEGORIES.map((category) => (
        <PartnershipCategoryCard key={category.title} category={category} />
      ))}
    </div>
  );
}
