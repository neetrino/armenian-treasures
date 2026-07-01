'use client';

import { useActionState, useEffect } from 'react';
import { AdminImageDropzoneField } from '@/components/forms/fields/AdminImageDropzoneField';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { toBlogDateInputValue } from '@/lib/format-blog-date';
import {
  createBlogPostAction,
  updateBlogPostAction,
  type BlogFormState,
} from '@/app/(admin)/admin/(panel)/blog/actions';

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

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Title"
          name="title"
          required
          defaultValue={initial?.title ?? ''}
          error={state.fieldErrors?.title}
        />
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
      <TextareaField
        label="Description"
        name="content"
        rows={12}
        required
        defaultValue={initial?.content ?? ''}
        hint="Shown in full on the article page. Long text is shortened automatically on blog cards."
        error={state.fieldErrors?.content}
      />
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
