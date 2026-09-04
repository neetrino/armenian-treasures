'use client';

import { useActionState, useMemo } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { submitContactMessage, type ContactActionState } from '@/app/(public)/contacts/actions';
import { uiMessage } from '@/lib/i18n/ui-messages';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

const INITIAL: ContactActionState = { status: 'idle' };

interface ContactFormProps {
  locale?: SiteLocaleCode;
}

export function ContactForm({ locale = 'EN' }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactMessage, INITIAL);
  const renderedAt = useMemo(() => Date.now(), []);

  if (state.status === 'success') {
    return (
      <div className="contact-success">
        <p className="contact-label">{uiMessage(locale, 'messageReceived')}</p>
        <h2 className="mt-3 font-cinzel text-2xl font-extrabold uppercase tracking-[0.02em] text-heritage-gold">
          {state.message ?? uiMessage(locale, 'thankYouContact')}
        </h2>
        <p className="mt-3 font-display text-[15px] leading-[1.65] text-surface-muted">
          {uiMessage(locale, 'contactFollowUp')}
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
          label={uiMessage(locale, 'yourName')}
          name="name"
          required
          maxLength={80}
          error={state.fieldErrors?.name}
          labelClassName="contact-label"
          inputClassName="contact-input"
        />
        <TextField
          label={uiMessage(locale, 'email')}
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
          label={uiMessage(locale, 'message')}
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
          {state.message ?? uiMessage(locale, 'somethingWrong')}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending} withArrow className="contact-submit">
        {isPending ? uiMessage(locale, 'sending') : uiMessage(locale, 'sendMessage')}
      </Button>
    </form>
  );
}
