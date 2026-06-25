'use client';

import { DONATION_PAGE, DONATION_TRUST_ITEMS } from '@/lib/constants/donation-page';
import { NewsletterSubscribeForm } from '@/components/forms/NewsletterSubscribeForm';

function StarIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 56 56"
      fill="none"
      style={{ color: 'var(--gold)', opacity: 0.35, marginBottom: 14 }}
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M28 6l4 14h14L35 28l4 14-11-8-11 8 4-14L10 20h14z" />
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M6.5 1L11 3.5v5L6.5 11 2 8.5v-5z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DonationClosingSections() {
  const { quote, newsletter } = DONATION_PAGE;

  return (
    <>
      <div className="trust-row reveal" role="list" aria-label="Trust and security signals">
        {DONATION_TRUST_ITEMS.map((item) => (
          <div key={item.label} className="trust-item" role="listitem">
            <TrustIcon />
            {item.label}
          </div>
        ))}
      </div>

      <div className="quote-band reveal" role="complementary">
        <blockquote>{quote.text}</blockquote>
        <cite>{quote.cite}</cite>
      </div>

      <div className="donation-nl-outer">
        <div className="newsletter reveal" role="complementary" aria-label="Newsletter signup">
          <StarIcon />
          <h2>{newsletter.title}</h2>
          <p>{newsletter.description}</p>
          <NewsletterSubscribeForm
            placeholder={newsletter.placeholder}
            submitLabel={newsletter.buttonLabel}
            successMessage={newsletter.successMessage}
          />
        </div>
      </div>
    </>
  );
}
