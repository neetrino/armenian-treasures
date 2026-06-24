import type { Metadata } from 'next';

import { HeroHome } from '@/components/sections/HeroHome';
import { HomeHeritageSections } from '@/components/sections/HomeHeritageSections';
import { HOME_HERO_COPY, HOME_HERO_STATS } from '@/lib/constants/home-hero';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Armenian Treasures',
  description: HOME_HERO_COPY.description,
};

function HomePage() {
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
        stats={[...HOME_HERO_STATS]}
      />

      <HomeHeritageSections />
    </>
  );
}

export default HomePage;
