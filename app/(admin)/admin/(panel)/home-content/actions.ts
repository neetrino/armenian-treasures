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
      heroSubtitle: existing.heroSubtitle,
      heroTagline: existing.heroTagline,
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
    heroSubtitle: HOME_CONTENT_FALLBACK.heroSubtitle,
    heroTagline: HOME_CONTENT_FALLBACK.heroTagline,
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

export async function saveHomeContentAction(
  _prev: HomeContentFormState,
  formData: FormData,
): Promise<HomeContentFormState> {
  await requireAdmin();

  const existing = await prisma.homeContent.findUnique({
    where: { id: SINGLETON_ID },
  });

  const preserved = getPreservedFields(existing);

  const payload = {
    ...preserved,
    heroBadge: formData.get('heroBadge')?.toString() ?? preserved.heroBadge,
    heroTitle: formData.get('heroTitle')?.toString() ?? '',
    heroHighlight: formData.get('heroHighlight')?.toString() ?? '',
    heroSubtitle: formData.get('heroSubtitle')?.toString() ?? preserved.heroSubtitle,
    heroTagline: formData.get('heroTagline')?.toString() ?? preserved.heroTagline,
    heroDescription: formData.get('heroDescription')?.toString() ?? '',
    heroImage: formData.get('heroImage')?.toString() ?? '',
    heroMobileImage: formData.get('heroMobileImage')?.toString() ?? '',
    primaryCtaText: formData.get('primaryCtaText')?.toString() ?? '',
    primaryCtaUrl: formData.get('primaryCtaUrl')?.toString() ?? '',
    secondaryCtaText: formData.get('secondaryCtaText')?.toString() ?? '',
    secondaryCtaUrl: formData.get('secondaryCtaUrl')?.toString() ?? '',
    missionTitle: formData.get('missionTitle')?.toString() ?? preserved.missionTitle,
    missionHighlight: formData.get('missionHighlight')?.toString() ?? preserved.missionHighlight,
    missionText: formData.get('missionText')?.toString() ?? preserved.missionText,
    ctaTitle: formData.get('ctaTitle')?.toString() ?? preserved.ctaTitle,
    ctaDescription: formData.get('ctaDescription')?.toString() ?? preserved.ctaDescription,
    stats: parseStatsJson(formData.get('statsJson')?.toString() ?? null),
    techCards: parseTechCardsJson(formData.get('techCardsJson')?.toString() ?? null),
    sections: parseSectionsJson(formData.get('sectionsJson')?.toString() ?? null),
  };

  const parsed = homeContentSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: 'error', fieldErrors, message: 'Please correct the form.' };
  }

  const data = {
    ...parsed.data,
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
