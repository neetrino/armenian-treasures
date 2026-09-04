'use client';

import Link from 'next/link';
import { useActionState, useMemo } from 'react';
import { COUNTRY_OPTIONS } from '@/lib/constants/countries';
import { SelectField } from '@/components/forms/fields/SelectField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { registerAction, type MemberRegisterActionState } from '@/app/(public)/register/actions';
import { uiMessage } from '@/lib/i18n/ui-messages';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: MemberRegisterActionState = { status: 'idle' };

interface MemberRegisterFormProps {
  locale?: SiteLocaleCode;
}

export function MemberRegisterForm({ locale = 'EN' }: MemberRegisterFormProps) {
  const [state, formAction, isPending] = useActionState(registerAction, INITIAL);
  const countrySelectOptions = useMemo(
    () => [
      { value: '', label: uiMessage(locale, 'selectCountry'), disabled: true },
      ...COUNTRY_OPTIONS,
    ],
    [locale],
  );

  return (
    <form action={formAction} className="auth-form">
      <SelectField
        label={uiMessage(locale, 'country')}
        name="country"
        required
        defaultValue=""
        options={countrySelectOptions}
        error={state.fieldErrors?.country}
        className="auth-field-input rounded-md"
      />
      <TextField
        label={uiMessage(locale, 'email')}
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
        inputClassName="auth-field-input rounded-md"
      />
      <div className="auth-form-row">
        <TextField
          label={uiMessage(locale, 'name')}
          name="name"
          required
          autoComplete="given-name"
          maxLength={80}
          error={state.fieldErrors?.name}
          inputClassName="auth-field-input rounded-md"
        />
        <TextField
          label={uiMessage(locale, 'surname')}
          name="surname"
          required
          autoComplete="family-name"
          maxLength={80}
          error={state.fieldErrors?.surname}
          inputClassName="auth-field-input rounded-md"
        />
      </div>
      <TextField
        label={uiMessage(locale, 'phone')}
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        maxLength={40}
        error={state.fieldErrors?.phone}
        inputClassName="auth-field-input rounded-md"
      />
      <TextField
        label={uiMessage(locale, 'password')}
        name="password"
        type="password"
        required
        autoComplete="new-password"
        hint={uiMessage(locale, 'passwordHint')}
        error={state.fieldErrors?.password}
        inputClassName="auth-field-input rounded-md"
      />
      {state.status === 'error' && state.message ? (
        <p className="auth-form-error">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow className="auth-form-submit">
        {isPending ? uiMessage(locale, 'creatingAccount') : uiMessage(locale, 'createAccount')}
      </Button>
      <p className="auth-form-footer">
        {uiMessage(locale, 'haveAccount')}{' '}
        <Link href="/login" className="auth-form-link">
          {uiMessage(locale, 'signIn')}
        </Link>
      </p>
    </form>
  );
}
