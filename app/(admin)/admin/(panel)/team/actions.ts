'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateTeamCache } from '@/lib/cache/revalidation';
import { teamMemberSchema } from '@/lib/validation';
import {
  encodeTranslatableText,
  pickDefaultLocaleText,
  readLocalizedTextFromFormData,
} from '@/lib/i18n/translatable-content';

export interface TeamFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const nameI18n = readLocalizedTextFromFormData(formData, 'name');
  const positionI18n = readLocalizedTextFromFormData(formData, 'position');
  const bioI18n = readLocalizedTextFromFormData(formData, 'bio');
  const parsed = teamMemberSchema.safeParse({
    name: pickDefaultLocaleText(nameI18n),
    initials: formData.get('initials')?.toString() ?? '',
    position: pickDefaultLocaleText(positionI18n),
    bio: pickDefaultLocaleText(bioI18n),
    image: formData.get('image')?.toString() ?? '',
    order: Number(formData.get('order') ?? 0),
    isActive: formData.get('isActive') === 'on',
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const basePath = issue.path.join('.') || 'form';
      const path =
        basePath === 'name' || basePath === 'position' || basePath === 'bio'
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
      position: encodeTranslatableText(positionI18n),
      bio: encodeTranslatableText(bioI18n) || null,
      image: parsed.data.image?.trim() ? parsed.data.image : null,
    },
  };
}

function revalidate(): void {
  revalidateTeamCache();
}

export async function createTeamMemberAction(_p: TeamFormState, formData: FormData): Promise<TeamFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.teamMember.create({ data: parsed.data });
  revalidate();
  return { status: 'success' };
}

export async function updateTeamMemberAction(
  id: string,
  _p: TeamFormState,
  formData: FormData,
): Promise<TeamFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.ok) return { status: 'error', fieldErrors: parsed.errors, message: 'Please correct the form.' };
  await prisma.teamMember.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect('/admin/team');
}

export async function deleteTeamMemberAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.teamMember.delete({ where: { id } });
    revalidate();
  });
}
