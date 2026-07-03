import Link from 'next/link';
import { Fragment } from 'react';

export interface LandingBreadcrumbSegment {
  label: string;
  href?: string;
}

interface LandingBreadcrumbProps {
  segments: LandingBreadcrumbSegment[];
}

export function LandingBreadcrumb({ segments }: LandingBreadcrumbProps) {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      {segments.map((segment, index) => (
        <Fragment key={`${segment.label}-${index}`}>
          {index > 0 ? <span style={{ opacity: 0.4 }}>·</span> : null}
          {segment.href ? <Link href={segment.href}>{segment.label}</Link> : <span>{segment.label}</span>}
        </Fragment>
      ))}
    </div>
  );
}
