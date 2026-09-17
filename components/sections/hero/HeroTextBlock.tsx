import { cn } from '@/lib/utils';
import { containsArmenianScript } from '@/lib/i18n/armenian-script';

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
  const titleIsArmenian = containsArmenianScript(`${title} ${highlight}`);
  const subtitleIsArmenian = containsArmenianScript(normalizedSubtitle);
  const taglineIsArmenian = containsArmenianScript(tagline);
  const badgeIsArmenian = containsArmenianScript(badge);

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[61.25rem] text-center">
      <p className={cn(
        'mx-auto mb-8 inline-flex items-center gap-3 border border-[rgba(214,184,90,0.3)] bg-[rgba(214,184,90,0.08)] px-4 py-1.5 font-cinzel text-[clamp(0.625rem,0.65vw,0.75rem)] font-semibold uppercase tracking-[0.36em] text-heritage-teal',
        badgeIsArmenian ? 'leading-snug tracking-[0.12em]' : 'leading-none',
      )}>
        <span aria-hidden className="h-px w-5 bg-[rgba(39,198,200,0.5)]" />
        {badge}
        <span aria-hidden className="h-px w-5 bg-[rgba(214,184,90,0.55)]" />
      </p>

      <h1
        id="hero-heading"
        className={cn(
          'mx-auto max-w-[820px] min-w-0 overflow-visible bg-hero-gold-title bg-clip-text font-cinzel font-bold uppercase text-transparent [filter:drop-shadow(0_0_24px_rgba(214,184,90,0.28))]',
          titleIsArmenian
            ? 'hero-title--hy px-1 text-[clamp(2.25rem,10vw,3.5rem)] leading-[1.02] tracking-[0.02em] sm:text-[clamp(2.75rem,8vw,4.25rem)] lg:text-[clamp(3.5rem,5vw,5.75rem)]'
            : 'text-[clamp(2.625rem,13vw,3.875rem)] leading-[0.88] tracking-[0.03em] sm:text-[clamp(3rem,10vw,4.75rem)] lg:text-[clamp(4.25rem,6.1vw,6.75rem)]',
        )}
      >
        <span className="block">{title.trim()}</span>
        <span className={cn('block', titleIsArmenian && 'mt-[0.08em]')}>{highlight.trim()}</span>
      </h1>

      <p
        aria-label={normalizedSubtitle.replace(/\n/g, ' ')}
        className={cn(
          'mx-auto mt-[24px] max-w-[820px] font-cinzel font-normal uppercase text-heritage-champagne/95',
          subtitleIsArmenian
            ? 'text-[clamp(1.25rem,5.5vw,1.85rem)] leading-[1.28] tracking-[0.08em] lg:text-[clamp(1.5rem,2.4vw,2.35rem)] lg:tracking-[0.1em]'
            : 'text-[clamp(1.4375rem,7vw,2.125rem)] leading-[1.18] tracking-[0.12em] lg:text-[clamp(1.75rem,2.8vw,3rem)] lg:tracking-[0.32em]',
        )}
      >
        {subtitleLines.map((line, index) => (
          <span key={line} className={cn('block', index > 0 && 'mt-0.5')}>
            {line}
          </span>
        ))}
      </p>

      {tagline.trim() ? (
        <p className={cn(
          'mx-auto mt-9 max-w-[820px] font-cinzel font-normal uppercase text-heritage-champagne/90 lg:mt-8',
          taglineIsArmenian
            ? 'text-[clamp(0.8rem,0.9vw,1.05rem)] leading-snug tracking-[0.1em]'
            : 'text-[clamp(0.75rem,0.85vw,1rem)] leading-normal tracking-[0.26em]',
        )}>
          {tagline}
        </p>
      ) : null}

      {description.trim() ? (
        <p className="mx-auto mt-[4em] max-w-[610px] min-w-0 font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.62] text-heritage-text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
