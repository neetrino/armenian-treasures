import { unstable_cache } from 'next/cache';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { HOME_HERO_STATS } from '@/lib/constants/home-hero';
import { prisma } from '@/lib/db';
import { logQueryFallback } from '@/lib/observability/log-query-fallback';
import { toPublicHomeContent, type PublicHomeContentDTO } from '@/lib/dto';
import {
  buildDefaultHomeSections,
  normalizeHomeSections,
  type HomeSections,
} from '@/lib/types/home-sections';
import { normalizeHomeStats, normalizeHomeTechCards } from '@/lib/types/home-content';

export const HOME_CONTENT_FALLBACK: PublicHomeContentDTO = {
  heroBadge: '✦ DISCOVER · PRESERVE · CELEBRATE ✦',
  heroTitle: 'ARMENIAN',
  heroHighlight: 'TREASURES',
  heroSubtitle: 'CULTURAL HERITAGE\nPORTAL',
  heroTagline: 'BRINGING ARMENIAN HISTORY INTO THE DIGITAL FUTURE',
  heroDescription:
    "A living archive of Armenia's 3,000-year civilisation — its kingdoms, churches, legends, arts, and the people who shaped history.",
  heroImage: null,
  heroMobileImage: null,
  primaryCtaText: 'EXPLORE ARMENIAN HERITAGE',
  primaryCtaUrl: '/culture',
  secondaryCtaText: 'SUPPORT THE MISSION',
  secondaryCtaUrl: '/partnership',
  stats: [...HOME_HERO_STATS],
  missionTitle: "A nation's memory, made",
  missionHighlight: 'eternal.',
  missionText:
    'For over a millennium, Armenian craftsmen carved khachkars and built cliff-top monasteries that survived empires. Today many remain at risk. Armenian Treasures creates a permanent, open digital twin of every site — accessible to scholars, students and the diaspora worldwide.',
  techCards: [
    {
      title: 'Matterport Virtual Tours',
      description:
        'Walk through monasteries and museums from anywhere with photo-real 3D capture and immersive experiences.',
      icon: 'ScanEye',
    },
    {
      title: 'Drone Photogrammetry',
      description:
        'Centimeter-accurate aerial reconstructions of fortresses, cliff churches, and archaeological sites.',
      icon: 'Drone',
    },
    {
      title: 'AI Video & Storytelling',
      description:
        'AI-curated narratives in multiple languages, bringing context to every stone and manuscript.',
      icon: 'AudioLines',
    },
  ],
  ctaTitle: 'Help us digitize the next monument',
  ctaDescription:
    'Every donation funds drone flights, 3D scans and the open archive that will outlast all of us.',
  sections: buildDefaultHomeSections(),
};

function applyHomeContentFallback(content: PublicHomeContentDTO): PublicHomeContentDTO {
  const fallback = HOME_CONTENT_FALLBACK;
  return {
    ...fallback,
    ...content,
    heroBadge: content.heroBadge || fallback.heroBadge,
    heroTitle: content.heroTitle || fallback.heroTitle,
    heroHighlight: content.heroHighlight || fallback.heroHighlight,
    heroSubtitle: content.heroSubtitle || fallback.heroSubtitle,
    heroTagline: content.heroTagline || fallback.heroTagline,
    heroDescription: content.heroDescription || fallback.heroDescription,
    primaryCtaText: content.primaryCtaText || fallback.primaryCtaText,
    primaryCtaUrl: content.primaryCtaUrl || fallback.primaryCtaUrl,
    secondaryCtaText: content.secondaryCtaText || fallback.secondaryCtaText,
    secondaryCtaUrl: content.secondaryCtaUrl || fallback.secondaryCtaUrl,
    missionTitle: content.missionTitle || fallback.missionTitle,
    missionHighlight: content.missionHighlight || fallback.missionHighlight,
    missionText: content.missionText || fallback.missionText,
    ctaTitle: content.ctaTitle || fallback.ctaTitle,
    ctaDescription: content.ctaDescription || fallback.ctaDescription,
    stats: normalizeHomeStats(content.stats ?? fallback.stats),
    techCards: normalizeHomeTechCards(content.techCards ?? fallback.techCards),
    sections: normalizeHomeSections(content.sections ?? fallback.sections),
  };
}

function resolveHomeContentAssets(content: PublicHomeContentDTO): PublicHomeContentDTO {
  const merged = applyHomeContentFallback(content);
  return {
    ...merged,
    heroImage: merged.heroImage ? resolvePublicAssetUrl(merged.heroImage) : null,
    heroMobileImage: merged.heroMobileImage
      ? resolvePublicAssetUrl(merged.heroMobileImage)
      : null,
  };
}

export type HomeSectionContentProps = {
  home: PublicHomeContentDTO;
};

export function getHomeSections(content: PublicHomeContentDTO): HomeSections {
  return normalizeHomeSections(content.sections);
}

async function fetchHomeContent(): Promise<PublicHomeContentDTO> {
  try {
    const row = await prisma.homeContent.findFirst();
    const content = row ? toPublicHomeContent(row) : HOME_CONTENT_FALLBACK;
    return resolveHomeContentAssets(content);
  } catch {
    logQueryFallback({ query: 'home-content', reason: 'db-error' });
    return resolveHomeContentAssets(HOME_CONTENT_FALLBACK);
  }
}

export const getHomeContent = unstable_cache(
  fetchHomeContent,
  ['home-content'],
  { tags: ['home-content'], revalidate: 60 },
);
