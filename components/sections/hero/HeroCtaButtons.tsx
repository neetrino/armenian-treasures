import { HeritageCtaButton } from '@/components/ui/HeritageCtaButton';
import { cn } from '@/lib/utils';

interface HeroCtaButtonsProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
  className?: string;
}

export function HeroCtaButtons({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  className,
}: HeroCtaButtonsProps) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col items-center justify-center gap-4 sm:flex-row sm:gap-[30px]',
        className,
      )}
    >
      <HeritageCtaButton href={primaryHref} label={primaryText} variant="gold" />
      <HeritageCtaButton href={secondaryHref} label={secondaryText} variant="teal" />
    </div>
  );
}
