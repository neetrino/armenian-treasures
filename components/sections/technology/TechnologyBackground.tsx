import Image from 'next/image';

const ORNAMENT_LEFT = '/images/technology/ornament-left.png';
const ORNAMENT_RIGHT = '/images/technology/ornament-right.png';
const SECTION_TEXTURE = '/images/technology/section-bg-main.jpg';

export function TechnologyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-parchment-100" />
      <Image
        src={SECTION_TEXTURE}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top opacity-[0.38] sm:opacity-[0.42] lg:opacity-[0.45]"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-parchment-50/72 via-parchment-100/84 to-parchment-100/94" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(250,246,238,0.15),transparent_55%)]" />
      <Image
        src={ORNAMENT_LEFT}
        alt=""
        width={267}
        height={480}
        className="absolute bottom-0 left-0 top-0 hidden h-full w-auto max-w-[min(28vw,13rem)] object-contain object-left opacity-[0.2] md:block lg:max-w-[15rem] lg:opacity-[0.28]"
      />
      <Image
        src={ORNAMENT_RIGHT}
        alt=""
        width={218}
        height={480}
        className="absolute bottom-0 right-0 top-0 hidden h-full w-auto max-w-[min(26vw,12rem)] object-contain object-right opacity-[0.16] md:block lg:max-w-[14rem] lg:opacity-[0.24]"
      />
    </div>
  );
}
