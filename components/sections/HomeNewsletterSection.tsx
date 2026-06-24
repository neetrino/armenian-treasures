import '@/components/sections/home-newsletter/home-newsletter-section.css';
import { HOME_NEWSLETTER_SECTION } from '@/lib/constants/home-newsletter-section';
import { HomeNewsletterForm } from '@/components/sections/home-newsletter/HomeNewsletterForm';

function HomeNewsletterStarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="home-newsletter-panel__star h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3.5 14.1 9.4 20.5 9.9 15.75 14.1 17.2 20.5 12 17.2 6.8 20.5 8.25 14.1 3.5 9.9 9.9 9.4 12 3.5Z" />
    </svg>
  );
}

export function HomeNewsletterSection() {
  return (
    <section
      className="relative px-5 pb-[clamp(6.875rem,9vw,8.75rem)] pt-[clamp(2rem,3vw,3rem)] sm:px-6"
      aria-labelledby="home-newsletter-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <div className="home-newsletter-panel">
          <HomeNewsletterStarIcon />

          <div className="home-newsletter-panel__content">
            <h2
              id="home-newsletter-heading"
              className="max-w-[28rem] font-cinzel text-[clamp(1.125rem,1.8vw,1.5rem)] font-extrabold uppercase leading-[1.1] tracking-[0.04em] text-heritage-gold"
            >
              {HOME_NEWSLETTER_SECTION.title}
            </h2>

            <p className="mt-3 max-w-[26rem] font-display text-[clamp(0.8125rem,0.95vw,0.9375rem)] italic leading-[1.5] text-[rgba(232,216,155,0.52)]">
              {HOME_NEWSLETTER_SECTION.description}
            </p>

            <HomeNewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
