'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import {
  createTeamMemberAction,
  updateTeamMemberAction,
  type TeamFormState,
} from '@/app/(admin)/admin/(panel)/team/actions';

const INITIAL: TeamFormState = { status: 'idle' };

interface Initial {
  name: string;
  initials: string;
  position: string;
  bio: string;
  image: string;
  order: number;
  isActive: boolean;
}

interface Props {
  mode: 'create' | 'edit';
  itemId?: string;
  initial?: Initial;
}

export function TeamMemberForm({ mode, itemId, initial }: Props) {
  const updateBound = itemId ? updateTeamMemberAction.bind(null, itemId) : undefined;
  const [state, formAction] = useFormState(
    mode === 'edit' && updateBound ? updateBound : createTeamMemberAction,
    INITIAL,
  );
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required defaultValue={initial?.name ?? ''} error={state.fieldErrors?.name} />
        <TextField
          label="Initials"
          name="initials"
          required
          maxLength={4}
          defaultValue={initial?.initials ?? ''}
          error={state.fieldErrors?.initials}
        />
        <TextField label="Position" name="position" required defaultValue={initial?.position ?? ''} error={state.fieldErrors?.position} />
        <TextField label="Order" name="order" type="number" min={0} defaultValue={initial?.order ?? 0} />
        <TextField label="Image URL (optional)" name="image" defaultValue={initial?.image ?? ''} />
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
      <TextareaField label="Bio" name="bio" rows={4} defaultValue={initial?.bio ?? ''} error={state.fieldErrors?.bio} />
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
      {pending ? 'Saving…' : mode === 'create' ? 'Create member' : 'Save changes'}
    </Button>
  );
}
