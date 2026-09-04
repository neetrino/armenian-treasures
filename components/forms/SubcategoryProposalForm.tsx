'use client';

import { useActionState, useMemo } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { submitSubcategoryProposal, type SubmissionActionState } from '@/app/(public)/culture/[categorySlug]/new/actions';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface SubcategoryProposalFormProps {
  parentCategorySlug: string;
  locale: SiteLocaleCode;
}

const INITIAL_STATE: SubmissionActionState = { status: 'idle' };

export function SubcategoryProposalForm({ parentCategorySlug, locale }: SubcategoryProposalFormProps) {
  const [state, formAction, isPending] = useActionState(submitSubcategoryProposal, INITIAL_STATE);
  const renderedAt = useMemo(() => Date.now(), []);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-card">
        <p className="eyebrow">{uiMessage(locale, 'submissionReceived')}</p>
        <h2 className="mt-3 font-display text-2xl text-ink">
          {state.message ?? uiMessage(locale, 'thankYouSubmission')}
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          {uiMessage(locale, 'proposalFollowUp')}
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
          label={uiMessage(locale, 'subcatalogName')}
          name="proposedName"
          required
          maxLength={80}
          error={state.fieldErrors?.proposedName}
        />
        <TextField
          label={uiMessage(locale, 'yourFullName')}
          name="submitterName"
          required
          maxLength={80}
          error={state.fieldErrors?.submitterName}
        />
        <TextField
          label={uiMessage(locale, 'email')}
          name="submitterEmail"
          type="email"
          required
          error={state.fieldErrors?.submitterEmail}
        />
        <TextField
          label={uiMessage(locale, 'phoneOptional')}
          name="submitterPhone"
          type="tel"
          error={state.fieldErrors?.submitterPhone}
        />
      </div>
      <TextareaField
        label={uiMessage(locale, 'whySubcatalog')}
        name="description"
        required
        rows={6}
        error={state.fieldErrors?.description}
      />
      <TextareaField
        label={uiMessage(locale, 'additionalMessageOptional')}
        name="message"
        rows={4}
        error={state.fieldErrors?.message}
      />
      {state.status === 'error' ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message ?? uiMessage(locale, 'somethingWrong')}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? uiMessage(locale, 'submitting') : uiMessage(locale, 'submitProposal')}
      </Button>
    </form>
  );
}
