'use client';

import { useActionState, useEffect } from 'react';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  createCareerAction,
  updateCareerAction,
  type CareerFormState,
} from '@/app/(admin)/admin/(panel)/careers/actions';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: CareerFormState = { status: 'idle' };

interface Initial {
  title: string;
  location: string;
  employmentType: string;
  description: string;
  applyUrl: string;
  applyEmail: string;
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

export function CareerForm({ mode, itemId, initial, onSuccess, onCancel }: Props) {
  const updateBound = itemId ? updateCareerAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createCareerAction,
    INITIAL,
  );

  useEffect(() => {
    if (mode === 'create' && state.status === 'success') {
      onSuccess?.();
    }
  }, [mode, state.status, onSuccess]);

  const titleValues = decodeTranslatableText(initial?.title ?? '');
  const locationValues = decodeTranslatableText(initial?.location ?? '');
  const employmentTypeValues = decodeTranslatableText(initial?.employmentType ?? '');
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
                label="Title"
                name={`title.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(titleValues, locale)}
                error={state.fieldErrors?.[`title.${locale}`]}
              />
              <TextField
                label="Location"
                name={`location.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(locationValues, locale)}
                error={state.fieldErrors?.[`location.${locale}`]}
              />
              <TextField
                label="Employment type"
                name={`employmentType.${locale}`}
                required={locale === 'EN'}
                defaultValue={valueFor(employmentTypeValues, locale)}
                error={state.fieldErrors?.[`employmentType.${locale}`]}
              />
            </div>
            <TextareaField
              label="Description"
              name={`description.${locale}`}
              rows={5}
              defaultValue={valueFor(descriptionValues, locale)}
              error={state.fieldErrors?.[`description.${locale}`]}
            />
          </div>
        )}
      </TranslatableFieldsTabs>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Order" name="order" type="number" min={0} defaultValue={initial?.order ?? 0} />
        <TextField label="Apply URL" name="applyUrl" defaultValue={initial?.applyUrl ?? ''} error={state.fieldErrors?.applyUrl} />
        <TextField label="Apply email" name="applyEmail" type="email" defaultValue={initial?.applyEmail ?? ''} error={state.fieldErrors?.applyEmail} />
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
          {isPending ? 'Saving…' : mode === 'create' ? 'Create role' : 'Save changes'}
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
