'use server';

import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateSiteSettingsCache } from '@/lib/cache/revalidation';
import { siteSettingsSchema } from '@/lib/validation';

const SINGLETON_ID = 'site-settings-singleton';

export interface SettingsFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

const siteSettingsFormSchema = siteSettingsSchema.omit({ socialLinks: true });

function parseSocialLinksFromForm(formData: FormData): unknown | undefined {
  if (!formData.has('socialLinks')) return undefined;
  const raw = formData.get('socialLinks')?.toString() ?? '';
  if (!raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    const validated = siteSettingsSchema.shape.socialLinks.safeParse(parsed);
    return validated.success ? validated.data : undefined;
  } catch {
    return undefined;
  }
}

export async function saveSiteSettingsAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  await requireAdmin();
  const parsed = siteSettingsFormSchema.safeParse({
    foundationName: formData.get('foundationName')?.toString() ?? '',
    foundationSubtitle: formData.get('foundationSubtitle')?.toString() ?? '',
    footerDescription: formData.get('footerDescription')?.toString() ?? '',
    contactEmail: formData.get('contactEmail')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    address: formData.get('address')?.toString() ?? '',
    copyrightText: formData.get('copyrightText')?.toString() ?? '',
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: 'error', fieldErrors, message: 'Please correct the form.' };
  }

  const formSocialLinks = parseSocialLinksFromForm(formData);
  if (formSocialLinks === undefined && formData.has('socialLinks')) {
    return { status: 'error', message: 'Social links could not be parsed. Please try again.' };
  }

  const existing = await prisma.siteSettings.findUnique({ where: { id: SINGLETON_ID } });
  const socialLinks = formSocialLinks ?? existing?.socialLinks ?? [];

  await prisma.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...parsed.data, socialLinks },
    update: { ...parsed.data, socialLinks },
  });
  revalidateSiteSettingsCache();
  return { status: 'success', message: 'Site settings saved.' };
}
