'use server';

import type { Prisma } from '@prisma/client';
import type { HomeContent } from '@prisma/client';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateHomeContentCache } from '@/lib/cache/revalidation';
import { deleteReplacedManagedImage } from '@/lib/uploads/cleanup-replaced-image';
import { HOME_CONTENT_FALLBACK } from '@/lib/queries/home';
import { homeContentSchema } from '@/lib/validation';
import {
  normalizeHomeSections,
  type HomeSections,
} from '@/lib/types/home-sections';
import {
  normalizeHomeStats,
  normalizeHomeTechCards,
  type HomeStat,
  type HomeTechCard,
} from '@/lib/types/home-content';
import {
  decodeTranslatableText,
  encodeTranslatableText,
  type LocaleTextMap,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';
import { SITE_LOCALE_CODES } from '@/lib/i18n/locale-config';

const SINGLETON_ID = 'home-content-singleton';

export interface HomeContentFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function normalizeOptionalImage(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function parseStatsJson(raw: string | null): HomeStat[] {
  if (!raw) return normalizeHomeStats(HOME_CONTENT_FALLBACK.stats);
  try {
    return normalizeHomeStats(JSON.parse(raw));
  } catch {
    return normalizeHomeStats(HOME_CONTENT_FALLBACK.stats);
  }
}

function parseTechCardsJson(raw: string | null): HomeTechCard[] {
  if (!raw) return normalizeHomeTechCards(HOME_CONTENT_FALLBACK.techCards);
  try {
    return normalizeHomeTechCards(JSON.parse(raw));
  } catch {
    return normalizeHomeTechCards(HOME_CONTENT_FALLBACK.techCards);
  }
}

function parseSectionsJson(raw: string | null): HomeSections {
  if (!raw) return normalizeHomeSections(HOME_CONTENT_FALLBACK.sections);
  try {
    return normalizeHomeSections(JSON.parse(raw));
  } catch {
    return normalizeHomeSections(HOME_CONTENT_FALLBACK.sections);
  }
}

function getPreservedFields(existing: HomeContent | null) {
  if (existing) {
    return {
      heroBadge: existing.heroBadge,
      heroTitle: existing.heroTitle,
      heroHighlight: existing.heroHighlight,
      heroSubtitle: existing.heroSubtitle,
      heroTagline: existing.heroTagline,
      heroDescription: existing.heroDescription,
      primaryCtaText: existing.primaryCtaText,
      primaryCtaUrl: existing.primaryCtaUrl,
      secondaryCtaText: existing.secondaryCtaText,
      secondaryCtaUrl: existing.secondaryCtaUrl,
      stats: existing.stats,
      missionTitle: existing.missionTitle,
      missionHighlight: existing.missionHighlight,
      missionText: existing.missionText,
      techCards: existing.techCards,
      ctaTitle: existing.ctaTitle,
      ctaDescription: existing.ctaDescription,
      sections: existing.sections,
    };
  }
  return {
    heroBadge: HOME_CONTENT_FALLBACK.heroBadge,
    heroTitle: HOME_CONTENT_FALLBACK.heroTitle,
    heroHighlight: HOME_CONTENT_FALLBACK.heroHighlight,
    heroSubtitle: HOME_CONTENT_FALLBACK.heroSubtitle,
    heroTagline: HOME_CONTENT_FALLBACK.heroTagline,
    heroDescription: HOME_CONTENT_FALLBACK.heroDescription,
    primaryCtaText: HOME_CONTENT_FALLBACK.primaryCtaText,
    primaryCtaUrl: HOME_CONTENT_FALLBACK.primaryCtaUrl,
    secondaryCtaText: HOME_CONTENT_FALLBACK.secondaryCtaText,
    secondaryCtaUrl: HOME_CONTENT_FALLBACK.secondaryCtaUrl,
    stats: HOME_CONTENT_FALLBACK.stats,
    missionTitle: HOME_CONTENT_FALLBACK.missionTitle,
    missionHighlight: HOME_CONTENT_FALLBACK.missionHighlight,
    missionText: HOME_CONTENT_FALLBACK.missionText,
    techCards: HOME_CONTENT_FALLBACK.techCards,
    ctaTitle: HOME_CONTENT_FALLBACK.ctaTitle,
    ctaDescription: HOME_CONTENT_FALLBACK.ctaDescription,
    sections: HOME_CONTENT_FALLBACK.sections,
  };
}

function hasLocalizedInputs(formData: FormData, fieldName: string): boolean {
  return SITE_LOCALE_CODES.some((locale) => formData.has(`${fieldName}.${locale}`));
}

function readLocalizedOrPreserved(
  formData: FormData,
  fieldName: string,
  preservedRaw: string,
): LocaleTextMap {
  if (hasLocalizedInputs(formData, fieldName)) {
    return readLocalizedTextFromFormData(formData, fieldName);
  }
  return decodeTranslatableText(preservedRaw);
}

function readFormStringOrPreserved(
  formData: FormData,
  fieldName: string,
  preservedValue: string,
): string {
  if (formData.has(fieldName)) {
    return formData.get(fieldName)?.toString() ?? '';
  }
  return preservedValue;
}

export async function saveHomeContentAction(
  _prev: HomeContentFormState,
  formData: FormData,
): Promise<HomeContentFormState> {
  await requireAdmin();

  const existing = await prisma.homeContent.findUnique({
    where: { id: SINGLETON_ID },
  });

  const preserved = getPreservedFields(existing);
  const heroBadgeI18n = readLocalizedOrPreserved(formData, 'heroBadge', preserved.heroBadge);
  const heroTitleI18n = readLocalizedOrPreserved(formData, 'heroTitle', preserved.heroTitle);
  const heroHighlightI18n = readLocalizedOrPreserved(formData, 'heroHighlight', preserved.heroHighlight);
  const heroSubtitleI18n = readLocalizedOrPreserved(formData, 'heroSubtitle', preserved.heroSubtitle);
  const heroTaglineI18n = readLocalizedOrPreserved(formData, 'heroTagline', preserved.heroTagline);
  const heroDescriptionI18n = readLocalizedOrPreserved(formData, 'heroDescription', preserved.heroDescription);
  const primaryCtaTextI18n = readLocalizedOrPreserved(formData, 'primaryCtaText', preserved.primaryCtaText);
  const secondaryCtaTextI18n = readLocalizedOrPreserved(formData, 'secondaryCtaText', preserved.secondaryCtaText);
  const missionTitleI18n = readLocalizedOrPreserved(formData, 'missionTitle', preserved.missionTitle);
  const missionHighlightI18n = readLocalizedOrPreserved(formData, 'missionHighlight', preserved.missionHighlight);
  const missionTextI18n = readLocalizedOrPreserved(formData, 'missionText', preserved.missionText);
  const ctaTitleI18n = readLocalizedOrPreserved(formData, 'ctaTitle', preserved.ctaTitle);
  const ctaDescriptionI18n = readLocalizedOrPreserved(formData, 'ctaDescription', preserved.ctaDescription);

  const payload = {
    ...preserved,
    heroBadge: pickDefaultLocaleText(heroBadgeI18n),
    heroTitle: pickDefaultLocaleText(heroTitleI18n),
    heroHighlight: pickDefaultLocaleText(heroHighlightI18n),
    heroSubtitle: pickDefaultLocaleText(heroSubtitleI18n),
    heroTagline: pickDefaultLocaleText(heroTaglineI18n),
    heroDescription: pickDefaultLocaleText(heroDescriptionI18n),
    heroImage: readFormStringOrPreserved(formData, 'heroImage', existing?.heroImage ?? ''),
    heroMobileImage: readFormStringOrPreserved(formData, 'heroMobileImage', existing?.heroMobileImage ?? ''),
    primaryCtaText: pickDefaultLocaleText(primaryCtaTextI18n),
    primaryCtaUrl: formData.get('primaryCtaUrl')?.toString() ?? preserved.primaryCtaUrl,
    secondaryCtaText: pickDefaultLocaleText(secondaryCtaTextI18n),
    secondaryCtaUrl: formData.get('secondaryCtaUrl')?.toString() ?? preserved.secondaryCtaUrl,
    missionTitle: pickDefaultLocaleText(missionTitleI18n),
    missionHighlight: pickDefaultLocaleText(missionHighlightI18n),
    missionText: pickDefaultLocaleText(missionTextI18n),
    ctaTitle: pickDefaultLocaleText(ctaTitleI18n),
    ctaDescription: pickDefaultLocaleText(ctaDescriptionI18n),
    stats: parseStatsJson(formData.get('statsJson')?.toString() ?? null),
    techCards: parseTechCardsJson(formData.get('techCardsJson')?.toString() ?? null),
    sections: parseSectionsJson(formData.get('sectionsJson')?.toString() ?? null),
  };

  const parsed = homeContentSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    const localizedFields = new Set([
      'heroBadge',
      'heroTitle',
      'heroHighlight',
      'heroSubtitle',
      'heroTagline',
      'heroDescription',
      'primaryCtaText',
      'secondaryCtaText',
      'missionTitle',
      'missionHighlight',
      'missionText',
      'ctaTitle',
      'ctaDescription',
    ]);
    for (const issue of parsed.error.issues) {
      const basePath = issue.path.join('.') || 'form';
      const path = localizedFields.has(basePath) ? `${basePath}.EN` : basePath;
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: 'error', fieldErrors, message: 'Please correct the form.' };
  }

  const data = {
    ...parsed.data,
    heroBadge: encodeTranslatableText(heroBadgeI18n),
    heroTitle: encodeTranslatableText(heroTitleI18n),
    heroHighlight: encodeTranslatableText(heroHighlightI18n),
    heroSubtitle: encodeTranslatableText(heroSubtitleI18n),
    heroTagline: encodeTranslatableText(heroTaglineI18n),
    heroDescription: encodeTranslatableText(heroDescriptionI18n),
    primaryCtaText: encodeTranslatableText(primaryCtaTextI18n),
    secondaryCtaText: encodeTranslatableText(secondaryCtaTextI18n),
    missionTitle: encodeTranslatableText(missionTitleI18n),
    missionHighlight: encodeTranslatableText(missionHighlightI18n),
    missionText: encodeTranslatableText(missionTextI18n),
    ctaTitle: encodeTranslatableText(ctaTitleI18n),
    ctaDescription: encodeTranslatableText(ctaDescriptionI18n),
    heroImage: normalizeOptionalImage(parsed.data.heroImage),
    heroMobileImage: normalizeOptionalImage(parsed.data.heroMobileImage),
    sections: normalizeHomeSections(parsed.data.sections),
    stats: parsed.data.stats as Prisma.InputJsonValue,
    techCards: parsed.data.techCards as Prisma.InputJsonValue,
  };

  await prisma.homeContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });

  await deleteReplacedManagedImage(existing?.heroImage, data.heroImage);
  await deleteReplacedManagedImage(existing?.heroMobileImage, data.heroMobileImage);

  revalidateHomeContentCache();
  return { status: 'success', message: 'Homepage content saved.' };
}
