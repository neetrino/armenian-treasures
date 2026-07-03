export type KhndzoreskSectionVisibility = {
  hero?: boolean;
  stats?: boolean;
  about?: boolean;
  sites?: boolean;
  virtualTour?: boolean;
  aerial?: boolean;
  panorama?: boolean;
  gallery?: boolean;
  restoration?: boolean;
  map?: boolean;
  credits?: boolean;
  related?: boolean;
  newsletter?: boolean;
};

export type KhachaturianSectionVisibility = {
  hero?: boolean;
  stats?: boolean;
  about?: boolean;
  works?: boolean;
  virtualTour?: boolean;
  audio?: boolean;
  gallery?: boolean;
  highlights?: boolean;
  visit?: boolean;
  related?: boolean;
  newsletter?: boolean;
};

export type NationalGallerySectionVisibility = {
  hero?: boolean;
  stats?: boolean;
  about?: boolean;
  collections?: boolean;
  artists?: boolean;
  virtualTour?: boolean;
  exhibitions?: boolean;
  gallery?: boolean;
  visit?: boolean;
  related?: boolean;
  newsletter?: boolean;
};

export type CulturalPortalSectionVisibility = {
  hero?: boolean;
  stats?: boolean;
  categories?: boolean;
  highlights?: boolean;
  map?: boolean;
  projects?: boolean;
  partnership?: boolean;
  donors?: boolean;
  about?: boolean;
  newsletter?: boolean;
};

export type PartnershipSectionVisibility = {
  hero?: boolean;
  stats?: boolean;
  impact?: boolean;
  values?: boolean;
  timeline?: boolean;
  showcase?: boolean;
  inquiry?: boolean;
  newsletter?: boolean;
};

export type DonationSectionVisibility = {
  hero?: boolean;
  stats?: boolean;
  mission?: boolean;
  engine?: boolean;
  ledger?: boolean;
  patronWall?: boolean;
  closing?: boolean;
};

export type SectionToggleOption = {
  id: string;
  label: string;
};

export const KHNDZORESK_SECTION_TOGGLES: SectionToggleOption[] = [
  { id: 'hero', label: 'Hero banner' },
  { id: 'stats', label: 'Statistics bar' },
  { id: 'about', label: 'About / facts' },
  { id: 'sites', label: 'Heritage sites grid' },
  { id: 'virtualTour', label: 'Virtual tour' },
  { id: 'aerial', label: 'Aerial 3D model' },
  { id: 'panorama', label: '360° panorama' },
  { id: 'gallery', label: 'Photo gallery' },
  { id: 'restoration', label: 'Before & after restoration' },
  { id: 'map', label: 'Location map' },
  { id: 'credits', label: 'Digitization credits' },
  { id: 'related', label: 'Related destinations' },
  { id: 'newsletter', label: 'Newsletter signup' },
];

export const KHACHATURIAN_SECTION_TOGGLES: SectionToggleOption[] = [
  { id: 'hero', label: 'Hero banner' },
  { id: 'stats', label: 'Statistics bar' },
  { id: 'about', label: 'Biography / facts' },
  { id: 'works', label: 'Major works grid' },
  { id: 'virtualTour', label: 'Virtual tour' },
  { id: 'audio', label: 'Audio tracks' },
  { id: 'gallery', label: 'Photo gallery' },
  { id: 'highlights', label: 'Museum highlights' },
  { id: 'visit', label: 'Visit & contact' },
  { id: 'related', label: 'Related destinations' },
  { id: 'newsletter', label: 'Newsletter signup' },
];

export const NGA_SECTION_TOGGLES: SectionToggleOption[] = [
  { id: 'hero', label: 'Hero banner' },
  { id: 'stats', label: 'Statistics bar' },
  { id: 'about', label: 'About / facts' },
  { id: 'collections', label: 'Collections grid' },
  { id: 'artists', label: 'Featured artists' },
  { id: 'virtualTour', label: 'Virtual tour' },
  { id: 'exhibitions', label: 'Exhibitions' },
  { id: 'gallery', label: 'Photo gallery' },
  { id: 'visit', label: 'Tickets & visiting' },
  { id: 'related', label: 'Related destinations' },
  { id: 'newsletter', label: 'Newsletter signup' },
];

export const CULTURAL_PORTAL_SECTION_TOGGLES: SectionToggleOption[] = [
  { id: 'hero', label: 'Hero banner' },
  { id: 'stats', label: 'Statistics bar' },
  { id: 'categories', label: 'Culture categories' },
  { id: 'highlights', label: 'Featured treasures' },
  { id: 'map', label: 'Heritage map' },
  { id: 'projects', label: 'Projects' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'donors', label: 'Donors wall' },
  { id: 'about', label: 'About cards' },
  { id: 'newsletter', label: 'Newsletter signup' },
];

export const PARTNERSHIP_SECTION_TOGGLES: SectionToggleOption[] = [
  { id: 'hero', label: 'Hero banner' },
  { id: 'stats', label: 'Statistics bar' },
  { id: 'impact', label: 'Impact section' },
  { id: 'values', label: 'Partnership values' },
  { id: 'timeline', label: 'Process timeline' },
  { id: 'showcase', label: 'Partner showcase' },
  { id: 'inquiry', label: 'Inquiry form' },
  { id: 'newsletter', label: 'Newsletter signup' },
];

export const DONATION_SECTION_TOGGLES: SectionToggleOption[] = [
  { id: 'hero', label: 'Hero banner' },
  { id: 'stats', label: 'Statistics bar' },
  { id: 'mission', label: 'Mission & pillars' },
  { id: 'engine', label: 'Donation engine' },
  { id: 'ledger', label: 'Impact ledger' },
  { id: 'patronWall', label: 'Patron wall' },
  { id: 'closing', label: 'Trust items & newsletter' },
];
