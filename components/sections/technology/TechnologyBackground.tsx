import Image from 'next/image';

const SECTION_HERITAGE_BG = '/images/technology/section-heritage-bg.png';

const BG_WIDTH = 1024;
const BG_HEIGHT = 341;

export function TechnologyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#F8F4EC]" />
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <Image
          src={SECTION_HERITAGE_BG}
          alt=""
          width={BG_WIDTH}
          height={BG_HEIGHT}
          sizes="100vw"
          className="h-auto w-full max-w-none"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(253,251,246,0.35),transparent_72%)]" />
    </div>
  );
}
