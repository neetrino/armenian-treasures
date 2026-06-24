'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import type { HomeContent } from '@prisma/client';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { HOME_CONTENT_FALLBACK } from '@/lib/queries/home';
import { homeContentSchema } from '@/lib/validation';

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

function getPreservedFields(existing: HomeContent | null) {
  if (existing) {
    return {
      heroBadge: existing.heroBadge,
      stats: existing.stats,
      missionTitle: existing.missionTitle,
      missionHighlight: existing.missionHighlight,
      missionText: existing.missionText,
      techCards: existing.techCards,
      ctaTitle: existing.ctaTitle,
      ctaDescription: existing.ctaDescription,
    };
  }
  return {
    heroBadge: HOME_CONTENT_FALLBACK.heroBadge,
    stats: HOME_CONTENT_FALLBACK.stats,
    missionTitle: HOME_CONTENT_FALLBACK.missionTitle,
    missionHighlight: HOME_CONTENT_FALLBACK.missionHighlight,
    missionText: HOME_CONTENT_FALLBACK.missionText,
    techCards: HOME_CONTENT_FALLBACK.techCards,
    ctaTitle: HOME_CONTENT_FALLBACK.ctaTitle,
    ctaDescription: HOME_CONTENT_FALLBACK.ctaDescription,
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
    heroTitle: formData.get('heroTitle')?.toString() ?? '',
    heroHighlight: formData.get('heroHighlight')?.toString() ?? '',
    heroDescription: formData.get('heroDescription')?.toString() ?? '',
    heroImage: formData.get('heroImage')?.toString() ?? '',
    heroMobileImage: formData.get('heroMobileImage')?.toString() ?? '',
    primaryCtaText: formData.get('primaryCtaText')?.toString() ?? '',
    primaryCtaUrl: formData.get('primaryCtaUrl')?.toString() ?? '',
    secondaryCtaText: formData.get('secondaryCtaText')?.toString() ?? '',
    secondaryCtaUrl: formData.get('secondaryCtaUrl')?.toString() ?? '',
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
  };

  await prisma.homeContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });

  revalidateTag('home-content', 'max');
  revalidatePath('/');
  revalidatePath('/admin/home-content');
  return { status: 'success', message: 'Hero section saved.' };
}
