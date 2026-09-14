import { VIRTUAL_MUSEUM_ICON_SOURCES } from '@/lib/constants/virtual-museum-icon-sources';
import type { HomeStat, HomeTechCard } from '@/lib/types/home-content';
import type { HomeSections } from '@/lib/types/home-sections';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

export function localizedHomeStats(locale: SiteLocaleCode): HomeStat[] {
  return [
    { value: '3,000+', label: uiMessage(locale, 'statYearsOfHistory') },
    { value: '850+', label: uiMessage(locale, 'statHeritageSites') },
    { value: '12,000+', label: uiMessage(locale, 'statArtefactsDocumented') },
    { value: '47', label: uiMessage(locale, 'statPartnerInstitutions') },
  ];
}

export function localizedHomeTechCards(locale: SiteLocaleCode): HomeTechCard[] {
  return [
    {
      title: uiMessage(locale, 'techMatterportTitle'),
      description: uiMessage(locale, 'techMatterportDescription'),
      icon: 'ScanEye',
    },
    {
      title: uiMessage(locale, 'techDroneTitle'),
      description: uiMessage(locale, 'techDroneDescription'),
      icon: 'Drone',
    },
    {
      title: uiMessage(locale, 'techAiTitle'),
      description: uiMessage(locale, 'techAiDescription'),
      icon: 'AudioLines',
    },
  ];
}

function museumIcon(icon: 'tours' | 'artefacts' | 'galleries' | 'events') {
  const source = VIRTUAL_MUSEUM_ICON_SOURCES[icon];
  return { iconSrc: source.iconSrc, sourceHref: source.sourceHref };
}

export function localizedHomeSections(locale: SiteLocaleCode): HomeSections {
  return {
    virtualMuseum: {
      badge: uiMessage(locale, 'virtualMuseumBadge'),
      eyebrow: uiMessage(locale, 'virtualMuseumEyebrow'),
      title: uiMessage(locale, 'virtualMuseumTitle'),
      description: uiMessage(locale, 'virtualMuseumDescription'),
      ctaText: uiMessage(locale, 'enterVirtualMuseum'),
      ctaUrl: '/virtual-museum',
      features: [
        {
          number: '01',
          icon: 'tours',
          ...museumIcon('tours'),
          badge: uiMessage(locale, 'betaAccess'),
          badgeTone: 'teal',
          title: uiMessage(locale, 'virtualTours360Title'),
          description: uiMessage(locale, 'virtualTours360Description'),
        },
        {
          number: '02',
          icon: 'artefacts',
          ...museumIcon('artefacts'),
          badge: uiMessage(locale, 'comingQ3'),
          badgeTone: 'gold',
          title: uiMessage(locale, 'artefactExplorer3dTitle'),
          description: uiMessage(locale, 'artefactExplorer3dDescription'),
        },
        {
          number: '03',
          icon: 'galleries',
          ...museumIcon('galleries'),
          badge: uiMessage(locale, 'comingQ4'),
          badgeTone: 'gold',
          title: uiMessage(locale, 'immersiveGalleriesTitle'),
          description: uiMessage(locale, 'immersiveGalleriesDescription'),
        },
        {
          number: '04',
          icon: 'events',
          ...museumIcon('events'),
          badge: uiMessage(locale, 'live'),
          badgeTone: 'teal',
          title: uiMessage(locale, 'liveHeritageEventsTitle'),
          description: uiMessage(locale, 'liveHeritageEventsDescription'),
        },
      ],
    },
    culturalPortal: {
      eyebrow: uiMessage(locale, 'culturalPortalEyebrow'),
      title: uiMessage(locale, 'culturalPortalTitle'),
      description: uiMessage(locale, 'culturalPortalDescription'),
    },
    featuredTreasures: {
      eyebrow: uiMessage(locale, 'featuredTreasuresEyebrow'),
      title: uiMessage(locale, 'featuredTreasuresTitle'),
    },
    heritageMap: {
      eyebrow: uiMessage(locale, 'heritageMapEyebrow'),
      title: uiMessage(locale, 'heritageMapTitle'),
      description: uiMessage(locale, 'heritageMapDescription'),
      placeholderTitle: uiMessage(locale, 'heritageMapEyebrow'),
      placeholderSubtitle: uiMessage(locale, 'heritageMapPlaceholderSubtitle'),
      ctaUrl: '/map',
      legend: [
        { label: uiMessage(locale, 'filterReligious'), color: '#27C6C8' },
        { label: uiMessage(locale, 'filterMonuments'), color: '#D6B85A' },
        { label: uiMessage(locale, 'filterMuseums'), color: '#9B7BD4' },
        { label: uiMessage(locale, 'legendNaturalHeritage'), color: '#D6855A' },
        { label: uiMessage(locale, 'legendArchaeologicalSites'), color: '#6BB578' },
      ],
    },
    upcomingProjects: {
      eyebrow: uiMessage(locale, 'upcomingProjectsEyebrow'),
      title: uiMessage(locale, 'upcomingProjectsTitle'),
      description: uiMessage(locale, 'upcomingProjectsDescription'),
    },
    partnership: {
      eyebrow: uiMessage(locale, 'partnershipEyebrow'),
      title: uiMessage(locale, 'partnershipTitle'),
      description: uiMessage(locale, 'partnershipDescription'),
      ctaLabel: uiMessage(locale, 'applyForPartnership'),
      ctaUrl: '/partnership',
      categories: [
        { title: uiMessage(locale, 'partnerMuseums'), icon: 'museums' },
        { title: uiMessage(locale, 'partnerUniversities'), icon: 'universities' },
        { title: uiMessage(locale, 'partnerUnesco'), icon: 'unesco' },
        { title: uiMessage(locale, 'partnerCulturalNgos'), icon: 'culturalNgos' },
        { title: uiMessage(locale, 'partnerMedia'), icon: 'mediaPartners' },
        { title: uiMessage(locale, 'partnerTechnology'), icon: 'technology' },
        { title: uiMessage(locale, 'partnerGovernments'), icon: 'governments' },
        {
          title: uiMessage(locale, 'partnerBecome'),
          icon: 'becomePartner',
          variant: 'cta',
          href: '/partnership',
        },
      ],
    },
    donations: {
      eyebrow: uiMessage(locale, 'donationsEyebrow'),
      title: uiMessage(locale, 'donationsTitle'),
      description: uiMessage(locale, 'donationsDescription'),
      ctaLabel: uiMessage(locale, 'supportMission').toUpperCase(),
      ctaUrl: '/donate',
    },
    aboutUs: {
      eyebrow: uiMessage(locale, 'aboutUsEyebrow'),
      title: uiMessage(locale, 'aboutUsTitle'),
      description: uiMessage(locale, 'aboutUsDescription'),
      cards: [
        {
          title: uiMessage(locale, 'aboutCardMissionTitle'),
          description: uiMessage(locale, 'aboutCardMissionDescription'),
          href: '/about/mission',
          icon: 'mission',
          cardBackgroundColor: null,
          cardBackgroundImage: null,
        },
        {
          title: uiMessage(locale, 'aboutCardTeamTitle'),
          description: uiMessage(locale, 'aboutCardTeamDescription'),
          href: '/about/team',
          icon: 'team',
          cardBackgroundColor: null,
          cardBackgroundImage: null,
        },
        {
          title: uiMessage(locale, 'aboutCardCareerTitle'),
          description: uiMessage(locale, 'aboutCardCareerDescription'),
          href: '/about/career',
          icon: 'career',
          cardBackgroundColor: null,
          cardBackgroundImage: null,
        },
        {
          title: uiMessage(locale, 'aboutCardContactTitle'),
          description: uiMessage(locale, 'aboutCardContactDescription'),
          href: '/contacts',
          icon: 'contact',
          cardBackgroundColor: null,
          cardBackgroundImage: null,
        },
      ],
    },
  };
}

export function fillIfEmpty(value: string, fallback: string): string {
  return value.trim() ? value : fallback;
}

/** Prefer admin locale copy; if missing or still the English default, use our translation. */
export function localizedOrEnglishDefault(
  value: string,
  englishDefault: string,
  localized: string,
  locale: SiteLocaleCode,
): string {
  const trimmed = value.trim();
  if (locale === 'EN') return trimmed || englishDefault;
  if (!trimmed || trimmed === englishDefault.trim()) return localized;
  return trimmed;
}

/** Keep stored structure (urls, images, icons) while translating default English copy. */
export function overlayLocalizedHomeSections(
  stored: HomeSections,
  locale: SiteLocaleCode,
): HomeSections {
  if (locale === 'EN') return stored;
  const localized = localizedHomeSections(locale);
  return {
    virtualMuseum: {
      ...stored.virtualMuseum,
      badge: localized.virtualMuseum.badge,
      eyebrow: localized.virtualMuseum.eyebrow,
      title: localized.virtualMuseum.title,
      description: localized.virtualMuseum.description,
      ctaText: localized.virtualMuseum.ctaText,
      features: stored.virtualMuseum.features.map((feature, index) => ({
        ...feature,
        badge: localized.virtualMuseum.features[index]?.badge ?? feature.badge,
        title: localized.virtualMuseum.features[index]?.title ?? feature.title,
        description: localized.virtualMuseum.features[index]?.description ?? feature.description,
      })),
    },
    culturalPortal: { ...stored.culturalPortal, ...localized.culturalPortal },
    featuredTreasures: { ...stored.featuredTreasures, ...localized.featuredTreasures },
    heritageMap: {
      ...stored.heritageMap,
      eyebrow: localized.heritageMap.eyebrow,
      title: localized.heritageMap.title,
      description: localized.heritageMap.description,
      placeholderTitle: localized.heritageMap.placeholderTitle,
      placeholderSubtitle: localized.heritageMap.placeholderSubtitle,
      legend: stored.heritageMap.legend.map((item, index) => ({
        ...item,
        label: localized.heritageMap.legend[index]?.label ?? item.label,
      })),
    },
    upcomingProjects: { ...stored.upcomingProjects, ...localized.upcomingProjects },
    partnership: {
      ...stored.partnership,
      eyebrow: localized.partnership.eyebrow,
      title: localized.partnership.title,
      description: localized.partnership.description,
      ctaLabel: localized.partnership.ctaLabel,
      categories: stored.partnership.categories.map((category, index) => ({
        ...category,
        title: localized.partnership.categories[index]?.title ?? category.title,
      })),
    },
    donations: {
      ...stored.donations,
      eyebrow: localized.donations.eyebrow,
      title: localized.donations.title,
      description: localized.donations.description,
      ctaLabel: localized.donations.ctaLabel,
    },
    aboutUs: {
      ...stored.aboutUs,
      eyebrow: localized.aboutUs.eyebrow,
      title: localized.aboutUs.title,
      description: localized.aboutUs.description,
      cards: stored.aboutUs.cards.map((card, index) => ({
        ...card,
        title: localized.aboutUs.cards[index]?.title ?? card.title,
        description: localized.aboutUs.cards[index]?.description ?? card.description,
      })),
    },
  };
}

export function overlayLocalizedHomeStats(stats: HomeStat[], locale: SiteLocaleCode): HomeStat[] {
  if (locale === 'EN') return stats;
  const labels = localizedHomeStats(locale);
  return stats.map((stat, index) => ({
    ...stat,
    label: labels[index]?.label ?? stat.label,
  }));
}

export function overlayLocalizedHomeTechCards(
  cards: HomeTechCard[],
  locale: SiteLocaleCode,
): HomeTechCard[] {
  if (locale === 'EN') return cards;
  const localized = localizedHomeTechCards(locale);
  return cards.map((card, index) => ({
    ...card,
    title: localized[index]?.title ?? card.title,
    description: localized[index]?.description ?? card.description,
  }));
}
