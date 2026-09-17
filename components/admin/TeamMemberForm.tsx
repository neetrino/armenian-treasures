'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CultureItemEditorLocaleTabs } from '@/components/admin/culture-item-editor/CultureItemEditorLocaleTabs';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { AdminLocaleAwareTextField } from '@/components/forms/fields/AdminLocaleAwareTextField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import {
  createTeamMemberAction,
  updateTeamMemberAction,
  type TeamFormState,
} from '@/app/(admin)/admin/(panel)/team/actions';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';

const INITIAL: TeamFormState = { status: 'idle' };

export interface TeamMemberFormInitial {
  name: string;
  initials: string;
  position: string;
  bio: string;
  image: string;
  order: number;
  isActive: boolean;
}

interface TeamMemberFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: TeamMemberFormInitial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function localeHasContent(name: string, position: string, bio: string): boolean {
  return name.trim().length > 0 || position.trim().length > 0 || bio.trim().length > 0;
}

function valueFor(values: LocaleTextMap, locale: SiteLocaleCode): string {
  return values[locale] ?? '';
}

export function TeamMemberForm({ mode, itemId, initial, onSuccess, onCancel }: TeamMemberFormProps) {
  const router = useRouter();
  const updateBound = itemId ? updateTeamMemberAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createTeamMemberAction,
    INITIAL,
  );
  const [activeLocale, setActiveLocale] = useState<SiteLocaleCode>('EN');
  const [nameValues, setNameValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(initial?.name ?? ''),
  );
  const [positionValues, setPositionValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(initial?.position ?? ''),
  );
  const [bioValues, setBioValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(initial?.bio ?? ''),
  );

  useEffect(() => {
    if (state.status !== 'success') return;
    if (onSuccess) {
      onSuccess();
      return;
    }
    router.push('/admin/team');
    router.refresh();
  }, [onSuccess, router, state.status]);

  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const completedLocales = useMemo(
    () =>
      Object.fromEntries(
        SITE_LOCALE_CODES.map((code) => [
          code,
          localeHasContent(
            valueFor(nameValues, code),
            valueFor(positionValues, code),
            valueFor(bioValues, code),
          ),
        ]),
      ) as Partial<Record<SiteLocaleCode, boolean>>,
    [bioValues, nameValues, positionValues],
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
        <CultureItemEditorLocaleTabs
          activeLocale={activeLocale}
          completedLocales={completedLocales}
          tabErrors={tabErrors}
          onChange={setActiveLocale}
        />
        <p className="text-sm text-ink-muted">
          Fill any language. English is optional. Switching tabs keeps every locale.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminLocaleAwareTextField
            name="name"
            label="Name"
            values={nameValues}
            activeLocale={activeLocale}
            onValuesChange={setNameValues}
            error={state.fieldErrors?.name ?? state.fieldErrors?.[`name.${activeLocale}`]}
          />
          <AdminLocaleAwareTextField
            name="position"
            label="Position"
            values={positionValues}
            activeLocale={activeLocale}
            onValuesChange={setPositionValues}
            error={state.fieldErrors?.position ?? state.fieldErrors?.[`position.${activeLocale}`]}
          />
        </div>
        <AdminLocaleAwareTextField
          name="bio"
          label="Bio"
          multiline
          rows={4}
          values={bioValues}
          activeLocale={activeLocale}
          onValuesChange={setBioValues}
          error={state.fieldErrors?.bio ?? state.fieldErrors?.[`bio.${activeLocale}`]}
        />
      </div>

      <div className="grid gap-5 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-5">
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
        ) : (
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/team')}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
