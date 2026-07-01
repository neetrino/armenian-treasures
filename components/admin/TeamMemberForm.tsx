'use client';

import { useActionState, useEffect } from 'react';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  createTeamMemberAction,
  updateTeamMemberAction,
  type TeamFormState,
} from '@/app/(admin)/admin/(panel)/team/actions';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: TeamFormState = { status: 'idle' };

interface Initial {
  name: string;
  initials: string;
  position: string;
  bio: string;
  image: string;
  order: number;
  isActive: boolean;
}

interface Props {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: Initial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TeamMemberForm({ mode, itemId, initial, onSuccess, onCancel }: Props) {
  const updateBound = itemId ? updateTeamMemberAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createTeamMemberAction,
    INITIAL,
  );

  useEffect(() => {
    if (mode === 'create' && state.status === 'success') {
      onSuccess?.();
    }
  }, [mode, state.status, onSuccess]);

  const nameValues = decodeTranslatableText(initial?.name ?? '');
  const positionValues = decodeTranslatableText(initial?.position ?? '');
  const bioValues = decodeTranslatableText(initial?.bio ?? '');
  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const valueFor = (values: LocaleTextMap, locale: SiteLocaleCode): string => values[locale] ?? '';

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <TranslatableFieldsTabs tabErrors={tabErrors}>
        {(locale) => (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Name"
                name={`name.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(nameValues, locale)}
                error={state.fieldErrors?.[`name.${locale}`]}
              />
              <TextField
                label="Position"
                name={`position.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(positionValues, locale)}
                error={state.fieldErrors?.[`position.${locale}`]}
              />
            </div>
            <TextareaField
              label="Bio"
              name={`bio.${locale}`}
              rows={4}
              defaultValue={valueFor(bioValues, locale)}
              error={state.fieldErrors?.[`bio.${locale}`]}
            />
          </div>
        )}
      </TranslatableFieldsTabs>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Initials"
          name="initials"
          required
          maxLength={4}
          defaultValue={initial?.initials ?? ''}
          error={state.fieldErrors?.initials}
        />
        <TextField label="Order" name="order" type="number" min={0} defaultValue={initial?.order ?? 0} />
        <AdminImageDropzoneField
          label="Profile photo"
          name="image"
          folder="culture"
          layout="card"
          defaultValue={initial?.image ?? ''}
          hint="Upload a square portrait. Leave empty to show initials only."
        />
        <label className="flex items-center gap-2 pt-6 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={initial?.isActive ?? true}
            className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
          />
          Active
        </label>
      </div>
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : mode === 'create' ? 'Create member' : 'Save changes'}
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
