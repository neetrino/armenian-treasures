'use client';

import { useActionState, useEffect } from 'react';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  createDonatorAction,
  updateDonatorAction,
  type DonatorFormState,
} from '@/app/(admin)/admin/(panel)/donators/actions';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: DonatorFormState = { status: 'idle' };

interface Initial {
  name: string;
  type: string;
  year: number | null;
  description: string;
  order: number;
  isPublic: boolean;
}

interface Props {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: Initial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function DonatorForm({ mode, itemId, initial, onSuccess, onCancel }: Props) {
  const updateBound = itemId ? updateDonatorAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createDonatorAction,
    INITIAL,
  );

  useEffect(() => {
    if (mode === 'create' && state.status === 'success') {
      onSuccess?.();
    }
  }, [mode, state.status, onSuccess]);

  const nameValues = decodeTranslatableText(initial?.name ?? '');
  const typeValues = decodeTranslatableText(initial?.type ?? '');
  const descriptionValues = decodeTranslatableText(initial?.description ?? '');
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
                label="Type"
                name={`type.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(typeValues, locale)}
                hint='e.g. "Founding Patron"'
                error={state.fieldErrors?.[`type.${locale}`]}
              />
            </div>
            <TextareaField
              label="Description"
              name={`description.${locale}`}
              rows={3}
              defaultValue={valueFor(descriptionValues, locale)}
              error={state.fieldErrors?.[`description.${locale}`]}
            />
          </div>
        )}
      </TranslatableFieldsTabs>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Year" name="year" type="number" min={1900} max={2200} defaultValue={initial?.year ?? ''} error={state.fieldErrors?.year} />
        <TextField label="Order" name="order" type="number" min={0} defaultValue={initial?.order ?? 0} />
        <label className="flex items-center gap-2 pt-6 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="isPublic"
            defaultChecked={initial?.isPublic ?? true}
            className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
          />
          Public
        </label>
      </div>
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : mode === 'create' ? 'Create donator' : 'Save changes'}
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
