import type { PublicSiteSettingsDTO } from '@/lib/dto';

interface FooterBottomBarProps {
  settings: PublicSiteSettingsDTO;
}

function BottomEmblem() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-4 w-4 text-bronze-400/80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="0.65" />
      <path
        d="M10 3 L11.5 8 H16.5 L12.5 11 L14 16 L10 13 L6 16 L7.5 11 L3.5 8 H8.5 Z"
        stroke="currentColor"
        strokeWidth="0.55"
      />
    </svg>
  );
}

function LogoMarkSmall() {
  return (
    <span
      aria-hidden
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-bronze-500 to-bronze-600 ring-1 ring-white/20"
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-midnight-900" fill="currentColor">
        <path d="M12 3 L14 9 H19 L15 12.5 L16.5 19 L12 15.5 L7.5 19 L9 12.5 L5 9 H10 Z" opacity="0.9" />
      </svg>
    </span>
  );
}

export function FooterBottomBar({ settings }: FooterBottomBarProps) {
  return (
    <div className="relative pt-8">
      <div className="absolute inset-x-0 top-0 flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-bronze-400/30 to-transparent" />
        <BottomEmblem />
      </div>
      <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-parchment-200/65 sm:flex-row sm:items-center">
        <p>{settings.copyrightText}</p>
        <p className="flex items-center gap-2">
          <span>Crafted in Yerevan with archival care.</span>
          <LogoMarkSmall />
        </p>
      </div>
    </div>
  );
}
