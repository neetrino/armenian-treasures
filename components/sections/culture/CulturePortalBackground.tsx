import Image from 'next/image';

function TopographicRings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="0.55"
    >
      <circle cx="100" cy="100" r="88" opacity="0.32" />
      <circle cx="100" cy="100" r="68" opacity="0.26" />
      <circle cx="100" cy="100" r="48" opacity="0.2" />
      <circle cx="100" cy="100" r="28" opacity="0.16" />
      <path d="M100 12 L100 188 M12 100 L188 100" opacity="0.1" />
    </svg>
  );
}

function CompassLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden fill="none" stroke="currentColor">
      <circle cx="120" cy="120" r="96" strokeWidth="0.5" opacity="0.14" />
      <circle cx="120" cy="120" r="72" strokeWidth="0.5" opacity="0.12" />
      <path d="M120 24 L120 216 M24 120 L216 120" strokeWidth="0.45" opacity="0.1" />
      <path d="M48 48 L192 192 M192 48 L48 192" strokeWidth="0.4" opacity="0.08" />
    </svg>
  );
}

function MandalaOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="78" strokeWidth="0.45" opacity="0.12" />
      <circle cx="100" cy="100" r="58" strokeWidth="0.4" opacity="0.1" />
      <circle cx="100" cy="100" r="38" strokeWidth="0.35" opacity="0.08" />
      <path d="M100 22 L100 178 M22 100 L178 100" strokeWidth="0.35" opacity="0.08" />
      <path d="M45 45 L155 155 M155 45 L45 155" strokeWidth="0.3" opacity="0.06" />
    </svg>
  );
}

export function CulturePortalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(242,234,219,0.22)_0%,transparent_58%)]" />

      <MandalaOutline className="absolute -left-[4%] top-[4%] h-[min(42vw,21rem)] w-[min(42vw,21rem)] text-bronze/25" />
      <MandalaOutline className="absolute -right-[8%] top-[18%] h-[min(34vw,17rem)] w-[min(34vw,17rem)] text-bronze/18" />

      <CompassLines className="absolute left-[8%] top-[22%] h-[min(28vw,14rem)] w-[min(28vw,14rem)] text-bronze/15" />
      <TopographicRings className="absolute right-[5%] top-[10%] h-[min(26vw,13rem)] w-[min(26vw,13rem)] text-bronze/18" />

      <Image
        src="/images/technology/mountain-silhouette.png"
        alt=""
        width={640}
        height={180}
        className="absolute bottom-0 left-0 right-0 h-auto w-full opacity-[0.05]"
      />

    </div>
  );
}
