import { z } from 'zod';
import {
  DONATION_IMPACT_RANGES,
  DONATION_LEDGER,
  DONATION_PAGE,
  DONATION_PILLARS,
  DONATION_STATS,
  DONATION_TIERS,
  DONATION_TRUST_ITEMS,
  DONATION_WALL,
  PATRON_QUICK_CHIPS,
  PATRON_SLIDER_TICKS,
} from '@/lib/constants/donation-page';
import {
  PARTNERSHIP_CATEGORIES,
  PARTNERSHIP_IMPACT,
  PARTNERSHIP_STATS,
  PARTNERSHIP_TIMELINE,
  PARTNERSHIP_VALUES,
} from '@/lib/constants/partnership-page';
import {
  CULTURAL_PORTAL_PAGE,
  CULTURAL_PORTAL_ABOUT,
  CULTURAL_PORTAL_DONORS,
  CULTURAL_PORTAL_MAP,
  CULTURAL_PORTAL_NEWSLETTER,
  CULTURAL_PORTAL_PROJECTS_SECTION,
  CULTURAL_PORTAL_SECTION,
  HOME_PARTNERSHIP_CATEGORIES,
  HOME_PARTNERSHIP_SECTION,
} from '@/lib/constants/cultural-portal-page';
import * as khndzoresk from '@/lib/constants/khndzoresk';
import * as khachaturian from '@/lib/constants/khachaturian-museum';
import * as nga from '@/lib/constants/national-gallery-armenia';

export const PAGE_CONTENT_SLUGS = [
  'donation-page',
  'partnership-page',
  'cultural-portal-page',
  'khndzoresk',
  'khachaturian-museum',
  'national-gallery-armenia',
] as const;

export type PageContentSlug = (typeof PAGE_CONTENT_SLUGS)[number];

export const jsonRecordSchema = z.record(z.unknown());

export type DonationPageContent = {
  metadata: { title: string; description: string };
  page: typeof DONATION_PAGE;
  stats: typeof DONATION_STATS;
  pillars: typeof DONATION_PILLARS;
  tiers: typeof DONATION_TIERS;
  impactRanges: typeof DONATION_IMPACT_RANGES;
  patronSliderTicks: readonly number[];
  patronQuickChips: readonly number[];
  ledger: typeof DONATION_LEDGER;
  wall: typeof DONATION_WALL;
  trustItems: typeof DONATION_TRUST_ITEMS;
};

export type PartnershipPageContent = {
  stats: typeof PARTNERSHIP_STATS;
  impact: typeof PARTNERSHIP_IMPACT;
  categories: typeof PARTNERSHIP_CATEGORIES;
  timeline: typeof PARTNERSHIP_TIMELINE;
  values: typeof PARTNERSHIP_VALUES;
};

export type CulturalPortalPageContent = typeof CULTURAL_PORTAL_PAGE & {
  CULTURAL_PORTAL_SECTION: typeof CULTURAL_PORTAL_SECTION;
  CULTURAL_PORTAL_MAP: typeof CULTURAL_PORTAL_MAP;
  CULTURAL_PORTAL_PROJECTS_SECTION: typeof CULTURAL_PORTAL_PROJECTS_SECTION;
  CULTURAL_PORTAL_DONORS: typeof CULTURAL_PORTAL_DONORS;
  CULTURAL_PORTAL_ABOUT: typeof CULTURAL_PORTAL_ABOUT;
  CULTURAL_PORTAL_NEWSLETTER: typeof CULTURAL_PORTAL_NEWSLETTER;
  HOME_PARTNERSHIP_SECTION: typeof HOME_PARTNERSHIP_SECTION;
  HOME_PARTNERSHIP_CATEGORIES: typeof HOME_PARTNERSHIP_CATEGORIES;
};

export type KhndzoreskPageContent = {
  imgBase: string;
  stats: typeof khndzoresk.KHNDZORESK_STATS;
  facts: typeof khndzoresk.KHNDZORESK_FACTS;
  sites: typeof khndzoresk.KHNDZORESK_SITES;
  tours: typeof khndzoresk.KHNDZORESK_TOURS;
  gallery: typeof khndzoresk.KHNDZORESK_GALLERY;
  restorations: typeof khndzoresk.KHNDZORESK_RESTORATIONS;
  related: typeof khndzoresk.KHNDZORESK_RELATED;
  particles: typeof khndzoresk.KHNDZORESK_PARTICLES;
};

export type KhachaturianPageContent = {
  imgBase: string;
  stats: typeof khachaturian.KHACHATURIAN_STATS;
  facts: typeof khachaturian.KHACHATURIAN_FACTS;
  highlights: typeof khachaturian.KHACHATURIAN_HIGHLIGHTS;
  works: typeof khachaturian.KHACHATURIAN_WORKS;
  gallery: typeof khachaturian.KHACHATURIAN_GALLERY;
  audioTracks: typeof khachaturian.KHACHATURIAN_AUDIO_TRACKS;
  related: typeof khachaturian.KHACHATURIAN_RELATED;
};

export type NationalGalleryPageContent = {
  imgBase: string;
  stats: typeof nga.NGA_STATS;
  facts: typeof nga.NGA_FACTS;
  collections: typeof nga.NGA_COLLECTIONS;
  gallery: typeof nga.NGA_GALLERY;
  artists: typeof nga.NGA_ARTISTS;
  exhibitions: typeof nga.NGA_EXHIBITIONS;
  tickets: typeof nga.NGA_TICKETS;
  related: typeof nga.NGA_RELATED;
};

export function buildDefaultDonationPageContent(): DonationPageContent {
  return {
    metadata: { ...DONATION_PAGE.metadata },
    page: structuredClone(DONATION_PAGE),
    stats: [...DONATION_STATS],
    pillars: [...DONATION_PILLARS],
    tiers: structuredClone(DONATION_TIERS),
    impactRanges: [...DONATION_IMPACT_RANGES],
    patronSliderTicks: [...PATRON_SLIDER_TICKS],
    patronQuickChips: [...PATRON_QUICK_CHIPS],
    ledger: [...DONATION_LEDGER],
    wall: [...DONATION_WALL],
    trustItems: [...DONATION_TRUST_ITEMS],
  };
}

export function buildDefaultPartnershipPageContent(): PartnershipPageContent {
  return {
    stats: [...PARTNERSHIP_STATS],
    impact: [...PARTNERSHIP_IMPACT],
    categories: structuredClone(PARTNERSHIP_CATEGORIES),
    timeline: [...PARTNERSHIP_TIMELINE],
    values: [...PARTNERSHIP_VALUES],
  };
}

export function buildDefaultCulturalPortalPageContent(): CulturalPortalPageContent {
  return {
    ...structuredClone(CULTURAL_PORTAL_PAGE),
    CULTURAL_PORTAL_SECTION: structuredClone(CULTURAL_PORTAL_SECTION),
    CULTURAL_PORTAL_MAP: structuredClone(CULTURAL_PORTAL_MAP),
    CULTURAL_PORTAL_PROJECTS_SECTION: structuredClone(CULTURAL_PORTAL_PROJECTS_SECTION),
    CULTURAL_PORTAL_DONORS: structuredClone(CULTURAL_PORTAL_DONORS),
    CULTURAL_PORTAL_ABOUT: structuredClone(CULTURAL_PORTAL_ABOUT),
    CULTURAL_PORTAL_NEWSLETTER: structuredClone(CULTURAL_PORTAL_NEWSLETTER),
    HOME_PARTNERSHIP_SECTION: structuredClone(HOME_PARTNERSHIP_SECTION),
    HOME_PARTNERSHIP_CATEGORIES: structuredClone(HOME_PARTNERSHIP_CATEGORIES),
  };
}

export function buildDefaultKhndzoreskContent(): KhndzoreskPageContent {
  return {
    imgBase: khndzoresk.KHNDZORESK_IMG_BASE,
    stats: [...khndzoresk.KHNDZORESK_STATS],
    facts: [...khndzoresk.KHNDZORESK_FACTS],
    sites: [...khndzoresk.KHNDZORESK_SITES],
    tours: structuredClone(khndzoresk.KHNDZORESK_TOURS),
    gallery: structuredClone(khndzoresk.KHNDZORESK_GALLERY),
    restorations: [...khndzoresk.KHNDZORESK_RESTORATIONS],
    related: [...khndzoresk.KHNDZORESK_RELATED],
    particles: [...khndzoresk.KHNDZORESK_PARTICLES],
  };
}

export function buildDefaultKhachaturianContent(): KhachaturianPageContent {
  return {
    imgBase: khachaturian.KHACHATURIAN_IMG_BASE,
    stats: [...khachaturian.KHACHATURIAN_STATS],
    facts: [...khachaturian.KHACHATURIAN_FACTS],
    highlights: [...khachaturian.KHACHATURIAN_HIGHLIGHTS],
    works: [...khachaturian.KHACHATURIAN_WORKS],
    gallery: [...khachaturian.KHACHATURIAN_GALLERY],
    audioTracks: [...khachaturian.KHACHATURIAN_AUDIO_TRACKS],
    related: [...khachaturian.KHACHATURIAN_RELATED],
  };
}

export function buildDefaultNationalGalleryContent(): NationalGalleryPageContent {
  return {
    imgBase: nga.NGA_IMG_BASE,
    stats: [...nga.NGA_STATS],
    facts: [...nga.NGA_FACTS],
    collections: [...nga.NGA_COLLECTIONS],
    gallery: [...nga.NGA_GALLERY],
    artists: [...nga.NGA_ARTISTS],
    exhibitions: [...nga.NGA_EXHIBITIONS],
    tickets: [...nga.NGA_TICKETS],
    related: [...nga.NGA_RELATED],
  };
}

export function getDefaultPageContent(slug: PageContentSlug): Record<string, unknown> {
  switch (slug) {
    case 'donation-page':
      return buildDefaultDonationPageContent() as unknown as Record<string, unknown>;
    case 'partnership-page':
      return buildDefaultPartnershipPageContent() as unknown as Record<string, unknown>;
    case 'cultural-portal-page':
      return buildDefaultCulturalPortalPageContent() as unknown as Record<string, unknown>;
    case 'khndzoresk':
      return buildDefaultKhndzoreskContent() as unknown as Record<string, unknown>;
    case 'khachaturian-museum':
      return buildDefaultKhachaturianContent() as unknown as Record<string, unknown>;
    case 'national-gallery-armenia':
      return buildDefaultNationalGalleryContent() as unknown as Record<string, unknown>;
    default:
      return {};
  }
}

export const PAGE_CONTENT_DESCRIPTIONS: Record<PageContentSlug, string> = {
  'donation-page': 'Donation tiers, impact stories, and payment call-to-action copy.',
  'partnership-page': 'Partner benefits, categories, and contact prompts.',
  'cultural-portal-page': 'Portal intro, feature cards, and navigation labels.',
  khndzoresk: 'Khndzoresk landing — hero, gallery, tours, and restoration sections.',
  'khachaturian-museum': 'Museum landing — exhibitions, audio guides, and highlights.',
  'national-gallery-armenia': 'Gallery landing — collections, facts, and related links.',
};

export const PAGE_CONTENT_TITLES: Record<PageContentSlug, string> = {
  'donation-page': 'Donation page',
  'partnership-page': 'Partnership page',
  'cultural-portal-page': 'Cultural portal page',
  khndzoresk: 'Khndzoresk landing',
  'khachaturian-museum': 'Khachaturian Museum landing',
  'national-gallery-armenia': 'National Gallery landing',
};

export function parseDonationPageContent(value: unknown): DonationPageContent {
  if (typeof value === 'object' && value !== null) {
    return value as DonationPageContent;
  }
  return buildDefaultDonationPageContent();
}

export function parsePartnershipPageContent(value: unknown): PartnershipPageContent {
  if (typeof value === 'object' && value !== null) {
    return value as PartnershipPageContent;
  }
  return buildDefaultPartnershipPageContent();
}

export function parseCulturalPortalPageContent(value: unknown): CulturalPortalPageContent {
  if (typeof value === 'object' && value !== null) {
    return value as CulturalPortalPageContent;
  }
  return buildDefaultCulturalPortalPageContent();
}

export function parseKhndzoreskPageContent(value: unknown): KhndzoreskPageContent {
  if (typeof value === 'object' && value !== null) {
    return value as KhndzoreskPageContent;
  }
  return buildDefaultKhndzoreskContent();
}

export function parseKhachaturianPageContent(value: unknown): KhachaturianPageContent {
  if (typeof value === 'object' && value !== null) {
    return value as KhachaturianPageContent;
  }
  return buildDefaultKhachaturianContent();
}

export function parseNationalGalleryPageContent(value: unknown): NationalGalleryPageContent {
  if (typeof value === 'object' && value !== null) {
    return value as NationalGalleryPageContent;
  }
  return buildDefaultNationalGalleryContent();
}
