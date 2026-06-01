'use client';

import Image from 'next/image';

interface HeroBackgroundProps {
  imageUrl: string;
}

export function HeroBackground({ imageUrl }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0a0612]"
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        quality={100}
        unoptimized
        sizes="100vw"
        className="scale-[1.28] object-contain object-center brightness-[1.06] contrast-[1.05] saturate-[1.08]"
      />

      {/* Left fade keeps hero copy readable without hiding the landscape */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0612]/88 via-[#0a0612]/42 to-transparent sm:via-[#0a0612]/28" />
      {/* Soft top/bottom vignette for nav + stats */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0612]/35 via-transparent to-[#0a0612]/55" />
    </div>
  );
}
