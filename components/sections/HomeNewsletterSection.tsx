import '@/components/sections/home-newsletter/home-newsletter-section.css';
import { HomeNewsletterForm } from '@/components/sections/home-newsletter/HomeNewsletterForm';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function HomeNewsletterSection({ home }: HomeSectionContentProps) {
  const { newsletter } = getHomeSections(home);

  return (
    <section
      id="newsletter"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="home-newsletter-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[43.75rem] text-center">
        <h2
          id="home-newsletter-heading"
          className="font-cinzel text-[clamp(1.75rem,2.5vw,2.5rem)] font-extrabold uppercase leading-[1.08] tracking-[0.02em] text-heritage-gold"
        >
          {newsletter.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[32.5rem] font-display text-[clamp(0.9375rem,1vw,1.0625rem)] italic leading-[1.55] text-surface-muted">
          {newsletter.description}
        </p>
        <HomeNewsletterForm
          placeholder={newsletter.placeholder}
          submitLabel={newsletter.submitLabel}
        />
      </div>
    </section>
  );
}
