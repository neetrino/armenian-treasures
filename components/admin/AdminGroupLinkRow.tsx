import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminGroupLinkRowProps {
  href: string;
  label: string;
  meta?: string;
  className?: string;
}

export function AdminGroupLinkRow({ href, label, meta, className }: AdminGroupLinkRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center justify-between gap-3 rounded-xl border border-stone-200/60 bg-parchment-50/50 px-4 py-3 transition duration-200 hover:-translate-y-px hover:border-bronze-300/70 hover:bg-white hover:shadow-sm',
        className,
      )}
    >
      <div className="min-w-0">
        <p className="font-medium text-ink group-hover:text-bronze-900">{label}</p>
        {meta ? <p className="truncate text-xs text-ink-muted">{meta}</p> : null}
      </div>
      <ChevronRight
        size={16}
        className="shrink-0 text-bronze-600 transition group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}
