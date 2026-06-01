import type { Metadata } from 'next';
import { HeroHome } from '@/components/sections/HeroHome';
import { MissionPreviewSection } from '@/components/sections/MissionPreviewSection';
import { TechnologySection } from '@/components/sections/TechnologySection';
import { CulturePortalGrid } from '@/components/sections/CulturePortalGrid';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { getMenuTree } from '@/lib/queries/menu';
import { getHomeContent } from '@/lib/queries/home';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Armenian Treasures',
  description:
    "The living archive of Armenian heritage — monasteries, fortresses, museums and folk arts, digitized for the world.",
};

interface HomeStat {
  value: string;
  label: string;
}

interface HomeTechCard {
  title: string;
  description: string;
  icon: string;
}

function asStats(value: unknown): HomeStat[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is HomeStat =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as Record<string, unknown>).value === 'string' &&
      typeof (item as Record<string, unknown>).label === 'string',
  );
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
  const stats = asStats(content.stats);
  const techCards = asTechCards(content.techCards);
  return (
    <>
      <HeroHome
        badge={content.heroBadge}
        title={content.heroTitle}
        highlight={content.heroHighlight}
        description={content.heroDescription}
        primaryCtaText={content.primaryCtaText}
        primaryCtaUrl={content.primaryCtaUrl}
        secondaryCtaText={content.secondaryCtaText}
        secondaryCtaUrl={content.secondaryCtaUrl}
        imageUrl={content.heroImage ?? '/images/hero/home-hero.png'}
        stats={stats}
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
