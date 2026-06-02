const SECTION_HERITAGE_BG = '/images/technology/section-heritage-bg.png';

const BACKGROUND_STYLE = {
  backgroundColor: '#F8F4EC',
  backgroundImage: `url(${SECTION_HERITAGE_BG})`,
  backgroundSize: '100% 100%',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
} as const;

export function TechnologyBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={BACKGROUND_STYLE}
    />
  );
}
