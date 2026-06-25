import Link from 'next/link';

export interface CultureCatalogBreadcrumbSegment {
  label: string;
  href?: string;
}

interface CultureCatalogBreadcrumbProps {
  segments: CultureCatalogBreadcrumbSegment[];
}

export function CultureCatalogBreadcrumb({ segments }: CultureCatalogBreadcrumbProps) {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Armenian Treasures</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">Cultural Portal</Link>
      {segments.map((segment, index) => (
        <span key={`${segment.label}-${index}`} className="inline-flex items-center gap-[10px]">
          <span style={{ opacity: 0.4 }}>·</span>
          {segment.href ? (
            <Link href={segment.href}>{segment.label}</Link>
          ) : (
            <span>{segment.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
