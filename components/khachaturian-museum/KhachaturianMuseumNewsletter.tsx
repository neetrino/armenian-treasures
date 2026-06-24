'use client';

import { FormEvent, useState } from 'react';

export function KhachaturianMuseumNewsletter() {
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
        <h2>Stay Connected to the Heritage</h2>
        <p>Receive updates when new sites, tours, and archival discoveries are added to the portal.</p>
        {submitted ? (
          <p className="nl-success">Thank you — you are now subscribed to heritage updates.</p>
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
