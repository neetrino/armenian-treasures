import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdminPaginationProps {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  basePath: string;
  query?: string;
  extraParams?: Record<string, string | undefined>;
}

function buildHref(
  basePath: string,
  page: number,
  query?: string,
  extraParams?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  if (query) params.set('q', query);
  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      if (value) params.set(key, value);
    }
  }
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function AdminPagination({
  page,
  pageCount,
  total,
  pageSize,
  basePath,
  query,
  extraParams,
}: AdminPaginationProps) {
  if (total <= pageSize) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200/70 bg-white/95 px-4 py-3 text-sm shadow-card backdrop-blur-sm motion-safe:animate-admin-fade-up">
      <p className="text-ink-muted">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={buildHref(basePath, page - 1, query, extraParams)}
          aria-disabled={page <= 1}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-200',
            page <= 1
              ? 'pointer-events-none border-stone-200/60 opacity-40'
              : 'border-stone-200/80 hover:border-bronze-300 hover:text-bronze-800',
          )}
        >
          Previous
        </Link>
        <span className="text-xs text-ink-muted">
          Page {page} of {pageCount}
        </span>
        <Link
          href={buildHref(basePath, page + 1, query, extraParams)}
          aria-disabled={page >= pageCount}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-200',
            page >= pageCount
              ? 'pointer-events-none border-stone-200/60 opacity-40'
              : 'border-stone-200/80 hover:border-bronze-300 hover:text-bronze-800',
          )}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
