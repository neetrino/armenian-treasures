import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AdminHelpCallout } from '@/components/admin/AdminHelpCallout';
import { cultureCatalogPageAdminHref } from '@/lib/admin/culture-catalog-pages';

interface CulturePageContentLinkProps {
  menuPath: string;
  pageLabel?: string;
}

export function CulturePageContentLink({ menuPath, pageLabel }: CulturePageContentLinkProps) {
  const href = cultureCatalogPageAdminHref(menuPath);

  return (
    <AdminHelpCallout title="Page text & images">
      <p>
        Hero banners, about sections, map labels, and stat text for{' '}
        <span className="font-medium text-ink">{pageLabel ?? 'this page'}</span> are edited separately
        so you get a focused, visual form — no JSON.
      </p>
      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-bronze-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-bronze-800"
      >
        Edit page content
        <ArrowRight size={14} aria-hidden />
      </Link>
    </AdminHelpCallout>
  );
}
