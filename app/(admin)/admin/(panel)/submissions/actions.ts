'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import type { AdminDeleteResult } from '@/lib/admin/action-result';
import { runAdminDelete } from '@/lib/admin/action-result';
import { submissionUpdateSchema } from '@/lib/validation';
import type { SubmissionStatus } from '@prisma/client';

function revalidate(): void {
  revalidatePath('/admin/submissions');
}

export async function updateSubmissionStatusAction(id: string, status: SubmissionStatus): Promise<void> {
  await requireAdmin();
  const parsed = submissionUpdateSchema.safeParse({ status, adminNote: '' });
  if (!parsed.success) return;
  await prisma.submission.update({
    where: { id },
    data: { status: parsed.data.status },
  });
  revalidate();
}

export async function updateSubmissionNoteAction(id: string, adminNote: string): Promise<void> {
  await requireAdmin();
  const value = adminNote.slice(0, 4000);
  await prisma.submission.update({ where: { id }, data: { adminNote: value } });
  revalidate();
}

export async function deleteSubmissionAction(id: string): Promise<AdminDeleteResult> {
  await requireAdmin();
  return runAdminDelete(async () => {
    await prisma.submission.delete({ where: { id } });
    revalidate();
  });
}
