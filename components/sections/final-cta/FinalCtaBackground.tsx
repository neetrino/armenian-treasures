import Image from 'next/image';

const BACKGROUND_SRC = '/images/final-cta/foundation-support-bg.png';

export function FinalCtaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src={BACKGROUND_SRC}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 1200px"
        className="object-cover object-[75%_center] brightness-[1.04] contrast-[1.05] saturate-[1.06] sm:object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight-900/82 via-midnight-900/38 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-pomegranate-900/28 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/35 via-transparent to-midnight-900/10" />
    </div>
  );
}
