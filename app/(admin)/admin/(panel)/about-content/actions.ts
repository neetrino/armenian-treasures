'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { aboutContentSchema } from '@/lib/validation';
import type { AboutPillar } from '@/lib/types/about-content';

const SINGLETON_ID = 'about-content-singleton';

export interface AboutContentFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
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
  const parsed = aboutContentSchema.safeParse({
    heroEyebrow: formData.get('heroEyebrow')?.toString() ?? '',
    heroTitle: formData.get('heroTitle')?.toString() ?? '',
    heroDescription: formData.get('heroDescription')?.toString() ?? '',
    missionEyebrow: formData.get('missionEyebrow')?.toString() ?? '',
    missionTitle: formData.get('missionTitle')?.toString() ?? '',
    missionIntro: formData.get('missionIntro')?.toString() ?? '',
    pillars: parseJsonArray<AboutPillar>(formData.get('pillars')?.toString() ?? '[]'),
    whyNowHeading: formData.get('whyNowHeading')?.toString() ?? '',
    whyNowBody: formData.get('whyNowBody')?.toString() ?? '',
    howWeWorkHeading: formData.get('howWeWorkHeading')?.toString() ?? '',
    howWeWorkBody: formData.get('howWeWorkBody')?.toString() ?? '',
    teamEyebrow: formData.get('teamEyebrow')?.toString() ?? '',
    teamTitle: formData.get('teamTitle')?.toString() ?? '',
    teamIntro: formData.get('teamIntro')?.toString() ?? '',
    careerEyebrow: formData.get('careerEyebrow')?.toString() ?? '',
    careerTitle: formData.get('careerTitle')?.toString() ?? '',
    careerIntro: formData.get('careerIntro')?.toString() ?? '',
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: 'error', fieldErrors, message: 'Please correct the form.' };
  }
  await prisma.aboutContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...parsed.data },
    update: parsed.data,
  });
  revalidateTag('about-content', 'max');
  revalidatePath('/about/mission');
  revalidatePath('/about/team');
  revalidatePath('/about/career');
  revalidatePath('/admin/about-content');
  return { status: 'success', message: 'About content saved.' };
}
