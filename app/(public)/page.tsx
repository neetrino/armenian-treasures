import type { Metadata } from 'next';
import { HeroHome } from '@/components/sections/HeroHome';
import { MissionPreviewSection } from '@/components/sections/MissionPreviewSection';
import { TechnologySection } from '@/components/sections/TechnologySection';
import { CulturePortalGrid } from '@/components/sections/CulturePortalGrid';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { HOME_HERO_COPY } from '@/lib/constants/home-hero';
import { getMenuTree } from '@/lib/queries/menu';
import { getHomeContent } from '@/lib/queries/home';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Armenian Treasures',
  description: HOME_HERO_COPY.description,
};

interface HomeTechCard {
  title: string;
  description: string;
  icon: string;
}

function asTechCards(value: unknown): HomeTechCard[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is HomeTechCard =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as Record<string, unknown>).title === 'string' &&
      typeof (item as Record<string, unknown>).description === 'string' &&
      typeof (item as Record<string, unknown>).icon === 'string',
  );
}

async function HomePage() {
  const [tree, content] = await Promise.all([getMenuTree(), getHomeContent()]);
  const techCards = asTechCards(content.techCards);
  return (
    <>
      <HeroHome
        badge={HOME_HERO_COPY.badge}
        title={HOME_HERO_COPY.title}
        highlight={HOME_HERO_COPY.highlight}
        subtitle={HOME_HERO_COPY.subtitle}
        tagline={HOME_HERO_COPY.tagline}
        description={HOME_HERO_COPY.description}
        primaryCtaText={HOME_HERO_COPY.primaryCtaText}
        primaryCtaUrl={HOME_HERO_COPY.primaryCtaUrl}
        secondaryCtaText={HOME_HERO_COPY.secondaryCtaText}
        secondaryCtaUrl={HOME_HERO_COPY.secondaryCtaUrl}
      />
      <MissionPreviewSection
        title={content.missionTitle}
        highlight={content.missionHighlight}
        text={content.missionText}
      />
      <TechnologySection items={techCards} />
      <CulturePortalGrid tree={tree} />
      <FinalCtaSection title={content.ctaTitle} description={content.ctaDescription} />
    </>
  );
}

export default HomePage;
