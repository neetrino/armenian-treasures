'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateCareersCache } from '@/lib/cache/revalidation';
import { careerSchema } from '@/lib/validation';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';

export interface CareerFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const titleI18n = readLocalizedTextFromFormData(formData, 'title');
  const locationI18n = readLocalizedTextFromFormData(formData, 'location');
  const employmentTypeI18n = readLocalizedTextFromFormData(formData, 'employmentType');
  const descriptionI18n = readLocalizedTextFromFormData(formData, 'description');
  const parsed = careerSchema.safeParse({
    title: pickDefaultLocaleText(titleI18n),
    location: pickDefaultLocaleText(locationI18n),
    employmentType: pickDefaultLocaleText(employmentTypeI18n),
    description: pickDefaultLocaleText(descriptionI18n),
    applyUrl: formData.get('applyUrl')?.toString() ?? '',
    applyEmail: formData.get('applyEmail')?.toString() ?? '',
    order: Number(formData.get('order') ?? 0),
    isActive: formData.get('isActive') === 'on',
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const basePath = issue.path.join('.') || 'form';
      const path =
        basePath === 'title' ||
        basePath === 'location' ||
        basePath === 'employmentType' ||
        basePath === 'description'
          ? `${basePath}.EN`
          : basePath;
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false as const, errors };
  }
  return {
    ok: true as const,
    data: {
      ...parsed.data,
      title: encodeTranslatableText(titleI18n),
      location: encodeTranslatableText(locationI18n),
      employmentType: encodeTranslatableText(employmentTypeI18n),
      description: encodeTranslatableText(descriptionI18n) || null,
      applyUrl: parsed.data.applyUrl?.trim() ? parsed.data.applyUrl : null,
      applyEmail: parsed.data.applyEmail?.trim() ? parsed.data.applyEmail : null,
    },
  };
}

function revalidate(): void {
  revalidateCareersCache();
}

export async function createCareerAction(_p: CareerFormState, formData: FormData): Promise<CareerFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.career.create({ data: parsed.data });
  revalidate();
  return { status: 'success' };
}

export async function updateCareerAction(
  id: string,
  _p: CareerFormState,
  formData: FormData,
): Promise<CareerFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.career.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect('/admin/careers');
}

export async function deleteCareerAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.career.delete({ where: { id } });
    revalidate();
  });
}
