import { z } from 'zod';

const optionalString = z.string().trim().max(2000).optional().or(z.literal(''));
const optionalShortString = z.string().trim().max(160).optional().or(z.literal(''));
const optionalUrl = z
  .string()
  .trim()
  .url('Must be a valid URL')
  .optional()
  .or(z.literal(''));

export const userRoleEnum = z.enum(['ADMIN', 'EDITOR']);

export const contentStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const submissionStatusEnum = z.enum([
  'PENDING',
  'REVIEWING',
  'APPROVED',
  'REJECTED',
  'ARCHIVED',
]);
export const contactStatusEnum = z.enum(['NEW', 'READ', 'REPLIED', 'ARCHIVED']);
export const cultureItemTypeEnum = z.enum([
  'MONUMENT',
  'MUSEUM',
  'PERSON',
  'LEGEND',
  'HISTORY_EVENT',
  'HERITAGE_OBJECT',
  'PUBLICATION',
  'MUSIC',
  'FOOD',
  'DANCE',
  'THEATRE',
  'OTHER',
]);
export const mapTypeEnum = z.enum([
  'MONASTERY',
  'FORTRESS',
  'MUSEUM',
  'CHURCH',
  'ARCHAEOLOGICAL',
  'OTHER',
]);
export const menuRouteTypeEnum = z.enum([
  'CATEGORY',
  'SUBCATEGORY',
  'SUBCATEGORY_FORM',
  'PROJECT_SUBMIT_FORM',
  'CUSTOM_URL',
]);
export const projectStatusEnum = z.enum([
  'UPCOMING',
  'ACTIVE',
  'FUNDED',
  'COMPLETED',
  'ARCHIVED',
]);

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, 'Password is too short'),
});

export const cultureMenuItemSchema = z.object({
  title: z.string().trim().min(2).max(80),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers and hyphens'),
  description: optionalString,
  parentId: z.string().trim().optional().nullable(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  image: optionalShortString,
  routeType: menuRouteTypeEnum.default('CATEGORY'),
  customUrl: optionalUrl.nullable().optional(),
});

export const cultureMenuReorderSchema = z.object({
  parentId: z.string().nullable(),
  order: z.array(z.string().min(1)),
});

export const cultureItemSchema = z.object({
  title: z.string().trim().min(2).max(140),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(140)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers and hyphens'),
  description: z.string().trim().max(8000).optional().or(z.literal('')),
  shortDescription: optionalShortString,
  menuItemId: z.string().min(1, 'Pick a menu item'),
  region: optionalShortString,
  locationName: optionalShortString,
  periodLabel: optionalShortString,
  century: z.number().int().min(-30).max(30).optional().nullable(),
  yearLabel: optionalShortString,
  image: optionalShortString,
  galleryImages: z.array(z.string()).max(20).default([]),
  tourUrl: optionalUrl,
  videoUrl: optionalUrl,
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  mapType: mapTypeEnum.optional().nullable(),
  showOnMap: z.boolean().default(false),
  itemType: cultureItemTypeEnum.default('OTHER'),
  status: contentStatusEnum.default('PUBLISHED'),
  order: z.number().int().min(0).default(0),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(140),
  slug: z.string().trim().min(1).max(140).regex(/^[a-z0-9-]+$/),
  category: z.string().trim().min(1).max(80),
  region: optionalShortString,
  description: z.string().trim().max(6000).optional().or(z.literal('')),
  image: optionalShortString,
  goalAmount: z.number().int().min(0),
  raisedAmount: z.number().int().min(0).default(0),
  status: projectStatusEnum.default('UPCOMING'),
  order: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2).max(80),
  initials: z.string().trim().min(1).max(4),
  position: z.string().trim().min(2).max(120),
  bio: z.string().trim().max(2000).optional().or(z.literal('')),
  image: optionalShortString,
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const careerSchema = z.object({
  title: z.string().trim().min(2).max(120),
  location: z.string().trim().min(1).max(80),
  employmentType: z.string().trim().min(1).max(40),
  description: z.string().trim().max(4000).optional().or(z.literal('')),
  applyUrl: optionalUrl,
  applyEmail: z.string().trim().email().optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const donatorSchema = z.object({
  name: z.string().trim().min(2).max(140),
  type: z.string().trim().min(1).max(60),
  year: z.number().int().min(1900).max(2200).optional().nullable(),
  description: z.string().trim().max(600).optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  isPublic: z.boolean().default(true),
});

export const submissionUpdateSchema = z.object({
  status: submissionStatusEnum,
  adminNote: z.string().trim().max(4000).optional().or(z.literal('')),
});

export const contactMessageUpdateSchema = z.object({
  status: contactStatusEnum,
  adminNote: z.string().trim().max(4000).optional().or(z.literal('')),
});

export const siteSettingsSchema = z.object({
  foundationName: z.string().trim().min(1).max(120),
  foundationSubtitle: z.string().trim().min(1).max(160),
  footerDescription: z.string().trim().min(10).max(2000),
  contactEmail: z.string().trim().email(),
  phone: z.string().trim().min(2).max(60),
  address: z.string().trim().min(2).max(200),
  copyrightText: z.string().trim().min(2).max(200),
  socialLinks: z
    .array(
      z.object({
        label: z.string().min(1).max(40),
        url: z.string().url(),
        icon: z.string().min(1).max(40),
      }),
    )
    .max(10)
    .default([]),
});

export const homeStatSchema = z.object({
  value: z.string().min(1).max(20),
  label: z.string().min(1).max(60),
});

export const homeTechCardSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(2).max(400),
  icon: z.string().min(1).max(40),
});

const optionalHeroImagePath = z
  .string()
  .trim()
  .max(500)
  .optional()
  .or(z.literal(''))
  .refine(
    (value) => !value || value.startsWith('/') || /^https?:\/\//i.test(value),
    'Must be an internal path starting with / or a full http(s) URL',
  );

export const homeContentSchema = z.object({
  heroBadge: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(140),
  heroHighlight: z.string().trim().min(1).max(80),
  heroSubtitle: z.string().trim().min(1).max(160),
  heroTagline: z.string().trim().min(1).max(200),
  heroDescription: z.string().trim().min(10).max(800),
  heroImage: optionalHeroImagePath,
  heroMobileImage: optionalHeroImagePath,
  primaryCtaText: z.string().trim().min(1).max(60),
  primaryCtaUrl: z.string().trim().min(1).max(200),
  secondaryCtaText: z.string().trim().min(1).max(60),
  secondaryCtaUrl: z.string().trim().min(1).max(200),
  stats: z.array(homeStatSchema).min(1).max(8),
  missionTitle: z.string().trim().min(1).max(140),
  missionHighlight: z.string().trim().min(1).max(80),
  missionText: z.string().trim().min(20).max(2000),
  techCards: z.array(homeTechCardSchema).min(1).max(6),
  ctaTitle: z.string().trim().min(2).max(140),
  ctaDescription: z.string().trim().min(10).max(800),
  sections: z.record(z.unknown()).optional().nullable(),
});

export const aboutPillarSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(2).max(400),
  iconName: z.string().trim().min(1).max(40),
});

export const aboutContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(200),
  heroDescription: z.string().trim().min(10).max(800),
  heroImage: optionalHeroImagePath,
  missionEyebrow: z.string().trim().min(1).max(80),
  missionTitle: z.string().trim().min(1).max(200),
  missionIntro: z.string().trim().min(10).max(2000),
  pillars: z.array(aboutPillarSchema).min(1).max(8),
  whyNowHeading: z.string().trim().min(1).max(120),
  whyNowBody: z.string().trim().min(10).max(4000),
  howWeWorkHeading: z.string().trim().min(1).max(120),
  howWeWorkBody: z.string().trim().min(10).max(4000),
  teamEyebrow: z.string().trim().min(1).max(80),
  teamTitle: z.string().trim().min(1).max(200),
  teamIntro: z.string().trim().min(10).max(2000),
  careerEyebrow: z.string().trim().min(1).max(80),
  careerTitle: z.string().trim().min(1).max(200),
  careerIntro: z.string().trim().min(10).max(2000),
});

export type CultureMenuItemInput = z.infer<typeof cultureMenuItemSchema>;
export type CultureItemInput = z.infer<typeof cultureItemSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type CareerInput = z.infer<typeof careerSchema>;
export type DonatorInput = z.infer<typeof donatorSchema>;
export type SubmissionUpdateInput = z.infer<typeof submissionUpdateSchema>;
export type ContactMessageUpdateInput = z.infer<typeof contactMessageUpdateSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type HomeContentInput = z.infer<typeof homeContentSchema>;
export type AboutContentInput = z.infer<typeof aboutContentSchema>;
