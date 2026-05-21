'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { loginAction, type LoginActionState } from '@/app/(admin)/admin/login/actions';

const INITIAL: LoginActionState = { status: 'idle' };

export function AdminAuthForm() {
  const [state, formAction] = useFormState(loginAction, INITIAL);
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
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} withArrow>
      {pending ? 'Signing in…' : 'Sign in'}
    </Button>
  );
}
