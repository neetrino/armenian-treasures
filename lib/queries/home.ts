import { unstable_cache } from 'next/cache';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { HOME_HERO_STATS } from '@/lib/constants/home-hero';
import { prisma } from '@/lib/db';
import { logQueryFallback } from '@/lib/observability/log-query-fallback';
import { toPublicHomeContent, type PublicHomeContentDTO } from '@/lib/dto';
import { DEFAULT_SITE_LOCALE, getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
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
  secondaryCtaUrl: '/donate',
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

function localizedHomeContentFallback(_locale: SiteLocaleCode): PublicHomeContentDTO {
  // Structural defaults only — public copy must come from admin Home Content, not catalog messages.
  return HOME_CONTENT_FALLBACK;
}

function applyHomeContentFallback(
  content: PublicHomeContentDTO,
  _locale: SiteLocaleCode,
): PublicHomeContentDTO {
  const fallback = HOME_CONTENT_FALLBACK;
  return {
    ...content,
    // Keep admin locale strings as-is (empty means not translated yet — never invent copy).
    heroBadge: content.heroBadge,
    heroTitle: content.heroTitle,
    heroHighlight: content.heroHighlight,
    heroSubtitle: content.heroSubtitle,
    heroTagline: content.heroTagline,
    heroDescription: content.heroDescription,
    primaryCtaText: content.primaryCtaText,
    primaryCtaUrl: content.primaryCtaUrl.trim() || fallback.primaryCtaUrl,
    secondaryCtaText: content.secondaryCtaText,
    secondaryCtaUrl: content.secondaryCtaUrl.trim() || fallback.secondaryCtaUrl,
    missionTitle: content.missionTitle,
    missionHighlight: content.missionHighlight,
    missionText: content.missionText,
    ctaTitle: content.ctaTitle,
    ctaDescription: content.ctaDescription,
    stats: normalizeHomeStats(content.stats.length > 0 ? content.stats : fallback.stats),
    techCards: normalizeHomeTechCards(
      content.techCards.length > 0 ? content.techCards : fallback.techCards,
    ),
    sections: normalizeHomeSections(content.sections ?? fallback.sections),
  };
}

function resolveHomeContentAssets(
  content: PublicHomeContentDTO,
  locale: SiteLocaleCode,
): PublicHomeContentDTO {
  const merged = applyHomeContentFallback(content, locale);
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
  const locale = await getCurrentSiteLocale().catch(() => DEFAULT_SITE_LOCALE);

  try {
    return getHomeContentCachedByLocale(locale);
  } catch {
    logQueryFallback({ query: 'home-content', reason: 'db-error' });
    return resolveHomeContentAssets(localizedHomeContentFallback(locale), locale);
  }
}

const getHomeContentCachedByLocale = unstable_cache(
  async (locale: SiteLocaleCode): Promise<PublicHomeContentDTO> => {
    const row = await prisma.homeContent.findFirst();
    const content = row
      ? toPublicHomeContent(row, locale)
      : localizedHomeContentFallback(locale);
    return resolveHomeContentAssets(content, locale);
  },
  ['home-content'],
  { tags: ['home-content'], revalidate: 60 },
);

export async function getHomeContent(): Promise<PublicHomeContentDTO> {
  return fetchHomeContent();
}
