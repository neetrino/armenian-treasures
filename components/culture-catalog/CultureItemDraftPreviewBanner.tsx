import Link from 'next/link';

interface CultureItemDraftPreviewBannerProps {
  itemId: string;
  status: string;
}

function statusLabel(status: string): string {
  if (status === 'PUBLISHED') return 'Published';
  if (status === 'ARCHIVED') return 'Archived';
  return 'Draft';
}

export function CultureItemDraftPreviewBanner({ itemId, status }: CultureItemDraftPreviewBannerProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-bronze-400/40 bg-bronze-500 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm sm:px-6">
        <p className="font-medium">
          Admin preview ({statusLabel(status)}) — not indexed. Publish when you are happy with this
          layout.
        </p>
        <Link
          href={`/admin/culture-items/${itemId}`}
          className="rounded-md bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide hover:bg-white/25"
        >
          Back to editor
        </Link>
      </div>
    </div>
  );
}
