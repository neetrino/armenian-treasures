'use server';

import { CredentialsSignin } from 'next-auth';
import { signIn } from '@/lib/auth';
import { isRateLimitAuthError } from '@/lib/auth/config';
import { adminLoginSchema } from '@/lib/validation';

const ADMIN_LOGIN_REDIRECT = '/admin/dashboard';

export interface LoginActionState {
  status: 'idle' | 'error' | 'success';
  message?: string;
  fieldErrors?: Record<string, string>;
  redirectTo?: string;
}

export async function loginAction(
  _prev: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get('email')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { status: 'error', fieldErrors, message: 'Please check your credentials.' };
  }
  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
      redirectTo: ADMIN_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (isRateLimitAuthError(error)) {
      return { status: 'error', message: 'Too many login attempts. Please try again later.' };
    }
    if (error instanceof CredentialsSignin) {
      return { status: 'error', message: 'Invalid email or password.' };
    }
    throw error;
  }

  return { status: 'success', redirectTo: ADMIN_LOGIN_REDIRECT };
}
