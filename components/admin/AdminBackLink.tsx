import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminBackLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export function AdminBackLink({ href, label = 'Back', className }: AdminBackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-muted shadow-sm transition duration-200 hover:border-bronze-300 hover:text-bronze-800',
        className,
      )}
    >
      <ChevronLeft size={14} aria-hidden />
      {label}
    </Link>
  );
}
