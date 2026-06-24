'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { contactMessageUpdateSchema } from '@/lib/validation';
import type { ContactStatus } from '@prisma/client';

function revalidate(): void {
  revalidateTag('admin-contact', 'max');
  revalidatePath('/admin/contact-messages');
}

export async function updateContactStatusAction(id: string, status: ContactStatus): Promise<void> {
  await requireAdmin();
  const parsed = contactMessageUpdateSchema.safeParse({ status, adminNote: '' });
  if (!parsed.success) return;
  await prisma.contactMessage.update({ where: { id }, data: { status: parsed.data.status } });
  revalidate();
}

export async function updateContactNoteAction(id: string, adminNote: string): Promise<void> {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id },
    data: { adminNote: adminNote.slice(0, 4000) },
  });
  revalidate();
}

export async function deleteContactMessageAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidate();
}
