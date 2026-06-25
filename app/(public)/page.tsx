import type { Metadata } from 'next';

import { HeroHome } from '@/components/sections/HeroHome';
import { HomeHeritageSections } from '@/components/sections/HomeHeritageSections';
import { getHomeContent } from '@/lib/queries/home';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeContent();
  return {
    title: 'Armenian Treasures',
    description: home.heroDescription,
  };
}

async function HomePage() {
  const home = await getHomeContent();

  return (
    <>
      <HeroHome
        badge={home.heroBadge}
        title={home.heroTitle}
        highlight={home.heroHighlight}
        subtitle={home.heroSubtitle}
        tagline={home.heroTagline}
        description={home.heroDescription}
        primaryCtaText={home.primaryCtaText}
        primaryCtaUrl={home.primaryCtaUrl}
        secondaryCtaText={home.secondaryCtaText}
        secondaryCtaUrl={home.secondaryCtaUrl}
        stats={home.stats}
        heroImage={home.heroImage}
        heroMobileImage={home.heroMobileImage}
      />

      <HomeHeritageSections />
    </>
  );
}

export default HomePage;
