import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminNavCardProps {
  href: string;
  title: string;
  description?: string;
  meta?: string;
  footer?: ReactNode;
  className?: string;
}

export function AdminNavCard({
  href,
  title,
  description,
  meta,
  footer,
  className,
}: AdminNavCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white/95 p-5 shadow-card backdrop-blur-sm transition duration-300 ease-cinematic hover:-translate-y-1 hover:border-bronze-300/80 hover:shadow-card-hover',
        className,
      )}
    >
      <p className="font-display text-lg text-ink transition group-hover:text-bronze-900">{title}</p>
      {description ? (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>
      ) : null}
      {meta ? <p className="mt-2 text-xs text-ink-muted/80">{meta}</p> : null}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bronze-700">
        {footer ?? 'Open editor'}
        <ArrowRight size={14} className="transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
