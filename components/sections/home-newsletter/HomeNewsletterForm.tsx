'use client';

import { useActionState } from 'react';
import { HOME_NEWSLETTER_SECTION } from '@/lib/constants/home-newsletter-section';
import {
  subscribeNewsletter,
  type NewsletterActionState,
} from '@/components/sections/home-newsletter/subscribeNewsletter';

const INITIAL_STATE: NewsletterActionState = { status: 'idle' };

export function HomeNewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, INITIAL_STATE);

  return (
    <form action={formAction} className="home-newsletter-form" noValidate>
      <label htmlFor="home-newsletter-email" className="sr-only">
        Email address
      </label>

      <input type="hidden" name="website" value="" tabIndex={-1} autoComplete="off" />

      <div className="home-newsletter-form__controls">
        <input
          id="home-newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={HOME_NEWSLETTER_SECTION.placeholder}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.message ? 'home-newsletter-feedback' : state.fieldErrors?.email ? 'home-newsletter-email-error' : undefined
          }
          className="home-newsletter-form__input"
        />

        <button type="submit" disabled={pending} className="home-newsletter-form__submit">
          {pending ? 'SUBSCRIBING…' : HOME_NEWSLETTER_SECTION.submitLabel}
        </button>
      </div>

      {state.fieldErrors?.email ? (
        <p id="home-newsletter-email-error" className="home-newsletter-form__feedback home-newsletter-form__feedback--error">
          {state.fieldErrors.email}
        </p>
      ) : null}

      {state.message ? (
        <p
          id="home-newsletter-feedback"
          className={`home-newsletter-form__feedback${state.status === 'error' ? ' home-newsletter-form__feedback--error' : ''}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
