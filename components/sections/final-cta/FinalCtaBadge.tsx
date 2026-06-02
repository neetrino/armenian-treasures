import { ScanLine } from 'lucide-react';

export function FinalCtaBadge() {
  return (
    <div
      className="pointer-events-none absolute bottom-8 right-6 z-10 hidden max-w-[11rem] rounded-xl border border-bronze-400/45 bg-midnight-900/55 px-4 py-3 backdrop-blur-sm lg:block xl:bottom-10 xl:right-10"
      aria-hidden
    >
      <ScanLine className="mb-2 h-5 w-5 text-bronze-400" strokeWidth={1.5} />
      <p className="text-[0.625rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-bronze-400/95">
        Drone flights / 3D scans / Open archive
      </p>
    </div>
  );
}
