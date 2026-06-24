import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

function TopographicRings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
    >
      <circle cx="100" cy="100" r="88" opacity="0.35" />
      <circle cx="100" cy="100" r="68" opacity="0.28" />
      <circle cx="100" cy="100" r="48" opacity="0.22" />
      <circle cx="100" cy="100" r="28" opacity="0.18" />
      <path d="M100 12 L100 188 M12 100 L188 100" opacity="0.12" />
    </svg>
  );
}

function ManuscriptLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden fill="currentColor">
      <rect x="0" y="6" width="110" height="2" rx="1" opacity="0.18" />
      <rect x="8" y="16" width="98" height="1.5" rx="0.75" opacity="0.14" />
      <rect x="4" y="26" width="104" height="1.5" rx="0.75" opacity="0.16" />
      <rect x="12" y="36" width="90" height="1.5" rx="0.75" opacity="0.12" />
      <rect x="0" y="46" width="108" height="2" rx="1" opacity="0.15" />
      <rect x="6" y="56" width="96" height="1.5" rx="0.75" opacity="0.13" />
      <rect x="10" y="66" width="88" height="1.5" rx="0.75" opacity="0.11" />
    </svg>
  );
}

export function TechnologySectionDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgba(255,250,242,0.16)_0%,transparent_55%)]" />

      <Image
        src={resolvePublicAssetUrl('/images/technology/section-heritage-bg.png')}
        alt=""
        width={480}
        height={480}
        className="absolute -left-[2%] top-[8%] h-auto w-[min(42vw,20rem)] opacity-[0.06] mix-blend-multiply"
      />

      <TopographicRings className="absolute right-[6%] top-[14%] h-[min(22vw,11rem)] w-[min(22vw,11rem)] text-emerald-700/15" />

      <ManuscriptLines className="absolute right-[10%] top-[26%] h-16 w-28 text-ink-muted/20 sm:h-20 sm:w-32" />

      <Image
        src={resolvePublicAssetUrl('/images/technology/ornament-left.png')}
        alt=""
        width={320}
        height={420}
        className="absolute -left-[2%] bottom-[6%] h-auto w-[min(34vw,16rem)] opacity-[0.07] mix-blend-multiply"
      />

      <Image
        src={resolvePublicAssetUrl('/images/technology/ornament-right.png')}
        alt=""
        width={300}
        height={380}
        className="absolute -right-[2%] bottom-[8%] h-auto w-[min(30vw,14rem)] opacity-[0.06] mix-blend-multiply"
      />

      <Image
        src={resolvePublicAssetUrl('/images/technology/mountain-silhouette.png')}
        alt=""
        width={286}
        height={120}
        className="absolute bottom-0 left-1/2 h-auto w-[min(72vw,36rem)] -translate-x-1/2 opacity-[0.12] mix-blend-multiply"
      />
    </div>
  );
}
