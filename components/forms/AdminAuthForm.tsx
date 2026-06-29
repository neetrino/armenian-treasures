'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { loginAction, type LoginActionState } from '@/app/(admin)/admin/login/actions';

const INITIAL: LoginActionState = { status: 'idle' };

export function AdminAuthForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, INITIAL);

  useEffect(() => {
    if (state.status !== 'success' || !state.redirectTo) return;
    router.replace(state.redirectTo);
    router.refresh();
  }, [router, state.redirectTo, state.status]);
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        error={state.fieldErrors?.password}
      />
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
