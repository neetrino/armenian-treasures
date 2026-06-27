interface HomeSectionGridFallbackProps {
  minHeightClass?: string;
}

export function HomeSectionGridFallback({
  minHeightClass = 'min-h-[12rem]',
}: HomeSectionGridFallbackProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[rgba(255,255,255,0.03)] ${minHeightClass}`}
      aria-hidden
    />
  );
}
