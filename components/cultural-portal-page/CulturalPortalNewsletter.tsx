'use client';

import { FormEvent, useState } from 'react';
import { CULTURAL_PORTAL_NEWSLETTER } from '@/lib/constants/cultural-portal-page';

function StarIcon() {
  return (
    <svg
      style={{ width: 44, height: 44, color: 'var(--gold)', opacity: 0.45, marginBottom: 16 }}
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
    >
      <path d="M28 6l4 14h14L35 28l4 14-11-8-11 8 4-14L10 20h14z" />
    </svg>
  );
}

export function CulturalPortalNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get('email');
    if (typeof email === 'string' && email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <div className="nl-outer">
      <div className="newsletter reveal">
        <StarIcon />
        <h2>{CULTURAL_PORTAL_NEWSLETTER.title}</h2>
        <p>{CULTURAL_PORTAL_NEWSLETTER.description}</p>
        {submitted ? (
          <p className="nl-success">✦ Thank you — you are now part of the heritage community.</p>
        ) : (
          <form className="nl-form" onSubmit={handleSubmit}>
            <input
              className="nl-input"
              type="email"
              name="email"
              placeholder="Your email address"
              required
              aria-label="Email address"
            />
            <button type="submit" className="nl-btn">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
