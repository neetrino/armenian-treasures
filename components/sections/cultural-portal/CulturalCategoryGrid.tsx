import { getMenuTree } from '@/lib/queries/menu';
import { buildCulturePortalCategories } from '@/lib/mappers/culture-portal-categories';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { CulturalCategoryCard } from '@/components/sections/cultural-portal/CulturalCategoryCard';

export async function CulturalCategoryGrid() {
  const tree = await getMenuTree();
  const categories = buildCulturePortalCategories(tree);

  return (
    <Stagger className="cultural-portal-grid">
      {categories.map((category) => (
        <StaggerItem key={category.icon} className="h-full">
          <CulturalCategoryCard category={category} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
