import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { CultureCategoryCard } from '@/components/cards/CultureCategoryCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { isFormRoute } from '@/lib/culture-menu';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Culture Portal',
  description: 'Eleven curated domains of Armenian heritage — architecture, manuscripts, music, food and more.',
};

async function CulturePortalLandingPage() {
  const tree = await getMenuTree();
  const visible = tree.filter((node) => node.isActive && !isFormRoute(node.routeType));
  return (
    <>
      <HeroPage
        eyebrow="Culture Portal"
        title="The full archive of Armenian heritage."
        description="From cliff-top monasteries to UNESCO-recognised bread — every curated entry into the Armenian cultural world."
      />
      <Container className="py-20 lg:py-28">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((node) => (
            <StaggerItem key={node.id} className="h-full">
              <CultureCategoryCard node={node} size="md" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </>
  );
}

export default CulturePortalLandingPage;
