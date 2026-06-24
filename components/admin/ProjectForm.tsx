'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { Button } from '@/components/ui/Button';
import {
  createProjectAction,
  updateProjectAction,
  type ProjectFormState,
} from '@/app/(admin)/admin/(panel)/projects/actions';

const STATUSES = ['UPCOMING', 'ACTIVE', 'FUNDED', 'COMPLETED', 'ARCHIVED'];
const INITIAL: ProjectFormState = { status: 'idle' };

interface Initial {
  title: string;
  slug: string;
  category: string;
  region: string;
  description: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  status: string;
  order: number;
  isPublished: boolean;
}

interface Props {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: Initial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProjectForm({ mode, itemId, initial, onSuccess, onCancel }: Props) {
  const router = useRouter();
  const updateBound = itemId ? updateProjectAction.bind(null, itemId) : undefined;
  const [state, formAction, isPending] = useActionState(
    mode === 'edit' && updateBound ? updateBound : createProjectAction,
    INITIAL,
  );

  useEffect(() => {
    if (state.status !== 'success') return;
    if (onSuccess) {
      onSuccess();
      return;
    }
    if (mode === 'edit') {
      router.refresh();
    }
  }, [mode, onSuccess, router, state.status]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Title" name="title" required defaultValue={initial?.title ?? ''} error={state.fieldErrors?.title} />
        <TextField label="Slug" name="slug" defaultValue={initial?.slug ?? ''} hint="Lowercase, hyphenated" error={state.fieldErrors?.slug} />
        <TextField label="Category" name="category" required defaultValue={initial?.category ?? ''} error={state.fieldErrors?.category} />
        <TextField label="Region" name="region" defaultValue={initial?.region ?? ''} error={state.fieldErrors?.region} />
        <TextField
          label="Goal amount (USD)"
          name="goalAmount"
          type="number"
          min={0}
          required
          defaultValue={initial?.goalAmount ?? 0}
          error={state.fieldErrors?.goalAmount}
        />
        <TextField
          label="Raised amount (USD)"
          name="raisedAmount"
          type="number"
          min={0}
          defaultValue={initial?.raisedAmount ?? 0}
          error={state.fieldErrors?.raisedAmount}
        />
        <SelectField
          label="Status"
          name="status"
          options={STATUSES.map((s) => ({ value: s, label: s }))}
          defaultValue={initial?.status ?? 'UPCOMING'}
          error={state.fieldErrors?.status}
        />
        <TextField label="Order" name="order" type="number" min={0} defaultValue={initial?.order ?? 0} />
        <TextField label="Image URL" name="image" defaultValue={initial?.image ?? ''} />
        <label className="flex items-center gap-2 pt-6 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={initial?.isPublished ?? true}
            className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
          />
          Published
        </label>
      </div>
      <TextareaField
        label="Description"
        name="description"
        rows={5}
        defaultValue={initial?.description ?? ''}
        error={state.fieldErrors?.description}
      />
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} withArrow>
          {isPending ? 'Saving…' : mode === 'create' ? 'Create project' : 'Save changes'}
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
