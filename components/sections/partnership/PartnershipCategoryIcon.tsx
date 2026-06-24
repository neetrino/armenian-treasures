import type { PartnershipCategoryIconKey } from '@/lib/constants/home-partnership-section';
import { cn } from '@/lib/utils';

interface PartnershipCategoryIconProps {
  type: PartnershipCategoryIconKey;
  className?: string;
}

const ICON_CLASS = 'h-10 w-10 shrink-0 text-heritage-gold sm:h-11 sm:w-11';

export function PartnershipCategoryIcon({ type, className }: PartnershipCategoryIconProps) {
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
      {type === 'museums' ? <MuseumsGlyph /> : null}
      {type === 'universities' ? <UniversitiesGlyph /> : null}
      {type === 'unesco' ? <UnescoGlyph /> : null}
      {type === 'culturalNgos' ? <StarGlyph /> : null}
      {type === 'mediaPartners' ? <MediaPartnersGlyph /> : null}
      {type === 'technology' ? <TechnologyGlyph /> : null}
      {type === 'governments' ? <StarGlyph /> : null}
      {type === 'becomePartner' ? <BecomePartnerGlyph /> : null}
    </svg>
  );
}

function MuseumsGlyph() {
  return (
    <>
      <path d="M4 20h16" />
      <path d="M6 20V9l6-4 6 4v11" />
      <path d="M9 20v-5h6v5" />
      <path d="M9 12h6" />
    </>
  );
}

function UniversitiesGlyph() {
  return (
    <>
      <path d="M5 20h14" />
      <path d="M7 20V10l5-3 5 3v10" />
      <rect x="10.5" y="12.5" width="3" height="3.5" rx="0.5" />
      <path d="M12 13.25v1.5" />
    </>
  );
}

function UnescoGlyph() {
  return (
    <>
      <circle cx="12" cy="12" r="7.25" />
      <path d="M4.75 12h14.5" />
      <path d="M12 4.75a8.5 8.5 0 0 1 0 14.5" />
      <path d="M12 4.75a8.5 8.5 0 0 0 0 14.5" />
    </>
  );
}

function StarGlyph() {
  return (
    <path d="M12 3.5 14.1 9.4 20.5 9.9 15.75 14.1 17.2 20.5 12 17.2 6.8 20.5 8.25 14.1 3.5 9.9 9.9 9.4 12 3.5Z" />
  );
}

function MediaPartnersGlyph() {
  return (
    <>
      <rect x="4" y="7" width="16" height="10" rx="1.25" />
      <path d="M4 10h16" />
      <path d="M7.5 14.5h3" />
    </>
  );
}

function TechnologyGlyph() {
  return (
    <>
      <rect x="4" y="8" width="16" height="11" rx="1.25" />
      <path d="M8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8" />
      <path d="M12 13v2" />
      <path d="M10.5 14.5h3" />
    </>
  );
}

function BecomePartnerGlyph() {
  return (
    <>
      <circle cx="12" cy="12" r="7.25" />
      <path d="M12 8.5v7" />
      <path d="M8.5 12h7" />
    </>
  );
}
