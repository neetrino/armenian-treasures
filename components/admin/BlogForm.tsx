'use client';

import { useActionState, useEffect } from 'react';
import { TranslatableFieldsTabs } from '@/components/admin/TranslatableFieldsTabs';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { RichTextField } from '@/components/forms/fields/RichTextField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import { toBlogDateInputValue } from '@/lib/format-blog-date';
import {
  createBlogPostAction,
  updateBlogPostAction,
  type BlogFormState,
} from '@/app/(admin)/admin/(panel)/blog/actions';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: BlogFormState = { status: 'idle' };

interface Initial {
  title: string;
  content: string;
  image: string;
  publishedAt: string;
  isPublished: boolean;
}

interface BlogFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: Initial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BlogForm({ mode, itemId, initial, onSuccess, onCancel }: BlogFormProps) {
  const updateBound = itemId ? updateBlogPostAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createBlogPostAction,
    INITIAL,
  );

  useEffect(() => {
    if (state.status !== 'success') return;
    onSuccess?.();
  }, [onSuccess, state.status]);

  const publishedAtDefault = initial?.publishedAt
    ? toBlogDateInputValue(initial.publishedAt)
    : new Date().toISOString().slice(0, 10);
  const titleValues = decodeTranslatableText(initial?.title ?? '');
  const contentValues = decodeTranslatableText(initial?.content ?? '');
  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const valueFor = (values: LocaleTextMap, locale: SiteLocaleCode): string => values[locale] ?? '';

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <TranslatableFieldsTabs tabErrors={tabErrors}>
        {(locale) => (
          <div className="grid gap-5">
            <TextField
              label="Title"
              name={`title.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(titleValues, locale)}
              error={state.fieldErrors?.[`title.${locale}`]}
            />
            <RichTextField
              label="Description"
              name={`content.${locale}`}
              required={locale === 'EN'}
              defaultValue={valueFor(contentValues, locale)}
              hint="Shown in full on the article page. Long text is shortened automatically on blog cards."
              error={state.fieldErrors?.[`content.${locale}`]}
            />
          </div>
        )}
      </TranslatableFieldsTabs>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Publish date"
          name="publishedAt"
          type="date"
          required
          defaultValue={publishedAtDefault}
          error={state.fieldErrors?.publishedAt}
        />
        <div className="sm:col-span-2">
          <AdminImageDropzoneField
            label="Cover image"
            name="image"
            folder="culture"
            layout="banner"
            defaultValue={initial?.image ?? ''}
            hint="Use a wide landscape photo (16:9 or wider). The same image is used on the blog card and the full-width article hero."
          />
        </div>
        <label className="flex items-center gap-2 pt-1 text-sm text-ink-soft sm:col-span-2">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={initial?.isPublished ?? true}
            className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
          />
          Published on the public blog
        </label>
      </div>
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : mode === 'create' ? 'Create post' : 'Save changes'}
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
