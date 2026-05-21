'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useMemo } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { submitSubcategoryProposal, type SubmissionActionState } from '@/app/(public)/culture/[categorySlug]/new/actions';

interface SubcategoryProposalFormProps {
  parentCategorySlug: string;
}

const INITIAL_STATE: SubmissionActionState = { status: 'idle' };

export function SubcategoryProposalForm({ parentCategorySlug }: SubcategoryProposalFormProps) {
  const [state, formAction] = useFormState(submitSubcategoryProposal, INITIAL_STATE);
  const renderedAt = useMemo(() => Date.now(), []);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-card">
        <p className="eyebrow">Submission received</p>
        <h2 className="mt-3 font-display text-2xl text-ink">
          {state.message ?? 'Thank you. Your proposal is queued for review.'}
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          Our curators review every entry by hand. You will not receive an automated email — we
          will be in touch only if we need clarification.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="parentCategorySlug" value={parentCategorySlug} />
      <input type="hidden" name="renderedAt" value={renderedAt} />
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="absolute h-0 w-0 -z-10 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Sub-catalog name"
          name="proposedName"
          required
          maxLength={80}
          error={state.fieldErrors?.proposedName}
        />
        <TextField
          label="Your full name"
          name="submitterName"
          required
          maxLength={80}
          error={state.fieldErrors?.submitterName}
        />
        <TextField
          label="Email"
          name="submitterEmail"
          type="email"
          required
          error={state.fieldErrors?.submitterEmail}
        />
        <TextField
          label="Phone (optional)"
          name="submitterPhone"
          type="tel"
          error={state.fieldErrors?.submitterPhone}
        />
      </div>
      <TextareaField
        label="Why should this sub-catalog exist?"
        name="description"
        required
        rows={6}
        error={state.fieldErrors?.description}
      />
      <TextareaField
        label="Additional message (optional)"
        name="message"
        rows={4}
        error={state.fieldErrors?.message}
      />
      {state.status === 'error' ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message ?? 'Something went wrong. Please try again.'}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} withArrow>
      {pending ? 'Submitting…' : 'Submit proposal'}
    </Button>
  );
}
