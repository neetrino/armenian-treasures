'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { CultureItemEditorLocaleTabs } from '@/components/admin/culture-item-editor/CultureItemEditorLocaleTabs';
import { AdminLocaleAwareTextField } from '@/components/forms/fields/AdminLocaleAwareTextField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import {
  createBlogCategoryAction,
  updateBlogCategoryAction,
  type BlogCategoryFormState,
} from '@/app/(admin)/admin/(panel)/blog/categories/actions';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  pickDefaultLocaleText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';

const INITIAL: BlogCategoryFormState = { status: 'idle' };

export interface BlogCategoryFormInitial {
  title: string;
  slug: string;
  order: number;
}

interface BlogCategoryFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: BlogCategoryFormInitial;
}

function valueFor(values: LocaleTextMap, locale: SiteLocaleCode): string {
  return values[locale] ?? '';
}

export function BlogCategoryForm({ mode, itemId, initial }: BlogCategoryFormProps) {
  const router = useRouter();
  const updateBound = itemId ? updateBlogCategoryAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createBlogCategoryAction,
    INITIAL,
  );
  const [activeLocale, setActiveLocale] = useState<SiteLocaleCode>('EN');
  const [titleValues, setTitleValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(initial?.title ?? ''),
  );
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));

  useEffect(() => {
    if (slugTouched) return;
    setSlug(slugify(pickDefaultLocaleText(titleValues), { lower: true, strict: true }));
  }, [slugTouched, titleValues]);

  useEffect(() => {
    if (state.status !== 'success') return;
    router.push('/admin/blog/categories');
    router.refresh();
  }, [router, state.status]);

  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const completedLocales = useMemo(
    () =>
      Object.fromEntries(
        SITE_LOCALE_CODES.map((code) => [code, Boolean(valueFor(titleValues, code).trim())]),
      ) as Partial<Record<SiteLocaleCode, boolean>>,
    [titleValues],
  );

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="font-display text-2xl text-ink sm:text-3xl">
            {mode === 'create' ? 'Create category' : 'Edit category'}
          </h1>
          <CultureItemEditorLocaleTabs
            activeLocale={activeLocale}
            completedLocales={completedLocales}
            tabErrors={tabErrors}
            onChange={setActiveLocale}
          />
        </div>
        <p className="text-sm text-ink-muted">
          Flat categories only — name, slug, and translations. English is not required.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
        <AdminLocaleAwareTextField
          name="title"
          label="Name"
          values={titleValues}
          activeLocale={activeLocale}
          onValuesChange={setTitleValues}
          error={state.fieldErrors?.title ?? state.fieldErrors?.[`title.${activeLocale}`]}
        />
        <TextField
          label="Slug"
          name="slug"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
          hint="Used in public blog tabs. One slug for every language."
          error={state.fieldErrors?.slug}
        />
      </div>

      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : mode === 'create' ? 'Create category' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/admin/blog/categories')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
