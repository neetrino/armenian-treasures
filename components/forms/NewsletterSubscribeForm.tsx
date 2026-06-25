'use client';

import { useActionState } from 'react';
import {
  subscribeNewsletter,
  type NewsletterActionState,
} from '@/components/sections/home-newsletter/subscribeNewsletter';

const INITIAL_STATE: NewsletterActionState = { status: 'idle' };

interface NewsletterSubscribeFormProps {
  placeholder?: string;
  submitLabel?: string;
  successMessage?: string;
  formClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  successClassName?: string;
  errorClassName?: string;
}

export function NewsletterSubscribeForm({
  placeholder = 'Your email address',
  submitLabel = 'Subscribe',
  successMessage = '✦ Thank you — you are now part of the heritage community.',
  formClassName = 'nl-form',
  inputClassName = 'nl-input',
  buttonClassName = 'nl-btn',
  successClassName = 'nl-success',
  errorClassName = 'nl-error',
}: NewsletterSubscribeFormProps) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, INITIAL_STATE);

  if (state.status === 'success') {
    return <p className={successClassName}>{state.message ?? successMessage}</p>;
  }

  return (
    <form action={formAction} className={formClassName} noValidate>
      <input type="hidden" name="website" value="" tabIndex={-1} autoComplete="off" />
      <input
        className={inputClassName}
        type="email"
        name="email"
        placeholder={placeholder}
        required
        aria-label="Email address"
        aria-invalid={Boolean(state.fieldErrors?.email)}
      />
      <button type="submit" className={buttonClassName} disabled={pending}>
        {pending ? 'Subscribing…' : submitLabel}
      </button>
      {state.status === 'error' && state.message ? (
        <p className={errorClassName} role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
