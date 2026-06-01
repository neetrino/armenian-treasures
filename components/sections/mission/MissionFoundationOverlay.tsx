const READABILITY_OVERLAY =
  'linear-gradient(90deg, rgba(248,245,239,0.98) 0%, rgba(248,245,239,0.92) 35%, rgba(248,245,239,0.70) 55%, rgba(248,245,239,0.20) 75%, rgba(248,245,239,0.00) 100%)';

const MOBILE_BOTTOM_OVERLAY =
  'linear-gradient(180deg, rgba(248,245,239,0.00) 0%, rgba(248,245,239,0.45) 72%, rgba(248,245,239,0.82) 100%)';

export function MissionFoundationOverlay() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: READABILITY_OVERLAY }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
        style={{ background: MOBILE_BOTTOM_OVERLAY }}
      />
    </>
  );
}
