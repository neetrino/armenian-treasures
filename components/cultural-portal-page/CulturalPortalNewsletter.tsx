'use client';

import { NewsletterSubscribeForm } from '@/components/forms/NewsletterSubscribeForm';

type CulturalPortalNewsletterProps = {
  title: string;
  description: string;
};

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

export function CulturalPortalNewsletter({ title, description }: CulturalPortalNewsletterProps) {
  return (
    <div className="nl-outer">
      <div className="newsletter cultural-portal-newsletter reveal">
        <StarIcon />
        <h2>{title}</h2>
        <p>{description}</p>
        <NewsletterSubscribeForm />
      </div>
    </div>
  );
}
