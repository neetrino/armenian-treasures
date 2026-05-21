'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth';
import { adminLoginSchema } from '@/lib/validation';

export interface LoginActionState {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
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
      redirectTo: '/admin/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { status: 'error', message: 'Invalid email or password.' };
    }
    throw error;
  }
  return { status: 'idle' };
}
