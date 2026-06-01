'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { siteSettingsSchema } from '@/lib/validation';

const SINGLETON_ID = 'site-settings-singleton';

export interface SettingsFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function saveSiteSettingsAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  await requireAdmin();
  const parsed = siteSettingsSchema.safeParse({
    foundationName: formData.get('foundationName')?.toString() ?? '',
    foundationSubtitle: formData.get('foundationSubtitle')?.toString() ?? '',
    footerDescription: formData.get('footerDescription')?.toString() ?? '',
    contactEmail: formData.get('contactEmail')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    address: formData.get('address')?.toString() ?? '',
    copyrightText: formData.get('copyrightText')?.toString() ?? '',
    socialLinks: [],
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: 'error', fieldErrors, message: 'Please correct the form.' };
  }
  await prisma.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...parsed.data, socialLinks: parsed.data.socialLinks },
    update: { ...parsed.data, socialLinks: parsed.data.socialLinks },
  });
  revalidateTag('site-settings', 'max');
  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { status: 'success', message: 'Site settings saved.' };
}
