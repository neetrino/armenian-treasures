'use client';

import { useActionState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  saveSiteSettingsAction,
  type SettingsFormState,
} from '@/app/(admin)/admin/(panel)/settings/actions';
import { SiteLocaleSettingsField } from '@/components/admin/SiteLocaleSettingsField';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: SettingsFormState = { status: 'idle' };

interface Initial {
  foundationName: string;
  foundationSubtitle: string;
  footerDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  copyrightText: string;
  enabledLocales: SiteLocaleCode[];
  certificateGuardianUrl?: string;
  certificateAmbassadorUrl?: string;
  certificateMagistrUrl?: string;
}

interface Props {
  initial: Initial;
}

export function SiteSettingsForm({ initial }: Props) {
  const [state, formAction, isPending] = useActionState(saveSiteSettingsAction, INITIAL);
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Foundation name"
          name="foundationName"
          required
          defaultValue={initial.foundationName}
          error={state.fieldErrors?.foundationName}
        />
        <TextField
          label="Subtitle"
          name="foundationSubtitle"
          required
          defaultValue={initial.foundationSubtitle}
          error={state.fieldErrors?.foundationSubtitle}
        />
        <TextField
          label="Contact email"
          name="contactEmail"
          type="email"
          required
          defaultValue={initial.contactEmail}
          error={state.fieldErrors?.contactEmail}
        />
        <TextField
          label="Phone"
          name="phone"
          required
          defaultValue={initial.phone}
          error={state.fieldErrors?.phone}
        />
        <TextField
          label="Address"
          name="address"
          required
          defaultValue={initial.address}
          error={state.fieldErrors?.address}
        />
        <TextField
          label="Copyright"
          name="copyrightText"
          required
          defaultValue={initial.copyrightText}
          error={state.fieldErrors?.copyrightText}
        />
      </div>
      <TextareaField
        label="Footer description"
        name="footerDescription"
        rows={4}
        required
        defaultValue={initial.footerDescription}
        error={state.fieldErrors?.footerDescription}
      />
      <SiteLocaleSettingsField defaultEnabled={initial.enabledLocales} />
      <fieldset className="rounded-2xl border border-stone-100 bg-parchment-50 p-5">
        <legend className="px-2 font-display text-lg text-ink">Donation certificates</legend>
        <p className="mb-4 text-sm text-ink-muted">
          Template images shown on the public donate page for Guardian, Ambassador, and Magistr.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <AdminImageDropzoneField
            label="Guardian"
            name="certificateGuardianUrl"
            folder="culture"
            layout="card"
            defaultValue={initial.certificateGuardianUrl ?? ''}
          />
          <AdminImageDropzoneField
            label="Ambassador"
            name="certificateAmbassadorUrl"
            folder="culture"
            layout="card"
            defaultValue={initial.certificateAmbassadorUrl ?? ''}
          />
          <AdminImageDropzoneField
            label="Magistr"
            name="certificateMagistrUrl"
            folder="culture"
            layout="card"
            defaultValue={initial.certificateMagistrUrl ?? ''}
          />
        </div>
      </fieldset>
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      {state.status === 'success' ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Saving…' : 'Save settings'}
      </Button>
    </form>
  );
}
