'use server';

import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { signIn } from '@/lib/auth';
import { hashPassword } from '@/lib/auth/hash-password';
import { prisma } from '@/lib/db';
import { extractClientIp, getMemberRegisterRateLimiter } from '@/lib/rate-limit';
import { sanitizeUserText } from '@/lib/sanitize';
import { memberRegisterSchema } from '@/lib/validation';

export interface MemberRegisterActionState {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function registerAction(
  _prev: MemberRegisterActionState,
  formData: FormData,
): Promise<MemberRegisterActionState> {
  const ip = extractClientIp(await headers());
  const rateCheck = await getMemberRegisterRateLimiter().check(`member-register:${ip}`);
  if (!rateCheck.allowed) {
    return {
      status: 'error',
      message: 'Too many registration attempts. Please try again later.',
    };
  }

  const parsed = memberRegisterSchema.safeParse({
    country: formData.get('country')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    name: formData.get('name')?.toString() ?? '',
    surname: formData.get('surname')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
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
  const passwordHash = await hashPassword(parsed.data.password);

  try {
    await prisma.member.create({
      data: {
        email: normalizedEmail,
        name: sanitizeUserText(parsed.data.name),
        surname: sanitizeUserText(parsed.data.surname),
        country: parsed.data.country,
        phone: sanitizeUserText(parsed.data.phone),
        passwordHash,
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

  try {
    await signIn('member', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/login');
    }
    throw error;
  }

  redirect('/');
}
