const HERO_VISUAL_SRC = '/images/mission/foundation-hero-visual.png';

const BACKGROUND_STYLE = {
  backgroundImage: `url(${HERO_VISUAL_SRC})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
} as const;

export function MissionFoundationBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={BACKGROUND_STYLE}
    />
  );
}
