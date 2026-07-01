'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateDonatorsCache } from '@/lib/cache/revalidation';
import { donatorSchema } from '@/lib/validation';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';

export interface DonatorFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const yearRaw = formData.get('year')?.toString() ?? '';
  const nameI18n = readLocalizedTextFromFormData(formData, 'name');
  const typeI18n = readLocalizedTextFromFormData(formData, 'type');
  const descriptionI18n = readLocalizedTextFromFormData(formData, 'description');
  const parsed = donatorSchema.safeParse({
    name: pickDefaultLocaleText(nameI18n),
    type: pickDefaultLocaleText(typeI18n),
    year: yearRaw.trim() === '' ? null : Number(yearRaw),
    description: pickDefaultLocaleText(descriptionI18n),
    order: Number(formData.get('order') ?? 0),
    isPublic: formData.get('isPublic') === 'on',
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const basePath = issue.path.join('.') || 'form';
      const path =
        basePath === 'name' || basePath === 'type' || basePath === 'description'
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
      name: encodeTranslatableText(nameI18n),
      type: encodeTranslatableText(typeI18n),
      year: parsed.data.year ?? null,
      description: encodeTranslatableText(descriptionI18n) || null,
    },
  };
}

function revalidate(): void {
  revalidateDonatorsCache();
}

export async function createDonatorAction(_p: DonatorFormState, formData: FormData): Promise<DonatorFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.donator.create({ data: parsed.data });
  revalidate();
  return { status: 'success' };
}

export async function updateDonatorAction(
  id: string,
  _p: DonatorFormState,
  formData: FormData,
): Promise<DonatorFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.donator.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect('/admin/donators');
}

export async function deleteDonatorAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.donator.delete({ where: { id } });
    revalidate();
  });
}
