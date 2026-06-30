'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';
import { isRateLimitAuthError } from '@/lib/auth/config';
import {
  checkLoginEnvVars,
  extractLoginDebugPayload,
  LOGIN_LOG_PREFIX,
  type LoginDebugPayload,
} from '@/lib/auth/login-debug';
import { LoginCredentialsSignin } from '@/lib/auth/login-credentials-signin';
import { adminLoginSchema } from '@/lib/validation';

export interface LoginActionState {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
  /** TEMPORARY: remove after production login debugging */
  debug?: LoginDebugPayload;
}

export async function loginAction(
  _prev: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  console.log(`${LOGIN_LOG_PREFIX} loginAction: request received`);

  const envIssue = checkLoginEnvVars();
  if (envIssue) {
    return {
      status: 'error',
      message: 'Invalid email or password.',
      debug: envIssue,
    };
  }

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
    return {
      status: 'error',
      fieldErrors,
      message: 'Please check your credentials.',
      debug: { error: 'VALIDATION_FAILED', details: parsed.error.message },
    };
  }

  try {
    console.log(`${LOGIN_LOG_PREFIX} loginAction: calling signIn`);
    await signIn('admin', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
      redirectTo: '/admin',
    });
    console.log(`${LOGIN_LOG_PREFIX} loginAction: signIn succeeded`);
  } catch (error) {
    const debug = extractLoginDebugPayload(error, LoginCredentialsSignin);
    if (debug) {
      console.error(`${LOGIN_LOG_PREFIX} loginAction: signIn failed`, debug);
      return { status: 'error', message: 'Invalid email or password.', debug };
    }
    if (isRateLimitAuthError(error)) {
      return { status: 'error', message: 'Too many login attempts. Please try again later.' };
    }
    if (error instanceof AuthError) {
      console.error(`${LOGIN_LOG_PREFIX} loginAction: AuthError without debug payload`, error.message);
      return {
        status: 'error',
        message: 'Invalid email or password.',
        debug: { error: 'UNKNOWN_ERROR', details: error.message },
      };
    }
    throw error;
  }

  redirect('/admin');
}
