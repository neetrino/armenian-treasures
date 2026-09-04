'use client';

import { useActionState, useMemo } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { SelectField, type SelectOption } from '@/components/forms/fields/SelectField';
import { Button } from '@/components/ui/Button';
import { submitProjectMaterial } from '@/app/(public)/culture/submit/actions';
import {
  GENERAL_CATEGORY_VALUE,
  PROJECT_SUBMISSION_INITIAL,
} from '@/app/(public)/culture/submit/project-submission-shared';
import { uiMessage } from '@/lib/i18n/ui-messages';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface ProjectSubmissionFormProps {
  categories: { id: string; title: string }[];
  locale?: SiteLocaleCode;
}

export function ProjectSubmissionForm({
  categories,
  locale = 'EN',
}: ProjectSubmissionFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitProjectMaterial,
    PROJECT_SUBMISSION_INITIAL,
  );
  const renderedAt = useMemo(() => Date.now(), []);
  const options: SelectOption[] = [
    { value: '', label: uiMessage(locale, 'selectCategory'), disabled: true },
    ...categories
      .filter((category) => category.id.length > 0)
      .map((category) => ({
        value: category.id,
        label: category.title,
      })),
    { value: GENERAL_CATEGORY_VALUE, label: uiMessage(locale, 'generalSubmission') },
  ];

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-card">
        <p className="eyebrow">{uiMessage(locale, 'submissionReceived')}</p>
        <h2 className="mt-3 font-display text-2xl text-ink">
          {state.message ?? uiMessage(locale, 'thankYouSubmission')}
        </h2>
        <p className="mt-3 text-sm text-ink-soft">{uiMessage(locale, 'submissionFollowUp')}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
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
          label={uiMessage(locale, 'yourName')}
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
        <TextField
          label={uiMessage(locale, 'projectTitle')}
          name="projectTitle"
          required
          maxLength={120}
          error={state.fieldErrors?.projectTitle}
        />
      </div>
      <SelectField
        label={uiMessage(locale, 'closestCategory')}
        name="category"
        required
        defaultValue=""
        options={options}
        error={state.fieldErrors?.category}
      />
      <TextareaField
        label={uiMessage(locale, 'describeProject')}
        name="description"
        required
        rows={7}
        error={state.fieldErrors?.description}
      />
      <TextareaField
        label={uiMessage(locale, 'additionalNotes')}
        name="message"
        rows={3}
        error={state.fieldErrors?.message}
      />
      {state.status === 'error' ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message ?? uiMessage(locale, 'somethingWrong')}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? uiMessage(locale, 'sending') : uiMessage(locale, 'sendSubmission')}
      </Button>
    </form>
  );
}
