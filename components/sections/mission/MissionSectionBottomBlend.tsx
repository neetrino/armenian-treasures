import { HeroBottomOrnament } from '@/components/sections/hero/HeroBottomOrnament';

const CURVE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" preserveAspectRatio="none">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="white" stop-opacity="0"/>
        <stop offset="35%" stop-color="white" stop-opacity="0.35"/>
        <stop offset="70%" stop-color="white" stop-opacity="0.78"/>
        <stop offset="100%" stop-color="white" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <path d="M0,104 C320,44 640,128 960,68 C1120,44 1280,88 1440,92 L1440,180 L0,180 Z" fill="url(#g)"/>
  </svg>`,
)}")`;

const BLEND_HEIGHT = 'clamp(5rem,14vw,10.5rem)';

export function MissionSectionBottomBlend() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
      role="presentation"
    >
      <div
        className="absolute inset-x-0 bottom-0 w-full bg-gradient-to-b from-transparent via-parchment-100/30 to-parchment-100"
        style={{ height: BLEND_HEIGHT }}
      />

      <div
        className="absolute inset-x-0 bottom-0 w-full bg-parchment-100"
        style={{
          height: BLEND_HEIGHT,
          maskImage: CURVE_MASK,
          WebkitMaskImage: CURVE_MASK,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 w-full"
        style={{
          height: BLEND_HEIGHT,
          background:
            'radial-gradient(ellipse 85% 115% at 16% 100%, rgb(250 246 238 / 0.98) 0%, rgb(250 246 238 / 0.45) 52%, transparent 74%)',
        }}
      />

      <HeroBottomOrnament
        variant="wave"
        className="absolute inset-x-0 bottom-[clamp(2.75rem,7vw,5rem)] text-bronze-500/14"
      />
    </div>
  );
}
