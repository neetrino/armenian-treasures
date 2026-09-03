export type CultureItemEditorSectionId =
  | 'card-image'
  | 'description'
  | 'map'
  | 'tours'
  | 'videos'
  | 'gallery';

export interface CultureItemEditorSectionDefinition {
  id: CultureItemEditorSectionId;
  number: number;
  title: string;
  description?: string;
  unlimited?: boolean;
}

export const CULTURE_ITEM_EDITOR_SECTIONS: Record<
  CultureItemEditorSectionId,
  CultureItemEditorSectionDefinition
> = {
  'card-image': {
    id: 'card-image',
    number: 1,
    title: 'Card Image',
    description: 'JPG, PNG, or WEBP. Maximum 10MB.',
  },
  description: {
    id: 'description',
    number: 2,
    title: 'Description blocks',
    description: 'Add as many title, subtitle, and text blocks as you need.',
    unlimited: true,
  },
  map: {
    id: 'map',
    number: 3,
    title: 'Map',
    description: 'Location name, address, and a public map link.',
  },
  tours: {
    id: 'tours',
    number: 4,
    title: 'Virtual Tour',
    description: 'Unlimited LiDAR, 3D scanning, or drone photogrammetry links.',
    unlimited: true,
  },
  videos: {
    id: 'videos',
    number: 5,
    title: 'Videos',
    description: 'Unlimited MP4, YouTube, or Vimeo links.',
    unlimited: true,
  },
  gallery: {
    id: 'gallery',
    number: 6,
    title: 'Gallery',
    description: 'Images or Before/After pairs, each with an optional caption.',
    unlimited: true,
  },
};

export const DEFAULT_CULTURE_ITEM_EDITOR_SECTION_ORDER: CultureItemEditorSectionId[] = [
  'card-image',
  'description',
  'map',
  'tours',
  'videos',
  'gallery',
];

export function isCultureItemEditorSectionId(value: string): value is CultureItemEditorSectionId {
  return value in CULTURE_ITEM_EDITOR_SECTIONS;
}

export function resolveCultureItemSectionOrder(
  saved?: CultureItemEditorSectionId[] | null,
): CultureItemEditorSectionId[] {
  const valid = (saved ?? []).filter(isCultureItemEditorSectionId);
  const missing = DEFAULT_CULTURE_ITEM_EDITOR_SECTION_ORDER.filter((id) => !valid.includes(id));
  return valid.length > 0 ? [...valid, ...missing] : [...DEFAULT_CULTURE_ITEM_EDITOR_SECTION_ORDER];
}
