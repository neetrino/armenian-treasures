'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { COUNTRY_OPTIONS } from '@/lib/constants/countries';
import { SelectField } from '@/components/forms/fields/SelectField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { registerAction, type MemberRegisterActionState } from '@/app/(public)/register/actions';

const INITIAL: MemberRegisterActionState = { status: 'idle' };

const countrySelectOptions = [
  { value: '', label: 'Select country', disabled: true },
  ...COUNTRY_OPTIONS,
];

export function MemberRegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, INITIAL);

  return (
    <form action={formAction} className="auth-form">
      <SelectField
        label="Country"
        name="country"
        required
        defaultValue=""
        options={countrySelectOptions}
        error={state.fieldErrors?.country}
        className="auth-field-input rounded-md"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
        inputClassName="auth-field-input rounded-md"
      />
      <div className="auth-form-row">
        <TextField
          label="Name"
          name="name"
          required
          autoComplete="given-name"
          maxLength={80}
          error={state.fieldErrors?.name}
          inputClassName="auth-field-input rounded-md"
        />
        <TextField
          label="Surname"
          name="surname"
          required
          autoComplete="family-name"
          maxLength={80}
          error={state.fieldErrors?.surname}
          inputClassName="auth-field-input rounded-md"
        />
      </div>
      <TextField
        label="Phone"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        maxLength={40}
        error={state.fieldErrors?.phone}
        inputClassName="auth-field-input rounded-md"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        hint="At least 8 characters"
        error={state.fieldErrors?.password}
        inputClassName="auth-field-input rounded-md"
      />
      {state.status === 'error' && state.message ? (
        <p className="auth-form-error">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow className="auth-form-submit">
        {isPending ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="auth-form-footer">
        Already have an account?{' '}
        <Link href="/login" className="auth-form-link">
          Sign in
        </Link>
      </p>
    </form>
  );
}
