import type { UpcomingProjectIconKey } from '@/lib/constants/upcoming-projects';
import { cn } from '@/lib/utils';

interface UpcomingProjectIconProps {
  type: UpcomingProjectIconKey;
  className?: string;
}

const ICON_CLASS = 'h-10 w-10 shrink-0 text-heritage-gold sm:h-11 sm:w-11';

export function UpcomingProjectIcon({ type, className }: UpcomingProjectIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(ICON_CLASS, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {type === 'digitalArchive' ? <DigitalArchiveGlyph /> : null}
      {type === 'documentarySeries' ? <DocumentarySeriesGlyph /> : null}
      {type === 'educationProgramme' ? <EducationProgrammeGlyph /> : null}
      {type === 'diasporaNetwork' ? <DiasporaNetworkGlyph /> : null}
    </svg>
  );
}

function DigitalArchiveGlyph() {
  return (
    <>
      <path d="M7 3h7l3 3v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M12 11v4" />
      <path d="M10 13h4" />
    </>
  );
}

function DocumentarySeriesGlyph() {
  return (
    <>
      <rect x="3" y="5" width="18" height="11" rx="1.25" />
      <path d="M8 19h8" />
      <path d="M12 19v2" />
      <circle cx="12" cy="10.5" r="2.75" />
      <path d="M11 9.5v2l1.5 1" />
    </>
  );
}

function EducationProgrammeGlyph() {
  return (
    <>
      <path d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Z" />
      <path d="M6 8.5V15" />
      <path d="M18 8.5V15" />
      <path d="M4 15.5 12 19l8-3.5" />
      <path d="M12 11v8" />
    </>
  );
}

function DiasporaNetworkGlyph() {
  return (
    <>
      <circle cx="12" cy="12" r="7.25" />
      <path d="M4.75 12h14.5" />
      <path d="M12 4.75a8.5 8.5 0 0 1 0 14.5" />
      <path d="M12 4.75a8.5 8.5 0 0 0 0 14.5" />
      <circle cx="16.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
    </>
  );
}
