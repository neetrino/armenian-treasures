'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { homeContentSchema } from '@/lib/validation';

const SINGLETON_ID = 'home-content-singleton';

export interface HomeContentFormState {
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

export async function saveHomeContentAction(
  _prev: HomeContentFormState,
  formData: FormData,
): Promise<HomeContentFormState> {
  await requireAdmin();
  const parsed = homeContentSchema.safeParse({
    heroBadge: formData.get('heroBadge')?.toString() ?? '',
    heroTitle: formData.get('heroTitle')?.toString() ?? '',
    heroHighlight: formData.get('heroHighlight')?.toString() ?? '',
    heroDescription: formData.get('heroDescription')?.toString() ?? '',
    heroImage: formData.get('heroImage')?.toString() ?? '',
    primaryCtaText: formData.get('primaryCtaText')?.toString() ?? '',
    primaryCtaUrl: formData.get('primaryCtaUrl')?.toString() ?? '',
    secondaryCtaText: formData.get('secondaryCtaText')?.toString() ?? '',
    secondaryCtaUrl: formData.get('secondaryCtaUrl')?.toString() ?? '',
    stats: parseJsonArray(formData.get('stats')?.toString() ?? '[]'),
    missionTitle: formData.get('missionTitle')?.toString() ?? '',
    missionHighlight: formData.get('missionHighlight')?.toString() ?? '',
    missionText: formData.get('missionText')?.toString() ?? '',
    techCards: parseJsonArray(formData.get('techCards')?.toString() ?? '[]'),
    ctaTitle: formData.get('ctaTitle')?.toString() ?? '',
    ctaDescription: formData.get('ctaDescription')?.toString() ?? '',
  });
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
    heroImage: parsed.data.heroImage?.trim() ? parsed.data.heroImage : null,
  };
  await prisma.homeContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
  revalidateTag('home-content');
  revalidatePath('/');
  revalidatePath('/admin/home-content');
  return { status: 'success', message: 'Home content saved.' };
}
