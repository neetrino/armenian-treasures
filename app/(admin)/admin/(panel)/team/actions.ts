'use server';

import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { revalidateTeamCache } from '@/lib/cache/revalidation';
import { teamMemberReorderSchema, teamMemberSchema } from '@/lib/validation';
import { getInitials } from '@/lib/utils';
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

export type ReorderTeamResult = { ok: true } | { ok: false; message: string };

function parseForm(formData: FormData) {
  const nameI18n = readLocalizedTextFromFormData(formData, 'name');
  const positionI18n = readLocalizedTextFromFormData(formData, 'position');
  const bioI18n = readLocalizedTextFromFormData(formData, 'bio');
  const displayName = pickDefaultLocaleText(nameI18n);
  const parsed = teamMemberSchema.safeParse({
    name: displayName,
    initials: getInitials(displayName) || 'AT',
    position: pickDefaultLocaleText(positionI18n),
    bio: pickDefaultLocaleText(bioI18n),
    image: formData.get('image')?.toString() ?? '',
    order: 0,
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
  const { order: _order, ...rest } = parsed.data;
  return {
    ok: true as const,
    data: {
      ...rest,
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
  const maxOrder = await prisma.teamMember.aggregate({ _max: { order: true } });
  await prisma.teamMember.create({
    data: {
      ...parsed.data,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });
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
  return { status: 'success' };
}

export async function reorderTeamMembersAction(orderedIds: string[]): Promise<ReorderTeamResult> {
  await requireAdmin();
  const parsed = teamMemberReorderSchema.safeParse({ order: orderedIds });
  if (!parsed.success) {
    return { ok: false, message: 'Invalid reorder payload.' };
  }

  const members = await prisma.teamMember.findMany({ select: { id: true } });
  const memberIds = new Set(members.map((member) => member.id));
  if (orderedIds.length !== members.length || !orderedIds.every((id) => memberIds.has(id))) {
    return { ok: false, message: 'Order must include all team members.' };
  }

  try {
    await prisma.$transaction(
      orderedIds.map((id, index) => prisma.teamMember.update({ where: { id }, data: { order: index } })),
    );
    revalidate();
    return { ok: true };
  } catch {
    return { ok: false, message: 'Could not save order. Please try again.' };
  }
}

export async function deleteTeamMemberAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.teamMember.delete({ where: { id } });
    revalidate();
  });
}
