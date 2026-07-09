/**
 * Public-facing DTO mappers.
 *
 * Strip every admin-only field (`adminNote`, `passwordHash`, internal counts) from
 * Prisma rows before serializing them to anything reachable by an unauthenticated
 * client. Every public route handler must use these mappers.
 */
import { normalizeAboutPillars, type AboutPillar } from '@/lib/types/about-content';
import {
  normalizeHomeStats,
  normalizeHomeTechCards,
  type HomeStat,
  type HomeTechCard,
} from '@/lib/types/home-content';
import { normalizeHomeSections, type HomeSections } from '@/lib/types/home-sections';
import { parseEnabledLocales, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { resolveLocalizedText } from '@/lib/i18n/translatable-content';
import type {
  Career,
  BlogPost,
  ContactMessage,
  CultureItem,
  CultureMenuItem,
  Donator,
  AboutContent,
  HomeContent,
  Project,
  SiteSettings,
  Submission,
  TeamMember,
} from '@prisma/client';

export interface PublicCultureMenuItemDTO {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  catalogContent: unknown | null;
  routeType: CultureMenuItem['routeType'];
  customUrl: string | null;
  order: number;
  parentId: string | null;
  isActive: boolean;
}

export interface PublicCultureItemDTO {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  menuItemId: string;
  region: string | null;
  locationName: string | null;
  periodLabel: string | null;
  yearLabel: string | null;
  century: number | null;
  image: string | null;
  cardBackgroundColor: string | null;
  cardBackgroundImage: string | null;
  galleryImages: string[];
  tourUrl: string | null;
  videoUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  mapType: CultureItem['mapType'];
  showOnMap: boolean;
  itemType: CultureItem['itemType'];
  order: number;
}

export interface CultureItemMenuBreadcrumb {
  id: string;
  title: string;
  slug: string;
}

export interface PublicCultureItemDetailDTO extends PublicCultureItemDTO {
  menuItem: (CultureItemMenuBreadcrumb & { parent: CultureItemMenuBreadcrumb | null }) | null;
}

export interface PublicProjectDTO {
  id: string;
  title: string;
  slug: string;
  category: string;
  region: string | null;
  description: string | null;
  image: string | null;
  goalAmount: number;
  raisedAmount: number;
  status: Project['status'];
  order: number;
}

export interface PublicTeamMemberDTO {
  id: string;
  name: string;
  initials: string;
  position: string;
  bio: string | null;
  image: string | null;
  order: number;
}

export interface PublicCareerDTO {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  description: string | null;
  applyUrl: string | null;
  applyEmail: string | null;
  order: number;
}

export interface PublicBlogPostDTO {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  publishedAt: string;
  order: number;
}

export type PublicBlogPostDetailDTO = PublicBlogPostDTO;

export interface PublicDonatorDTO {
  id: string;
  name: string;
  type: string;
  year: number | null;
  description: string | null;
  order: number;
}

export type PublicSiteSettingsDTO = Omit<SiteSettings, 'id' | 'updatedAt' | 'enabledLocales'> & {
  enabledLocales: SiteLocaleCode[];
};

export type PublicHomeContentDTO = Omit<
  HomeContent,
  'id' | 'updatedAt' | 'stats' | 'techCards' | 'sections'
> & {
  stats: HomeStat[];
  techCards: HomeTechCard[];
  sections: HomeSections;
};
export type PublicAboutContentDTO = Omit<AboutContent, 'id' | 'createdAt' | 'updatedAt' | 'pillars'> & {
  pillars: AboutPillar[];
};

export function toPublicMenuItem(
  row: CultureMenuItem,
  locale: SiteLocaleCode = 'EN',
): PublicCultureMenuItemDTO {
  return {
    id: row.id,
    title: resolveLocalizedText(row.title, locale),
    slug: row.slug,
    description: resolveLocalizedText(row.description, locale) || null,
    image: row.image,
    catalogContent: row.catalogContent ?? null,
    routeType: row.routeType,
    customUrl: row.customUrl,
    order: row.order,
    parentId: row.parentId,
    isActive: row.isActive,
  };
}

export function toPublicCultureItem(
  row: CultureItem,
  locale: SiteLocaleCode = 'EN',
): PublicCultureItemDTO {
  return {
    id: row.id,
    title: resolveLocalizedText(row.title, locale),
    slug: row.slug,
    description: resolveLocalizedText(row.description, locale) || null,
    shortDescription: resolveLocalizedText(row.shortDescription, locale) || null,
    menuItemId: row.menuItemId,
    region: row.region,
    locationName: row.locationName,
    periodLabel: row.periodLabel,
    yearLabel: row.yearLabel,
    century: row.century,
    image: row.image,
    cardBackgroundColor: row.cardBackgroundColor,
    cardBackgroundImage: row.cardBackgroundImage,
    galleryImages: row.galleryImages ?? [],
    tourUrl: row.tourUrl,
    videoUrl: row.videoUrl,
    latitude: row.latitude,
    longitude: row.longitude,
    mapType: row.mapType,
    showOnMap: row.showOnMap,
    itemType: row.itemType,
    order: row.order,
  };
}

type CultureItemWithMenu = CultureItem & {
  menuItem: CultureMenuItem & { parent: CultureMenuItem | null };
};

export function toPublicCultureItemDetail(
  row: CultureItemWithMenu,
  locale: SiteLocaleCode = 'EN',
): PublicCultureItemDetailDTO {
  return {
    ...toPublicCultureItem(row, locale),
    menuItem: {
      id: row.menuItem.id,
      title: resolveLocalizedText(row.menuItem.title, locale),
      slug: row.menuItem.slug,
      parent: row.menuItem.parent
        ? {
            id: row.menuItem.parent.id,
            title: resolveLocalizedText(row.menuItem.parent.title, locale),
            slug: row.menuItem.parent.slug,
          }
        : null,
    },
  };
}

export function toPublicProject(
  row: Project,
  locale: SiteLocaleCode = 'EN',
): PublicProjectDTO {
  return {
    id: row.id,
    title: resolveLocalizedText(row.title, locale),
    slug: row.slug,
    category: resolveLocalizedText(row.category, locale),
    region: resolveLocalizedText(row.region, locale) || null,
    description: resolveLocalizedText(row.description, locale) || null,
    image: row.image,
    goalAmount: row.goalAmount,
    raisedAmount: row.raisedAmount,
    status: row.status,
    order: row.order,
  };
}

export function toPublicTeamMember(
  row: TeamMember,
  locale: SiteLocaleCode = 'EN',
): PublicTeamMemberDTO {
  return {
    id: row.id,
    name: resolveLocalizedText(row.name, locale),
    initials: row.initials,
    position: resolveLocalizedText(row.position, locale),
    bio: resolveLocalizedText(row.bio, locale) || null,
    image: row.image,
    order: row.order,
  };
}

export function toPublicCareer(
  row: Career,
  locale: SiteLocaleCode = 'EN',
): PublicCareerDTO {
  return {
    id: row.id,
    title: resolveLocalizedText(row.title, locale),
    location: resolveLocalizedText(row.location, locale),
    employmentType: resolveLocalizedText(row.employmentType, locale),
    description: resolveLocalizedText(row.description, locale) || null,
    applyUrl: row.applyUrl,
    applyEmail: row.applyEmail,
    order: row.order,
  };
}

export function toPublicBlogPost(
  row: BlogPost,
  locale: SiteLocaleCode = 'EN',
): PublicBlogPostDTO {
  return {
    id: row.id,
    title: resolveLocalizedText(row.title, locale),
    slug: row.slug,
    content: resolveLocalizedText(row.content, locale),
    image: row.image,
    publishedAt: row.publishedAt.toISOString(),
    order: row.order,
  };
}

export function toPublicBlogPostDetail(
  row: BlogPost,
  locale: SiteLocaleCode = 'EN',
): PublicBlogPostDetailDTO {
  return toPublicBlogPost(row, locale);
}

export function toPublicDonator(
  row: Donator,
  locale: SiteLocaleCode = 'EN',
): PublicDonatorDTO {
  return {
    id: row.id,
    name: resolveLocalizedText(row.name, locale),
    type: resolveLocalizedText(row.type, locale),
    year: row.year,
    description: resolveLocalizedText(row.description, locale) || null,
    order: row.order,
  };
}

export function toPublicSiteSettings(row: SiteSettings): PublicSiteSettingsDTO {
  const { id: _id, updatedAt: _u, enabledLocales, ...rest } = row;
  return {
    ...rest,
    enabledLocales: parseEnabledLocales(enabledLocales),
  };
}

export function toPublicHomeContent(
  row: HomeContent,
  locale: SiteLocaleCode = 'EN',
): PublicHomeContentDTO {
  const { id: _id, updatedAt: _u, stats, techCards, sections, ...rest } = row;
  return {
    ...rest,
    heroBadge: resolveLocalizedText(row.heroBadge, locale),
    heroTitle: resolveLocalizedText(row.heroTitle, locale),
    heroHighlight: resolveLocalizedText(row.heroHighlight, locale),
    heroSubtitle: resolveLocalizedText(row.heroSubtitle, locale),
    heroTagline: resolveLocalizedText(row.heroTagline, locale),
    heroDescription: resolveLocalizedText(row.heroDescription, locale),
    primaryCtaText: resolveLocalizedText(row.primaryCtaText, locale),
    primaryCtaUrl: row.primaryCtaUrl,
    secondaryCtaText: resolveLocalizedText(row.secondaryCtaText, locale),
    secondaryCtaUrl: row.secondaryCtaUrl,
    missionTitle: resolveLocalizedText(row.missionTitle, locale),
    missionHighlight: resolveLocalizedText(row.missionHighlight, locale),
    missionText: resolveLocalizedText(row.missionText, locale),
    ctaTitle: resolveLocalizedText(row.ctaTitle, locale),
    ctaDescription: resolveLocalizedText(row.ctaDescription, locale),
    stats: normalizeHomeStats(stats),
    techCards: normalizeHomeTechCards(techCards),
    sections: normalizeHomeSections(sections),
  };
}

export function toPublicAboutContent(
  row: AboutContent,
  locale: SiteLocaleCode = 'EN',
): PublicAboutContentDTO {
  const { id: _id, createdAt: _c, updatedAt: _u, pillars, ...rest } = row;
  return {
    ...rest,
    heroEyebrow: resolveLocalizedText(row.heroEyebrow, locale),
    heroTitle: resolveLocalizedText(row.heroTitle, locale),
    heroDescription: resolveLocalizedText(row.heroDescription, locale),
    missionEyebrow: resolveLocalizedText(row.missionEyebrow, locale),
    missionTitle: resolveLocalizedText(row.missionTitle, locale),
    missionIntro: resolveLocalizedText(row.missionIntro, locale),
    whyNowHeading: resolveLocalizedText(row.whyNowHeading, locale),
    whyNowBody: resolveLocalizedText(row.whyNowBody, locale),
    howWeWorkHeading: resolveLocalizedText(row.howWeWorkHeading, locale),
    howWeWorkBody: resolveLocalizedText(row.howWeWorkBody, locale),
    teamEyebrow: resolveLocalizedText(row.teamEyebrow, locale),
    teamTitle: resolveLocalizedText(row.teamTitle, locale),
    teamIntro: resolveLocalizedText(row.teamIntro, locale),
    careerEyebrow: resolveLocalizedText(row.careerEyebrow, locale),
    careerTitle: resolveLocalizedText(row.careerTitle, locale),
    careerIntro: resolveLocalizedText(row.careerIntro, locale),
    pillars: normalizeAboutPillars(pillars),
  };
}

export function toAdminSubmissionView(row: Submission): Submission {
  return row;
}

export function toAdminContactView(row: ContactMessage): ContactMessage {
  return row;
}
