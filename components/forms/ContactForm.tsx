'use client';

import { useActionState, useMemo } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { submitContactMessage, type ContactActionState } from '@/app/(public)/contacts/actions';

const INITIAL: ContactActionState = { status: 'idle' };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, INITIAL);
  const renderedAt = useMemo(() => Date.now(), []);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-card">
        <p className="eyebrow">Message received</p>
        <h2 className="mt-3 font-display text-2xl text-ink">
          {state.message ?? 'Thank you. We have received your message.'}
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          A human will read your message within five working days.
        </p>
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
        <TextField label="Your name" name="name" required maxLength={80} error={state.fieldErrors?.name} />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          error={state.fieldErrors?.email}
        />
      </div>
      <TextareaField
        label="Message"
        name="message"
        required
        rows={7}
        error={state.fieldErrors?.message}
      />
      {state.status === 'error' ? (
        <p className="rounded-md bg-pomegranate/10 px-3 py-2 text-sm text-pomegranate">
          {state.message ?? 'Something went wrong. Please try again.'}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow>
        {isPending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
