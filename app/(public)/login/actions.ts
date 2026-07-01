'use server';

import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';
import { isRateLimitAuthError } from '@/lib/auth/config';
import { isAdminLoginEmail } from '@/lib/auth/is-admin-login-email';
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
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  const parsed = memberLoginSchema.safeParse({ email, password });
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

  const normalizedEmail = parsed.data.email.trim().toLowerCase();
  const isAdmin = await isAdminLoginEmail(normalizedEmail);

  if (isAdmin) {
    try {
      await signIn('admin', {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: false,
        redirectTo: '/admin',
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

    redirect('/admin');
  }

  const ip = extractClientIp(await headers());
  const rateCheck = await getMemberLoginRateLimiter().check(`member-login:${normalizedEmail}:${ip}`);
  if (!rateCheck.allowed) {
    return { status: 'error', message: 'Too many login attempts. Please try again later.' };
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
