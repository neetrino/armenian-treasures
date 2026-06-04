interface CultureCategoryWaveProps {
  fill?: string;
  className?: string;
}

export function CultureCategoryWave({
  fill = '#FDFBF6',
  className,
}: CultureCategoryWaveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 28"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 18 C48 18 72 6 120 6 C156 6 176 22 200 22 C224 22 244 6 280 6 C328 6 352 18 400 18 L400 28 L0 28 Z"
        fill={fill}
      />
      <rect x="0" y="26" width="400" height="4" fill={fill} />
    </svg>
  );
}
