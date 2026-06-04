export const HEADER_EASE = [0.22, 1, 0.36, 1] as const;

export const headerStaggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.14 },
  },
} as const;

export const headerStaggerItem = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: HEADER_EASE },
  },
} as const;

export const navItemInteraction = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 420, damping: 28 },
};
