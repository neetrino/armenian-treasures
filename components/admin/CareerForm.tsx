'use client';

import { useActionState, useEffect } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  createCareerAction,
  updateCareerAction,
  type CareerFormState,
} from '@/app/(admin)/admin/(panel)/careers/actions';

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

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Title" name="title" required defaultValue={initial?.title ?? ''} error={state.fieldErrors?.title} />
        <TextField label="Location" name="location" required defaultValue={initial?.location ?? ''} error={state.fieldErrors?.location} />
        <TextField label="Employment type" name="employmentType" required defaultValue={initial?.employmentType ?? ''} error={state.fieldErrors?.employmentType} />
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
      <TextareaField label="Description" name="description" rows={5} defaultValue={initial?.description ?? ''} error={state.fieldErrors?.description} />
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
