import { unstable_cache } from 'next/cache';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { HOME_HERO_STATS } from '@/lib/constants/home-hero';
import { prisma } from '@/lib/db';
import { logQueryFallback } from '@/lib/observability/log-query-fallback';
import { toPublicHomeContent, type PublicHomeContentDTO } from '@/lib/dto';
import { DEFAULT_SITE_LOCALE, getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import {
  localizedHomeSections,
  localizedHomeStats,
  localizedHomeTechCards,
  localizedOrEnglishDefault,
  overlayLocalizedHomeSections,
  overlayLocalizedHomeStats,
  overlayLocalizedHomeTechCards,
} from '@/lib/i18n/home-fallbacks';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
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

function localizedHomeContentFallback(locale: SiteLocaleCode): PublicHomeContentDTO {
  if (locale === 'EN') return HOME_CONTENT_FALLBACK;
  return {
    ...HOME_CONTENT_FALLBACK,
    heroBadge: uiMessage(locale, 'heroBadge'),
    heroTitle: uiMessage(locale, 'heroTitle'),
    heroHighlight: uiMessage(locale, 'heroHighlight'),
    heroSubtitle: uiMessage(locale, 'heroSubtitle'),
    heroTagline: uiMessage(locale, 'heroTagline'),
    heroDescription: uiMessage(locale, 'heroDescription'),
    primaryCtaText: uiMessage(locale, 'exploreArmenianHeritage'),
    secondaryCtaText: uiMessage(locale, 'supportTheMission').toUpperCase(),
    stats: localizedHomeStats(locale),
    missionTitle: uiMessage(locale, 'missionTitle'),
    missionHighlight: uiMessage(locale, 'missionHighlight'),
    missionText: uiMessage(locale, 'missionText'),
    techCards: localizedHomeTechCards(locale),
    ctaTitle: uiMessage(locale, 'ctaTitle'),
    ctaDescription: uiMessage(locale, 'ctaDescription'),
    sections: localizedHomeSections(locale),
  };
}

function applyHomeContentFallback(
  content: PublicHomeContentDTO,
  locale: SiteLocaleCode,
): PublicHomeContentDTO {
  const fallback = localizedHomeContentFallback(locale);
  const english = HOME_CONTENT_FALLBACK;
  return {
    ...fallback,
    ...content,
    heroBadge: localizedOrEnglishDefault(content.heroBadge, english.heroBadge, fallback.heroBadge, locale),
    heroTitle: localizedOrEnglishDefault(content.heroTitle, english.heroTitle, fallback.heroTitle, locale),
    heroHighlight: localizedOrEnglishDefault(
      content.heroHighlight,
      english.heroHighlight,
      fallback.heroHighlight,
      locale,
    ),
    heroSubtitle: localizedOrEnglishDefault(
      content.heroSubtitle,
      english.heroSubtitle,
      fallback.heroSubtitle,
      locale,
    ),
    heroTagline: localizedOrEnglishDefault(content.heroTagline, english.heroTagline, fallback.heroTagline, locale),
    heroDescription: localizedOrEnglishDefault(
      content.heroDescription,
      english.heroDescription,
      fallback.heroDescription,
      locale,
    ),
    primaryCtaText: localizedOrEnglishDefault(
      content.primaryCtaText,
      english.primaryCtaText,
      fallback.primaryCtaText,
      locale,
    ),
    primaryCtaUrl: content.primaryCtaUrl || fallback.primaryCtaUrl,
    secondaryCtaText: localizedOrEnglishDefault(
      content.secondaryCtaText,
      english.secondaryCtaText,
      fallback.secondaryCtaText,
      locale,
    ),
    secondaryCtaUrl: content.secondaryCtaUrl || fallback.secondaryCtaUrl,
    missionTitle: localizedOrEnglishDefault(
      content.missionTitle,
      english.missionTitle,
      fallback.missionTitle,
      locale,
    ),
    missionHighlight: localizedOrEnglishDefault(
      content.missionHighlight,
      english.missionHighlight,
      fallback.missionHighlight,
      locale,
    ),
    missionText: localizedOrEnglishDefault(content.missionText, english.missionText, fallback.missionText, locale),
    ctaTitle: localizedOrEnglishDefault(content.ctaTitle, english.ctaTitle, fallback.ctaTitle, locale),
    ctaDescription: localizedOrEnglishDefault(
      content.ctaDescription,
      english.ctaDescription,
      fallback.ctaDescription,
      locale,
    ),
    stats: overlayLocalizedHomeStats(normalizeHomeStats(content.stats ?? fallback.stats), locale),
    techCards: overlayLocalizedHomeTechCards(
      normalizeHomeTechCards(content.techCards ?? fallback.techCards),
      locale,
    ),
    sections: overlayLocalizedHomeSections(
      normalizeHomeSections(content.sections ?? fallback.sections),
      locale,
    ),
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
