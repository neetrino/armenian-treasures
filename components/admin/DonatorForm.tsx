'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  createDonatorAction,
  updateDonatorAction,
  type DonatorFormState,
} from '@/app/(admin)/admin/(panel)/donators/actions';

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
}

export function DonatorForm({ mode, itemId, initial }: Props) {
  const updateBound = itemId ? updateDonatorAction.bind(null, itemId) : undefined;
  const [state, formAction] = useFormState(
    mode === 'edit' && updateBound ? updateBound : createDonatorAction,
    INITIAL,
  );
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required defaultValue={initial?.name ?? ''} error={state.fieldErrors?.name} />
        <TextField label="Type" name="type" required defaultValue={initial?.type ?? ''} hint='e.g. "Founding Patron"' error={state.fieldErrors?.type} />
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
      <TextareaField label="Description" name="description" rows={3} defaultValue={initial?.description ?? ''} error={state.fieldErrors?.description} />
      {state.status === 'error' && state.message ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">{state.message}</p>
      ) : null}
      <Submit mode={mode} />
    </form>
  );
}

function Submit({ mode }: { mode: 'create' | 'edit' }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} withArrow>
      {pending ? 'Saving…' : mode === 'create' ? 'Create donator' : 'Save changes'}
    </Button>
  );
}
