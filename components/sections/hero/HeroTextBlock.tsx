import { cn } from '@/lib/utils';

interface HeroTextBlockProps {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  tagline: string;
  description: string;
}

export function HeroTextBlock({
  badge,
  title,
  highlight,
  subtitle,
  tagline,
  description,
}: HeroTextBlockProps) {
  const normalizedSubtitle = (subtitle ?? '').replace(/\\n/g, '\n');
  const subtitleLines = normalizedSubtitle.split('\n').filter(Boolean);

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[61.25rem] text-center">
      <p className="mx-auto mb-8 inline-flex items-center gap-3 border border-[rgba(214,184,90,0.3)] bg-[rgba(214,184,90,0.08)] px-4 py-1.5 font-cinzel text-[clamp(0.625rem,0.65vw,0.75rem)] font-semibold uppercase leading-none tracking-[0.36em] text-heritage-teal">
        <span aria-hidden className="h-px w-5 bg-[rgba(39,198,200,0.5)]" />
        {badge}
        <span aria-hidden className="h-px w-5 bg-[rgba(214,184,90,0.55)]" />
      </p>

      <h1
        id="hero-heading"
        className="mx-auto max-w-[820px] min-w-0 bg-hero-gold-title bg-clip-text font-cinzel text-[clamp(2.625rem,13vw,3.875rem)] font-bold uppercase leading-[0.88] tracking-[0.03em] text-transparent [filter:drop-shadow(0_0_24px_rgba(214,184,90,0.28))] sm:text-[clamp(3rem,10vw,4.75rem)] lg:text-[clamp(4.25rem,6.1vw,6.75rem)]"
      >
        <span className="block">{title.trim()}</span>
        <span className="block">{highlight.trim()}</span>
      </h1>

      <p
        aria-label={normalizedSubtitle.replace(/\n/g, ' ')}
        className="mx-auto mt-[24px] max-w-[820px] font-cinzel text-[clamp(1.4375rem,7vw,2.125rem)] font-normal uppercase leading-[1.12] tracking-[0.12em] text-heritage-champagne/95 lg:text-[clamp(1.75rem,2.8vw,3rem)] lg:tracking-[0.32em]"
      >
        {subtitleLines.map((line, index) => (
          <span key={line} className={cn('block', index > 0 && 'mt-0.5')}>
            {line}
          </span>
        ))}
      </p>

      <p className="mx-auto mt-9 max-w-[820px] font-cinzel text-[clamp(0.75rem,0.85vw,1rem)] font-normal uppercase leading-normal tracking-[0.26em] text-heritage-champagne/90 lg:mt-8">
        {tagline}
      </p>

      <p className="mx-auto mt-[18px] max-w-[610px] min-w-0 font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.62] text-heritage-text-muted">
        {description}
      </p>
    </div>
  );
}
