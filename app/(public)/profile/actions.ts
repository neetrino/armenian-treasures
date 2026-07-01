'use server';

import { Prisma } from '@prisma/client';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signOut, auth } from '@/lib/auth';
import { writeAdminAuditLog } from '@/lib/auth/admin-audit';
import { hashPassword, verifyPassword } from '@/lib/auth/hash-password';
import { getMemberOrNull } from '@/lib/auth/member-session';
import { prisma } from '@/lib/db';
import { extractClientIp } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';
import { memberUpdateProfileSchema } from '@/lib/validation';

export interface MemberProfileActionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function updateProfileAction(
  _prev: MemberProfileActionState,
  formData: FormData,
): Promise<MemberProfileActionState> {
  const member = await getMemberOrNull();
  if (!member) {
    redirect('/login');
  }

  const parsed = memberUpdateProfileSchema.safeParse({
    country: formData.get('country')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    name: formData.get('name')?.toString() ?? '',
    surname: formData.get('surname')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    currentPassword: formData.get('currentPassword')?.toString() ?? '',
    newPassword: formData.get('newPassword')?.toString() ?? '',
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return {
      status: 'error',
      fieldErrors,
      message: 'Please correct the highlighted fields.',
    };
  }

  const normalizedEmail = parsed.data.email.trim().toLowerCase();
  const newPassword = parsed.data.newPassword?.trim() ?? '';
  const currentPassword = parsed.data.currentPassword?.trim() ?? '';

  if (newPassword) {
    const stored = await prisma.member.findUnique({
      where: { id: member.id },
      select: { passwordHash: true },
    });
    if (!stored) {
      return { status: 'error', message: 'Account not found.' };
    }

    const matches = await verifyPassword(currentPassword, stored.passwordHash);
    if (!matches) {
      return {
        status: 'error',
        message: 'Current password is incorrect.',
        fieldErrors: { currentPassword: 'Current password is incorrect' },
      };
    }
  }

  try {
    await prisma.member.update({
      where: { id: member.id },
      data: {
        email: normalizedEmail,
        name: sanitizeUserText(parsed.data.name),
        surname: sanitizeUserText(parsed.data.surname),
        country: parsed.data.country,
        phone: sanitizeUserText(parsed.data.phone),
        ...(newPassword ? { passwordHash: await hashPassword(newPassword) } : {}),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        status: 'error',
        message: 'An account with this email already exists.',
        fieldErrors: { email: 'This email is already registered' },
      };
    }
    throw error;
  }

  revalidatePath('/profile');
  return { status: 'success', message: 'Your profile has been updated.' };
}

export async function signOutMemberAction(): Promise<void> {
  await signOut({ redirectTo: '/' });
}

export async function signOutAccountAction(): Promise<void> {
  const session = await auth();
  const headerStore = await headers();

  if (session?.user?.role === 'ADMIN' && (session.user.id || session.user.email)) {
    await writeAdminAuditLog('logout', {
      adminUserId: session.user.id ?? null,
      email: session.user.email ?? null,
      ipAddress: extractClientIp(headerStore),
      userAgent: headerStore.get('user-agent'),
    });
  }

  await signOut({ redirectTo: '/' });
}
