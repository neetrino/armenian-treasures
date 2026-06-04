import Image from 'next/image';

const HERITAGE_MAP_IMAGE = '/images/hero/heritage-map.png';

export function HeroMapOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden"
      role="presentation"
    >
      <div className="relative h-[min(88%,520px)] w-[min(72%,280px)] opacity-[0.35] sm:opacity-[0.4] lg:h-[min(92%,560px)] lg:w-[min(78%,320px)] lg:opacity-[0.45] xl:opacity-50">
        <Image
          src={HERITAGE_MAP_IMAGE}
          alt=""
          fill
          sizes="(max-width: 1024px) 280px, 320px"
          className="object-contain object-right"
          priority={false}
        />
      </div>
    </div>
  );
}
