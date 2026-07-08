import { z } from 'zod';
import {
  PAGE_CONTENT_SLUGS,
  type PageContentSlug,
} from '@/lib/types/page-content';

const optionalHeroImage = z.string().trim().max(500).optional().or(z.literal(''));

const metadataSchema = z.object({
  title: z.string().min(1, 'metadata.title is required'),
  description: z.string(),
});

const donationPageContentSchema = z.object({
  heroImage: optionalHeroImage,
  metadata: metadataSchema,
  page: z.record(z.unknown()),
  stats: z.array(z.unknown()),
  pillars: z.array(z.unknown()),
  tiers: z.array(z.unknown()),
  impactRanges: z.array(z.unknown()),
  patronSliderTicks: z.array(z.number()),
  patronQuickChips: z.array(z.number()),
  ledger: z.array(z.unknown()),
  wall: z.array(z.unknown()),
  trustItems: z.array(z.unknown()),
});

const partnershipPageContentSchema = z.object({
  heroImage: optionalHeroImage,
  stats: z.array(z.unknown()),
  categories: z.array(z.unknown()),
});

const culturalPortalPageContentSchema = z
  .object({
    heroImage: optionalHeroImage,
    metadata: metadataSchema,
    hero: z.record(z.unknown()),
    CULTURAL_PORTAL_SECTION: z.record(z.unknown()),
    CULTURAL_PORTAL_MAP: z.record(z.unknown()),
    CULTURAL_PORTAL_PROJECTS_SECTION: z.record(z.unknown()),
    CULTURAL_PORTAL_DONORS: z.record(z.unknown()),
    CULTURAL_PORTAL_ABOUT: z.record(z.unknown()),
    HOME_PARTNERSHIP_SECTION: z.record(z.unknown()),
    HOME_PARTNERSHIP_CATEGORIES: z.array(z.unknown()),
  })
  .passthrough();

const khndzoreskPageContentSchema = z.object({
  heroImage: optionalHeroImage,
  imgBase: z.string().min(1, 'imgBase is required'),
  stats: z.array(z.unknown()),
  facts: z.array(z.unknown()),
  sites: z.array(z.unknown()),
  tours: z.array(z.unknown()),
  gallery: z.array(z.unknown()),
  restorations: z.array(z.unknown()),
  related: z.array(z.unknown()),
  particles: z.array(z.unknown()),
});

const khachaturianPageContentSchema = z.object({
  heroImage: optionalHeroImage,
  imgBase: z.string().min(1, 'imgBase is required'),
  stats: z.array(z.unknown()),
  facts: z.array(z.unknown()),
  highlights: z.array(z.unknown()),
  works: z.array(z.unknown()),
  gallery: z.array(z.unknown()),
  audioTracks: z.array(z.unknown()),
  related: z.array(z.unknown()),
});

const nationalGalleryPageContentSchema = z.object({
  heroImage: optionalHeroImage,
  imgBase: z.string().min(1, 'imgBase is required'),
  stats: z.array(z.unknown()),
  facts: z.array(z.unknown()),
  collections: z.array(z.unknown()),
  gallery: z.array(z.unknown()),
  artists: z.array(z.unknown()),
  exhibitions: z.array(z.unknown()),
  tickets: z.array(z.unknown()),
  related: z.array(z.unknown()),
});

const staticPageHeroContentSchema = z.object({
  heroImage: optionalHeroImage,
});

const PAGE_CONTENT_SCHEMAS: Record<PageContentSlug, z.ZodType<unknown>> = {
  'donation-page': donationPageContentSchema,
  'partnership-page': partnershipPageContentSchema,
  'cultural-portal-page': culturalPortalPageContentSchema,
  'contacts-page': staticPageHeroContentSchema,
  'projects-page': staticPageHeroContentSchema,
  khndzoresk: khndzoreskPageContentSchema,
  'khachaturian-museum': khachaturianPageContentSchema,
  'national-gallery-armenia': nationalGalleryPageContentSchema,
};

export function validatePageContentJson(
  slug: PageContentSlug,
  value: unknown,
): { ok: true; data: unknown } | { ok: false; message: string } {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return { ok: false, message: 'Content must be a JSON object.' };
  }

  if (!PAGE_CONTENT_SLUGS.includes(slug)) {
    return { ok: false, message: 'Unknown page content slug.' };
  }

  const parsed = PAGE_CONTENT_SCHEMAS[slug].safeParse(value);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const path = first?.path.join('.') || 'content';
    const detail = first?.message ?? 'Invalid structure';
    return { ok: false, message: `Invalid page JSON (${path}): ${detail}` };
  }

  return { ok: true, data: parsed.data };
}
