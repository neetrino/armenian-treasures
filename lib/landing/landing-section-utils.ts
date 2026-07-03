export function isSectionEnabled(
  visibility: Partial<Record<string, boolean | undefined>> | undefined,
  key: string,
): boolean {
  return visibility?.[key] !== false;
}

export function hasNonEmptyArray<T>(value: readonly T[] | undefined | null): value is readonly T[] {
  return Array.isArray(value) && value.length > 0;
}

export function hasTrimmedText(value: string | undefined | null): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function hasGalleryGroups(gallery: {
  now: readonly unknown[];
  hist: readonly unknown[];
  fut: readonly unknown[];
}): boolean {
  return gallery.now.length > 0 || gallery.hist.length > 0 || gallery.fut.length > 0;
}

export function hasVirtualTourContent(tours: {
  featured: { embed?: string };
  mini: readonly unknown[];
}): boolean {
  return hasTrimmedText(tours.featured.embed) || tours.mini.length > 0;
}

export function hasPartnershipCategories(
  categories: ReadonlyArray<{ partners: readonly unknown[] }>,
): boolean {
  return categories.some((category) => category.partners.length > 0);
}
