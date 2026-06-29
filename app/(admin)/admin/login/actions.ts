'use server';

import { CredentialsSignin } from 'next-auth';
import { signIn } from '@/lib/auth';
import { isRateLimitAuthError } from '@/lib/auth/config';
import { ProductionRateLimitMisconfiguredError } from '@/lib/rate-limit/assert-production-ready';
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
    });
  } catch (error) {
    if (isRateLimitAuthError(error)) {
      return { status: 'error', message: 'Too many login attempts. Please try again later.' };
    }
    if (error instanceof CredentialsSignin) {
      return { status: 'error', message: 'Invalid email or password.' };
    }
    if (error instanceof ProductionRateLimitMisconfiguredError) {
      console.error('[admin-login] rate limit misconfigured', { message: error.message });
      return {
        status: 'error',
        message:
          'Login is temporarily unavailable because server rate limiting is not configured. Please contact the site administrator.',
      };
    }
    console.error('[admin-login] unexpected error', {
      name: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      digest: (error as { digest?: string })?.digest,
    });
    throw error;
  }

  return { status: 'success', redirectTo: ADMIN_LOGIN_REDIRECT };
}
