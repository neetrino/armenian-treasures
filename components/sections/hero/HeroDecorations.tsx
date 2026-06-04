import { HeroLeftPattern } from '@/components/sections/hero/HeroLeftPattern';
import { HeroBottomOrnament } from '@/components/sections/hero/HeroBottomOrnament';

/** Section-level ornaments (far left pattern). Hidden on mobile; subdued on tablet. */
export function HeroDecorations() {
  return (
    <HeroLeftPattern className="pointer-events-none absolute left-0 top-[16%] z-[1] hidden h-[min(45vh,360px)] w-10 text-bronze-600/12 md:block md:text-bronze-600/16 lg:left-2 lg:h-[min(50vh,400px)] lg:w-14 lg:text-bronze-500/18" />
  );
}

interface HeroBottomDecorProps {
  className?: string;
}

export function HeroBottomDecor({ className }: HeroBottomDecorProps) {
  return <HeroBottomOrnament variant="wave" className={className} />;
}
