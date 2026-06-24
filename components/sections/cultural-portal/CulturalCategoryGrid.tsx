import { CULTURAL_PORTAL_CATEGORIES } from '@/lib/constants/cultural-portal';
import { CulturalCategoryCard } from '@/components/sections/cultural-portal/CulturalCategoryCard';

export function CulturalCategoryGrid() {
  return (
    <div className="cultural-portal-grid">
      {CULTURAL_PORTAL_CATEGORIES.map((category) => (
        <CulturalCategoryCard key={category.title} category={category} />
      ))}
    </div>
  );
}
