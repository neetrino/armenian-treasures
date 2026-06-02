const PARCHMENT = '250,246,238';
const MIDNIGHT = '20,28,66';

const TOP_HERO_BLEND = `linear-gradient(180deg, rgba(${MIDNIGHT},1) 0%, rgba(${MIDNIGHT},0.78) 6%, rgba(${MIDNIGHT},0.34) 18%, rgba(${PARCHMENT},0.14) 34%, transparent 48%)`;

const READABILITY_OVERLAY = `linear-gradient(90deg, rgba(${PARCHMENT},0.98) 0%, rgba(${PARCHMENT},0.92) 35%, rgba(${PARCHMENT},0.70) 55%, rgba(${PARCHMENT},0.20) 75%, rgba(${PARCHMENT},0.00) 100%)`;

const BOTTOM_BLEND_OVERLAY = `linear-gradient(180deg, rgba(${PARCHMENT},0.00) 0%, rgba(${PARCHMENT},0.06) 30%, rgba(${PARCHMENT},0.22) 52%, rgba(${PARCHMENT},0.48) 72%, rgba(${PARCHMENT},0.76) 88%, rgba(${PARCHMENT},0.94) 100%)`;

const BOTTOM_LEFT_FEATHER = `radial-gradient(ellipse 80% 110% at 14% 100%, rgba(${PARCHMENT},0.88) 0%, rgba(${PARCHMENT},0.42) 48%, rgba(${PARCHMENT},0.00) 70%)`;

export function MissionFoundationOverlay() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: TOP_HERO_BLEND }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: READABILITY_OVERLAY }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: BOTTOM_BLEND_OVERLAY }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[clamp(5rem,14vw,10.5rem)]"
        style={{ background: BOTTOM_LEFT_FEATHER }}
      />
    </>
  );
}
