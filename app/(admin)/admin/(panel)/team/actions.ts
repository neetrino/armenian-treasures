'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { teamMemberSchema } from '@/lib/validation';

export interface TeamFormState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const parsed = teamMemberSchema.safeParse({
    name: formData.get('name')?.toString() ?? '',
    initials: formData.get('initials')?.toString() ?? '',
    position: formData.get('position')?.toString() ?? '',
    bio: formData.get('bio')?.toString() ?? '',
    image: formData.get('image')?.toString() ?? '',
    order: Number(formData.get('order') ?? 0),
    isActive: formData.get('isActive') === 'on',
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false as const, errors };
  }
  return {
    ok: true as const,
    data: {
      ...parsed.data,
      bio: parsed.data.bio?.trim() ? parsed.data.bio : null,
      image: parsed.data.image?.trim() ? parsed.data.image : null,
    },
  };
}

function revalidate(): void {
  revalidateTag('team', 'max');
  revalidatePath('/about/team');
  revalidatePath('/admin/team');
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

export async function deleteTeamMemberAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidate();
}
