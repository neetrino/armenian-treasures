import { Container } from '@/components/layout/Container';
import type { ReactNode } from 'react';
import { CulturePortalBackground } from '@/components/sections/culture/CulturePortalBackground';
import { CulturePortalCarousel } from '@/components/sections/culture/CulturePortalCarousel';
import { CulturePortalSectionIntro } from '@/components/sections/culture/CulturePortalSectionIntro';
import { filterCulturePortalCarouselNodes, type MenuNode } from '@/lib/culture-menu';

interface CulturePortalGridProps {
  tree: MenuNode[];
  limit?: number;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
}

export function CulturePortalGrid({
  tree,
  limit = 8,
  eyebrow = 'Culture Portal',
  title,
  description = 'From cliff-top monasteries to UNESCO-recognised bread — explore curated entry points to every part of the archive.',
}: CulturePortalGridProps) {
  const visible = filterCulturePortalCarouselNodes(tree).slice(0, limit);

  return (
    <section
      className="relative isolate overflow-hidden py-[clamp(4.5rem,10vw,7rem)] lg:py-[clamp(5.5rem,11vw,8rem)]"
      aria-labelledby="culture-portal-heading"
    >
      <CulturePortalBackground />
      <Container className="relative z-10 max-w-[82.5rem]">
        <CulturePortalSectionIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <CulturePortalCarousel nodes={visible} className="mt-12 sm:mt-14 lg:mt-16" />
      </Container>
    </section>
  );
}
