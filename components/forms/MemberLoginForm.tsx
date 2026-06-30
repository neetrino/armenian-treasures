'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { loginAction, type MemberLoginActionState } from '@/app/(public)/login/actions';

const INITIAL: MemberLoginActionState = { status: 'idle' };

export function MemberLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, INITIAL);

  return (
    <form action={formAction} className="auth-form">
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
        inputClassName="auth-field-input rounded-md"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        error={state.fieldErrors?.password}
        inputClassName="auth-field-input rounded-md"
      />
      {state.status === 'error' && state.message ? (
        <p className="auth-form-error">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow className="auth-form-submit">
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>
      <p className="auth-form-footer">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="auth-form-link">
          Create one
        </Link>
      </p>
    </form>
  );
}
