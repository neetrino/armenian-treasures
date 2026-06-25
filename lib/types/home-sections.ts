import { z } from 'zod';
import { CULTURAL_PORTAL_SECTION } from '@/lib/constants/cultural-portal';
import { FEATURED_TREASURES_SECTION } from '@/lib/constants/featured-treasures';
import { HERITAGE_MAP_LEGEND, HERITAGE_MAP_SECTION } from '@/lib/constants/heritage-map-section';
import {
  HOME_ABOUT_CARDS,
  HOME_ABOUT_SECTION,
  type HomeAboutCard,
} from '@/lib/constants/home-about-section';
import { HOME_DONATIONS_SECTION } from '@/lib/constants/home-donations-section';
import { HOME_NEWSLETTER_SECTION } from '@/lib/constants/home-newsletter-section';
import {
  HOME_PARTNERSHIP_CATEGORIES,
  HOME_PARTNERSHIP_SECTION,
  type PartnershipCategory,
} from '@/lib/constants/home-partnership-section';
import { UPCOMING_PROJECTS_SECTION } from '@/lib/constants/upcoming-projects';
import {
  VIRTUAL_MUSEUM_SECTION,
  type VirtualMuseumFeature,
} from '@/lib/constants/virtual-museum';

const sectionHeaderSchema = z.object({
  eyebrow: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2000),
});

const virtualMuseumFeatureSchema = z.object({
  number: z.string().trim().min(1).max(8),
  icon: z.enum(['tours', 'artefacts', 'galleries', 'events']),
  iconSrc: z.string().trim().min(1).max(300),
  sourceHref: z.string().trim().min(1).max(300),
  badge: z.string().trim().min(1).max(80),
  badgeTone: z.enum(['teal', 'gold']),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(1000),
});

const homeAboutCardSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(500),
  href: z.string().trim().min(1).max(200),
  icon: z.enum(['mission', 'team', 'career', 'contact']),
});

const partnershipCategorySchema = z.object({
  title: z.string().trim().min(1).max(120),
  icon: z.enum([
    'museums',
    'universities',
    'unesco',
    'culturalNgos',
    'mediaPartners',
    'technology',
    'governments',
    'becomePartner',
  ]),
  variant: z.enum(['default', 'cta']).optional(),
  href: z.string().trim().max(200).optional(),
});

const heritageMapLegendSchema = z.object({
  label: z.string().trim().min(1).max(80),
  color: z.string().trim().min(1).max(20),
});

export const homeSectionsSchema = z.object({
  virtualMuseum: sectionHeaderSchema.extend({
    badge: z.string().trim().min(1).max(80),
    ctaText: z.string().trim().min(1).max(80),
    ctaUrl: z.string().trim().min(1).max(200),
    features: z.array(virtualMuseumFeatureSchema).min(1).max(8),
  }),
  culturalPortal: sectionHeaderSchema,
  featuredTreasures: z.object({
    eyebrow: z.string().trim().min(1).max(80),
    title: z.string().trim().min(1).max(200),
  }),
  heritageMap: sectionHeaderSchema.extend({
    placeholderTitle: z.string().trim().min(1).max(120),
    placeholderSubtitle: z.string().trim().min(1).max(300),
    ctaUrl: z.string().trim().min(1).max(200),
    legend: z.array(heritageMapLegendSchema).min(1).max(12),
  }),
  upcomingProjects: sectionHeaderSchema,
  partnership: sectionHeaderSchema.extend({
    ctaLabel: z.string().trim().min(1).max(80),
    ctaUrl: z.string().trim().min(1).max(200),
    categories: z.array(partnershipCategorySchema).min(1).max(12),
  }),
  donations: sectionHeaderSchema.extend({
    ctaLabel: z.string().trim().min(1).max(80),
    ctaUrl: z.string().trim().min(1).max(200),
  }),
  aboutUs: sectionHeaderSchema.extend({
    cards: z.array(homeAboutCardSchema).min(1).max(8),
  }),
  newsletter: z.object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(500),
    placeholder: z.string().trim().min(1).max(120),
    submitLabel: z.string().trim().min(1).max(80),
  }),
});

export type HomeSections = z.infer<typeof homeSectionsSchema>;

export function buildDefaultHomeSections(): HomeSections {
  return {
    virtualMuseum: {
      badge: VIRTUAL_MUSEUM_SECTION.badge,
      eyebrow: VIRTUAL_MUSEUM_SECTION.eyebrow,
      title: VIRTUAL_MUSEUM_SECTION.title,
      description: VIRTUAL_MUSEUM_SECTION.description,
      ctaText: VIRTUAL_MUSEUM_SECTION.ctaText,
      ctaUrl: VIRTUAL_MUSEUM_SECTION.ctaUrl,
      features: VIRTUAL_MUSEUM_SECTION.features.map((feature) => ({ ...feature })),
    },
    culturalPortal: {
      eyebrow: CULTURAL_PORTAL_SECTION.eyebrow,
      title: CULTURAL_PORTAL_SECTION.title,
      description: CULTURAL_PORTAL_SECTION.description,
    },
    featuredTreasures: {
      eyebrow: FEATURED_TREASURES_SECTION.eyebrow,
      title: FEATURED_TREASURES_SECTION.title,
    },
    heritageMap: {
      eyebrow: HERITAGE_MAP_SECTION.eyebrow,
      title: HERITAGE_MAP_SECTION.title,
      description: HERITAGE_MAP_SECTION.description,
      placeholderTitle: HERITAGE_MAP_SECTION.placeholderTitle,
      placeholderSubtitle: HERITAGE_MAP_SECTION.placeholderSubtitle,
      ctaUrl: HERITAGE_MAP_SECTION.ctaUrl,
      legend: HERITAGE_MAP_LEGEND.map((item) => ({ ...item })),
    },
    upcomingProjects: {
      eyebrow: UPCOMING_PROJECTS_SECTION.eyebrow,
      title: UPCOMING_PROJECTS_SECTION.title,
      description: UPCOMING_PROJECTS_SECTION.description,
    },
    partnership: {
      eyebrow: HOME_PARTNERSHIP_SECTION.eyebrow,
      title: HOME_PARTNERSHIP_SECTION.title,
      description: HOME_PARTNERSHIP_SECTION.description,
      ctaLabel: HOME_PARTNERSHIP_SECTION.ctaLabel,
      ctaUrl: HOME_PARTNERSHIP_SECTION.ctaUrl,
      categories: HOME_PARTNERSHIP_CATEGORIES.map((category) => ({ ...category })),
    },
    donations: {
      eyebrow: HOME_DONATIONS_SECTION.eyebrow,
      title: HOME_DONATIONS_SECTION.title,
      description: HOME_DONATIONS_SECTION.description,
      ctaLabel: HOME_DONATIONS_SECTION.ctaLabel,
      ctaUrl: HOME_DONATIONS_SECTION.ctaUrl,
    },
    aboutUs: {
      eyebrow: HOME_ABOUT_SECTION.eyebrow,
      title: HOME_ABOUT_SECTION.title,
      description: HOME_ABOUT_SECTION.description,
      cards: HOME_ABOUT_CARDS.map((card) => ({ ...card })),
    },
    newsletter: {
      title: HOME_NEWSLETTER_SECTION.title,
      description: HOME_NEWSLETTER_SECTION.description,
      placeholder: HOME_NEWSLETTER_SECTION.placeholder,
      submitLabel: HOME_NEWSLETTER_SECTION.submitLabel,
    },
  };
}

export function normalizeHomeSections(value: unknown): HomeSections {
  const parsed = homeSectionsSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  return buildDefaultHomeSections();
}

export type { HomeAboutCard, PartnershipCategory, VirtualMuseumFeature };
