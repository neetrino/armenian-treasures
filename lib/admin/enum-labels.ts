const ITEM_TYPE_LABELS: Record<string, string> = {
  MONUMENT: 'Monument',
  MUSEUM: 'Museum',
  PERSON: 'Person',
  LEGEND: 'Legend',
  HISTORY_EVENT: 'History event',
  HERITAGE_OBJECT: 'Heritage object',
  PUBLICATION: 'Publication',
  MUSIC: 'Music',
  FOOD: 'Food & cuisine',
  DANCE: 'Dance',
  THEATRE: 'Theatre',
  OTHER: 'Other',
};

const MAP_TYPE_LABELS: Record<string, string> = {
  MONASTERY: 'Monastery',
  FORTRESS: 'Fortress',
  MUSEUM: 'Museum',
  CHURCH: 'Church',
  ARCHAEOLOGICAL: 'Archaeological site',
  OTHER: 'Other',
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft — hidden from public',
  PUBLISHED: 'Published — visible on site',
  ARCHIVED: 'Archived — hidden, kept in admin',
};

export function labelItemType(value: string): string {
  return ITEM_TYPE_LABELS[value] ?? value;
}

export function labelMapType(value: string): string {
  return MAP_TYPE_LABELS[value] ?? value;
}

export function labelPublishStatus(value: string): string {
  return STATUS_LABELS[value] ?? value;
}

export const CULTURE_ITEM_TYPE_OPTIONS = Object.entries(ITEM_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const CULTURE_MAP_TYPE_OPTIONS = Object.entries(MAP_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const CULTURE_STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));
