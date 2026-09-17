'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { CultureItemEditorLocaleTabs } from '@/components/admin/culture-item-editor/CultureItemEditorLocaleTabs';
import { CultureItemFeaturedFields } from '@/components/admin/CultureItemFeaturedFields';
import { BlogEditorBlocksField } from '@/components/admin/blog-editor/BlogEditorBlocksField';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { AdminLocaleAwareTextField } from '@/components/forms/fields/AdminLocaleAwareTextField';
import { DatePickerField } from '@/components/forms/fields/DatePickerField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/Button';
import {
  createBlogPostAction,
  updateBlogPostAction,
  type BlogFormState,
} from '@/app/(admin)/admin/(panel)/blog/actions';
import { hydrateBlogContentBlocks, type BlogContentBlock } from '@/lib/blog-content-blocks';
import { toBlogDateInputValue } from '@/lib/format-blog-date';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import {
  buildTabErrorMap,
  decodeTranslatableText,
  pickDefaultLocaleText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';

const INITIAL: BlogFormState = { status: 'idle' };

export interface BlogPostFormInitial {
  title: string;
  slug: string;
  content: string;
  shortDescription: string;
  image: string;
  headerImage: string;
  galleryContent?: unknown;
  contentBlocks?: unknown;
  publishedAt: string;
  isPublished: boolean;
  featuredOnHome?: boolean;
  featuredOrder?: number | null;
  categoryId?: string | null;
}

export interface BlogCategoryOption {
  id: string;
  title: string;
}

interface BlogPostFormProps {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: BlogPostFormInitial;
  categories: BlogCategoryOption[];
}

function localeHasContent(title: string, shortDescription: string): boolean {
  return title.trim().length > 0 || shortDescription.trim().length > 0;
}

function valueFor(values: LocaleTextMap, locale: SiteLocaleCode): string {
  return values[locale] ?? '';
}

export function BlogPostForm({ mode, itemId, initial, categories }: BlogPostFormProps) {
  const router = useRouter();
  const updateBound = itemId ? updateBlogPostAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createBlogPostAction,
    INITIAL,
  );
  const [activeLocale, setActiveLocale] = useState<SiteLocaleCode>('EN');
  const [titleValues, setTitleValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(initial?.title ?? ''),
  );
  const [shortDescriptionValues, setShortDescriptionValues] = useState<LocaleTextMap>(() =>
    decodeTranslatableText(initial?.shortDescription ?? ''),
  );
  const [blocks, setBlocks] = useState<BlogContentBlock[]>(() =>
    hydrateBlogContentBlocks({
      contentBlocks: initial?.contentBlocks,
      content: initial?.content,
      galleryContent: initial?.galleryContent,
    }),
  );
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));

  useEffect(() => {
    if (slugTouched) return;
    setSlug(slugify(pickDefaultLocaleText(titleValues), { lower: true, strict: true }));
  }, [slugTouched, titleValues]);

  useEffect(() => {
    if (state.status !== 'success') return;
    if (mode === 'create' && state.itemId) {
      router.push(`/admin/blog/${state.itemId}`);
      return;
    }
    router.refresh();
  }, [mode, router, state.itemId, state.status]);

  const tabErrors = buildTabErrorMap(state.fieldErrors);
  const completedLocales = useMemo(
    () =>
      Object.fromEntries(
        SITE_LOCALE_CODES.map((code) => [
          code,
          localeHasContent(valueFor(titleValues, code), valueFor(shortDescriptionValues, code)),
        ]),
      ) as Partial<Record<SiteLocaleCode, boolean>>,
    [shortDescriptionValues, titleValues],
  );

  const publishedAtDefault = initial?.publishedAt
    ? toBlogDateInputValue(initial.publishedAt)
    : new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="sticky top-0 z-30 flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white/95 p-4 shadow-sm backdrop-blur-md sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="font-display text-2xl text-ink sm:text-3xl">
            {mode === 'create' ? 'Create post' : 'Edit post'}
          </h1>
          <CultureItemEditorLocaleTabs
            activeLocale={activeLocale}
            completedLocales={completedLocales}
            tabErrors={tabErrors}
            onChange={setActiveLocale}
          />
        </div>
        <p className="text-sm text-ink-muted">
          Fill any language. English is optional. Switching tabs keeps every locale.
        </p>
        {state.status === 'error' && state.message ? (
          <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={isPending} withArrow>
            {isPending ? 'Saving…' : mode === 'create' ? 'Create post' : 'Save changes'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/blog')}>
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
        <AdminLocaleAwareTextField
          name="title"
          label="Title"
          values={titleValues}
          activeLocale={activeLocale}
          onValuesChange={setTitleValues}
          error={state.fieldErrors?.title ?? state.fieldErrors?.[`title.${activeLocale}`]}
        />
        <AdminLocaleAwareTextField
          name="shortDescription"
          label="Short description"
          multiline
          rows={3}
          values={shortDescriptionValues}
          activeLocale={activeLocale}
          onValuesChange={setShortDescriptionValues}
          hint="Shown as the excerpt on blog cards and homepage stories. Hidden on the article page."
          error={
            state.fieldErrors?.shortDescription ?? state.fieldErrors?.[`shortDescription.${activeLocale}`]
          }
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Slug"
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            hint="One URL for every language. Lowercase letters, numbers, and hyphens."
            error={state.fieldErrors?.slug}
          />
          <SelectField
            label="Category"
            name="categoryId"
            defaultValue={initial?.categoryId ?? ''}
            options={[
              { value: '', label: 'No category' },
              ...categories.map((category) => ({ value: category.id, label: category.title })),
            ]}
            error={state.fieldErrors?.categoryId}
          />
          <DatePickerField
            label="Publish date"
            name="publishedAt"
            required
            defaultValue={publishedAtDefault}
            error={state.fieldErrors?.publishedAt}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-ink">Content blocks</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Add headings, descriptions, photos, YouTube, galleries, and links. Drag to reorder.
          </p>
        </div>
        <BlogEditorBlocksField blocks={blocks} onChange={setBlocks} activeLocale={activeLocale} />
      </div>

      <div className="grid gap-5 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
        <AdminImageDropzoneField
          label="Cover image"
          name="image"
          folder="culture"
          layout="banner"
          defaultValue={initial?.image ?? ''}
          hint="Cover visual on blog cards and listings."
        />
        <AdminImageDropzoneField
          label="Article header"
          name="headerImage"
          folder="culture"
          layout="banner"
          defaultValue={initial?.headerImage ?? ''}
          hint="Full-width hero on the article page. Falls back to the cover if empty."
        />
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={initial?.isPublished ?? true}
            className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
          />
          Published on the public blog
        </label>
        <CultureItemFeaturedFields
          featuredOnHome={initial?.featuredOnHome ?? false}
          featuredOrder={initial?.featuredOrder}
          featuredOrderError={state.fieldErrors?.featuredOrder}
          label="Show in Stories from the Heritage Community"
          showCatalogToggle={false}
        />
      </div>
    </form>
  );
}
