import { LandingBreadcrumb, type LandingBreadcrumbSegment } from '@/components/landing/LandingBreadcrumb';

const ROOT_SEGMENTS: LandingBreadcrumbSegment[] = [
  { label: 'Armenian Treasures', href: '/' },
  { label: 'Cultural Portal', href: '/culture' },
];

interface CulturePortalLandingBreadcrumbProps {
  segments: LandingBreadcrumbSegment[];
}

export function CulturePortalLandingBreadcrumb({ segments }: CulturePortalLandingBreadcrumbProps) {
  return <LandingBreadcrumb segments={[...ROOT_SEGMENTS, ...segments]} />;
}

export function toLandingBreadcrumbSegments(
  segments: Array<{ label: string; href?: string }>,
): LandingBreadcrumbSegment[] {
  return segments.map((segment) => ({
    label: segment.label,
    href: segment.href,
  }));
}
