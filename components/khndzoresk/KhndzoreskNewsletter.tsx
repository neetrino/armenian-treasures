'use client';

import { NewsletterSubscribeForm } from '@/components/forms/NewsletterSubscribeForm';

export function KhndzoreskNewsletter() {
  return (
    <div className="nl-outer">
      <div className="newsletter reveal">
        <h2>Stay Connected to the Heritage</h2>
        <p>Receive updates when new sites, tours, and archival discoveries are added to the portal.</p>
        <NewsletterSubscribeForm
          successMessage="Thank you — you are now subscribed to heritage updates."
        />
      </div>
    </div>
  );
}
