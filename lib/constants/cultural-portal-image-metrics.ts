/**
 * Culture Portal category card image metrics.
 *
 * Grid: max 73.75rem (1180px), columns by breakpoint (1 / 2 / 3 / 5).
 * Media area: 76% of card height; some categories scale up to 1.22× on hover.
 * Asset size targets 2× the largest rendered edge (~420px) for retina sharpness.
 */
export const CULTURAL_PORTAL_CARD_IMAGE_PX = 840;

/** Intrinsic dimensions passed to Next.js Image for card fill mode (square cover sources). */
export const CULTURAL_PORTAL_CARD_IMAGE_INTRINSIC = {
  width: CULTURAL_PORTAL_CARD_IMAGE_PX,
  height: CULTURAL_PORTAL_CARD_IMAGE_PX,
} as const;

/**
 * Matches `.cultural-portal-grid` column layout and section padding (`px-5` / `sm:px-6`).
 * Caps container width at 73.75rem like the grid.
 */
export const CULTURAL_PORTAL_CARD_IMAGE_SIZES =
  '(max-width: 379px) calc(100vw - 2.5rem), (max-width: 767px) calc((100vw - 2.5rem) / 2), (max-width: 1023px) calc((min(100vw, 73.75rem) - 3rem) / 3), calc(min(100vw, 73.75rem) / 5)';

/** Badge icon in featured-treasure cards: 82px container, `scale-[2]` → ~164px visible. */
export const CULTURAL_PORTAL_BADGE_IMAGE_PX = 164;

export const CULTURAL_PORTAL_BADGE_IMAGE_SIZES = `${CULTURAL_PORTAL_BADGE_IMAGE_PX}px`;
