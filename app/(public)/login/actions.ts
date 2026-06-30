'use server';

import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';
import { isRateLimitAuthError } from '@/lib/auth/config';
import { extractClientIp, getMemberLoginRateLimiter } from '@/lib/rate-limit';
import { memberLoginSchema } from '@/lib/validation';

export interface MemberLoginActionState {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function loginAction(
  _prev: MemberLoginActionState,
  formData: FormData,
): Promise<MemberLoginActionState> {
  const ip = extractClientIp(await headers());
  const email = formData.get('email')?.toString() ?? '';
  const normalizedEmail = email.trim().toLowerCase();
  const rateCheck = await getMemberLoginRateLimiter().check(`member-login:${normalizedEmail}:${ip}`);
  if (!rateCheck.allowed) {
    return { status: 'error', message: 'Too many login attempts. Please try again later.' };
  }

  const parsed = memberLoginSchema.safeParse({
    email,
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
      message: 'Please check your credentials.',
    };
  }

  try {
    await signIn('member', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (isRateLimitAuthError(error)) {
      return { status: 'error', message: 'Too many login attempts. Please try again later.' };
    }
    if (error instanceof AuthError) {
      return { status: 'error', message: 'Invalid email or password.' };
    }
    throw error;
  }

  redirect('/');
}
