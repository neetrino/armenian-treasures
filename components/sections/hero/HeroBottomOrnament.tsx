import { cn } from '@/lib/utils';

interface HeroBottomOrnamentProps {
  className?: string;
  variant?: 'wave' | 'divider';
}

export function HeroBottomOrnament({
  className,
  variant = 'wave',
}: HeroBottomOrnamentProps) {
  if (variant === 'divider') {
    return (
      <div aria-hidden className={className} role="presentation">
        <svg
          viewBox="0 0 320 24"
          className="mx-auto h-5 w-full max-w-md text-bronze-500/30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 12 H120" stroke="currentColor" strokeWidth="0.6" />
          <path d="M200 12 H320" stroke="currentColor" strokeWidth="0.6" />
          <path
            d="M140 4 L160 12 L180 4 L160 20 Z"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="currentColor"
            fillOpacity="0.12"
          />
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden className={cn('w-full', className)} role="presentation">
      <svg
        viewBox="0 0 800 32"
        className="h-7 w-full text-bronze-500/25 sm:h-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 Q100 8 200 18 T400 16 T600 20 T800 14"
          stroke="currentColor"
          strokeWidth="0.75"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 24 Q120 28 240 22 T480 26 T720 20 L800 22"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.65"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M380 10 L400 16 L420 10 L400 22 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="currentColor"
          fillOpacity="0.1"
        />
      </svg>
    </div>
  );
}
