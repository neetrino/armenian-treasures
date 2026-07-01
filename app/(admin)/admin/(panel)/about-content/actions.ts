'use server';

import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateAboutContentCache } from '@/lib/cache/revalidation';
import { deleteReplacedManagedImage } from '@/lib/uploads/cleanup-replaced-image';
import { aboutContentSchema } from '@/lib/validation';
import type { AboutPillar } from '@/lib/types/about-content';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';

const SINGLETON_ID = 'about-content-singleton';

export interface AboutContentFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function normalizeOptionalImage(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function parseJsonArray<T>(value: string | null): T[] {
  if (!value || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export async function saveAboutContentAction(
  _prev: AboutContentFormState,
  formData: FormData,
): Promise<AboutContentFormState> {
  await requireAdmin();
  const heroEyebrowI18n = readLocalizedTextFromFormData(formData, 'heroEyebrow');
  const heroTitleI18n = readLocalizedTextFromFormData(formData, 'heroTitle');
  const heroDescriptionI18n = readLocalizedTextFromFormData(formData, 'heroDescription');
  const missionEyebrowI18n = readLocalizedTextFromFormData(formData, 'missionEyebrow');
  const missionTitleI18n = readLocalizedTextFromFormData(formData, 'missionTitle');
  const missionIntroI18n = readLocalizedTextFromFormData(formData, 'missionIntro');
  const whyNowHeadingI18n = readLocalizedTextFromFormData(formData, 'whyNowHeading');
  const whyNowBodyI18n = readLocalizedTextFromFormData(formData, 'whyNowBody');
  const howWeWorkHeadingI18n = readLocalizedTextFromFormData(formData, 'howWeWorkHeading');
  const howWeWorkBodyI18n = readLocalizedTextFromFormData(formData, 'howWeWorkBody');
  const teamEyebrowI18n = readLocalizedTextFromFormData(formData, 'teamEyebrow');
  const teamTitleI18n = readLocalizedTextFromFormData(formData, 'teamTitle');
  const teamIntroI18n = readLocalizedTextFromFormData(formData, 'teamIntro');
  const careerEyebrowI18n = readLocalizedTextFromFormData(formData, 'careerEyebrow');
  const careerTitleI18n = readLocalizedTextFromFormData(formData, 'careerTitle');
  const careerIntroI18n = readLocalizedTextFromFormData(formData, 'careerIntro');

  const parsed = aboutContentSchema.safeParse({
    heroEyebrow: pickDefaultLocaleText(heroEyebrowI18n),
    heroTitle: pickDefaultLocaleText(heroTitleI18n),
    heroDescription: pickDefaultLocaleText(heroDescriptionI18n),
    heroImage: formData.get('heroImage')?.toString() ?? '',
    missionEyebrow: pickDefaultLocaleText(missionEyebrowI18n),
    missionTitle: pickDefaultLocaleText(missionTitleI18n),
    missionIntro: pickDefaultLocaleText(missionIntroI18n),
    pillars: parseJsonArray<AboutPillar>(formData.get('pillars')?.toString() ?? '[]'),
    whyNowHeading: pickDefaultLocaleText(whyNowHeadingI18n),
    whyNowBody: pickDefaultLocaleText(whyNowBodyI18n),
    howWeWorkHeading: pickDefaultLocaleText(howWeWorkHeadingI18n),
    howWeWorkBody: pickDefaultLocaleText(howWeWorkBodyI18n),
    teamEyebrow: pickDefaultLocaleText(teamEyebrowI18n),
    teamTitle: pickDefaultLocaleText(teamTitleI18n),
    teamIntro: pickDefaultLocaleText(teamIntroI18n),
    careerEyebrow: pickDefaultLocaleText(careerEyebrowI18n),
    careerTitle: pickDefaultLocaleText(careerTitleI18n),
    careerIntro: pickDefaultLocaleText(careerIntroI18n),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const basePath = issue.path.join('.') || 'form';
      const localizedFields = new Set([
        'heroEyebrow',
        'heroTitle',
        'heroDescription',
        'missionEyebrow',
        'missionTitle',
        'missionIntro',
        'whyNowHeading',
        'whyNowBody',
        'howWeWorkHeading',
        'howWeWorkBody',
        'teamEyebrow',
        'teamTitle',
        'teamIntro',
        'careerEyebrow',
        'careerTitle',
        'careerIntro',
      ]);
      const path = localizedFields.has(basePath) ? `${basePath}.EN` : basePath;
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: 'error', fieldErrors, message: 'Please correct the form.' };
  }
  const existing = await prisma.aboutContent.findFirst({ where: { id: SINGLETON_ID } });
  const data = {
    ...parsed.data,
    heroEyebrow: encodeTranslatableText(heroEyebrowI18n),
    heroTitle: encodeTranslatableText(heroTitleI18n),
    heroDescription: encodeTranslatableText(heroDescriptionI18n),
    missionEyebrow: encodeTranslatableText(missionEyebrowI18n),
    missionTitle: encodeTranslatableText(missionTitleI18n),
    missionIntro: encodeTranslatableText(missionIntroI18n),
    whyNowHeading: encodeTranslatableText(whyNowHeadingI18n),
    whyNowBody: encodeTranslatableText(whyNowBodyI18n),
    howWeWorkHeading: encodeTranslatableText(howWeWorkHeadingI18n),
    howWeWorkBody: encodeTranslatableText(howWeWorkBodyI18n),
    teamEyebrow: encodeTranslatableText(teamEyebrowI18n),
    teamTitle: encodeTranslatableText(teamTitleI18n),
    teamIntro: encodeTranslatableText(teamIntroI18n),
    careerEyebrow: encodeTranslatableText(careerEyebrowI18n),
    careerTitle: encodeTranslatableText(careerTitleI18n),
    careerIntro: encodeTranslatableText(careerIntroI18n),
    heroImage: normalizeOptionalImage(parsed.data.heroImage),
  };
  await prisma.aboutContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
  await deleteReplacedManagedImage(existing?.heroImage, data.heroImage);
  revalidateAboutContentCache();
  return { status: 'success', message: 'About content saved.' };
}
