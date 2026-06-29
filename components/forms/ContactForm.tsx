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
      <div className="contact-success">
        <p className="contact-label">Message received</p>
        <h2 className="mt-3 font-cinzel text-2xl font-extrabold uppercase tracking-[0.02em] text-heritage-gold">
          {state.message ?? 'Thank you. We have received your message.'}
        </h2>
        <p className="mt-3 font-display text-[15px] leading-[1.65] text-[rgba(232,216,155,0.7)]">
          A human will read your message within five working days.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form">
      <input type="hidden" name="renderedAt" value={renderedAt} />
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="absolute h-0 w-0 -z-10 opacity-0"
      />
      <div className="contact-form-row">
        <TextField
          label="Your name"
          name="name"
          required
          maxLength={80}
          error={state.fieldErrors?.name}
          labelClassName="contact-label"
          inputClassName="contact-input"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          error={state.fieldErrors?.email}
          labelClassName="contact-label"
          inputClassName="contact-input"
        />
      </div>
      <div className="contact-form-message">
        <TextareaField
          label="Message"
          name="message"
          required
          rows={7}
          error={state.fieldErrors?.message}
          labelClassName="contact-label"
          textareaClassName="contact-input contact-textarea"
        />
      </div>
      {state.status === 'error' ? (
        <p className="rounded-md border border-[rgba(196,61,77,0.45)] bg-[rgba(196,61,77,0.1)] px-3 py-2 text-sm text-[#f0a3ad]">
          {state.message ?? 'Something went wrong. Please try again.'}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow className="contact-submit">
        {isPending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
