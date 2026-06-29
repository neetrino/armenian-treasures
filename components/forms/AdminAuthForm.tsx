'use client';

import { useActionState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { loginAction, type LoginActionState } from '@/app/(admin)/admin/login/actions';

const INITIAL: LoginActionState = { status: 'idle' };

export function AdminAuthForm() {
  const [state, formAction, isPending] = useActionState(loginAction, INITIAL);
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
      {state.debug ? (
        <pre className="overflow-x-auto rounded-md bg-neutral-900 px-3 py-2 text-xs text-neutral-100">
          {JSON.stringify(state.debug, null, 2)}
        </pre>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
