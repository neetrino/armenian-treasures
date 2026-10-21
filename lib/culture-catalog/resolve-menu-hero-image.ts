/** Catalog banner wins. The menu card image is the public fallback. */
export function resolveMenuHeroImage(
  cardImage?: string | null,
  bannerImage?: string | null,
): string | undefined {
  const banner = bannerImage?.trim();
  if (banner) return banner;
  const card = cardImage?.trim();
  return card || undefined;
}
