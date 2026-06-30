'use client';

import { useActionState } from 'react';
import { COUNTRY_OPTIONS } from '@/lib/constants/countries';
import type { MemberContext } from '@/lib/auth/member-session';
import { SelectField } from '@/components/forms/fields/SelectField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { updateProfileAction, type MemberProfileActionState } from '@/app/(public)/profile/actions';

const INITIAL: MemberProfileActionState = { status: 'idle' };

const countrySelectOptions = COUNTRY_OPTIONS;

interface MemberProfileFormProps {
  member: MemberContext;
}

export function MemberProfileForm({ member }: MemberProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, INITIAL);

  return (
    <form action={formAction} className="auth-form auth-profile-form">
      <SelectField
        label="Country"
        name="country"
        required
        defaultValue={member.country}
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
        defaultValue={member.email}
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
          defaultValue={member.name}
          error={state.fieldErrors?.name}
          inputClassName="auth-field-input rounded-md"
        />
        <TextField
          label="Surname"
          name="surname"
          required
          autoComplete="family-name"
          maxLength={80}
          defaultValue={member.surname}
          error={state.fieldErrors?.surname}
          inputClassName="auth-field-input rounded-md"
        />
      </div>
      <TextField
        label="Phone"
        name="phone"
        type="tel"
        required
        autoComplete="off"
        inputMode="tel"
        maxLength={40}
        defaultValue={member.phone}
        error={state.fieldErrors?.phone}
        inputClassName="auth-field-input rounded-md"
      />

      <div className="auth-profile-password-block">
        <p className="auth-profile-section-label">Change password</p>
        <p className="auth-profile-section-hint">Leave blank to keep your current password.</p>
        <div className="auth-form-row">
          <TextField
            label="Current password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            error={state.fieldErrors?.currentPassword}
            inputClassName="auth-field-input rounded-md"
          />
          <TextField
            label="New password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            hint="At least 8 characters"
            error={state.fieldErrors?.newPassword}
            inputClassName="auth-field-input rounded-md"
          />
        </div>
      </div>

      {state.status === 'success' && state.message ? (
        <p className="auth-form-success">{state.message}</p>
      ) : null}
      {state.status === 'error' && state.message ? (
        <p className="auth-form-error">{state.message}</p>
      ) : null}

      <Button type="submit" disabled={isPending} withArrow className="auth-form-submit">
        {isPending ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  );
}
