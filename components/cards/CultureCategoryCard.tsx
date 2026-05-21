import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { resolveMenuHref, type MenuNode } from '@/lib/culture-menu';

interface CultureCategoryCardProps {
  node: MenuNode;
  parent?: MenuNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<CultureCategoryCardProps['size']>, string> = {
  sm: 'aspect-[4/3]',
  md: 'aspect-[4/5]',
  lg: 'aspect-[3/4]',
};

export function CultureCategoryCard({
  node,
  parent,
  size = 'md',
  className,
}: CultureCategoryCardProps) {
  const href = resolveMenuHref(node, parent);
  return (
    <Link
      href={href}
      className={cn(
        'group relative isolate flex overflow-hidden rounded-2xl border border-stone-100 bg-stone-100 text-parchment-50 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        SIZE_CLASSES[size],
        className,
      )}
    >
      <CategoryArtwork title={node.title} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/85 via-midnight-900/40 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end gap-2 p-6">
        <span className="text-[11px] uppercase tracking-eyebrow text-bronze-400">
          Culture Portal
        </span>
        <h3 className="flex items-center gap-2 font-display text-2xl leading-tight">
          {node.title}
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            aria-hidden
            className="translate-y-px opacity-0 transition group-hover:opacity-100"
          />
        </h3>
        {node.description ? (
          <p className="text-sm text-parchment-200/90 line-clamp-2">{node.description}</p>
        ) : null}
      </div>
    </Link>
  );
}

interface ArtworkProps {
  title: string;
  className?: string;
}

const PALETTE = [
  ['#7E1C26', '#141C42'],
  ['#1E2A5E', '#C8843D'],
  ['#4D1118', '#C8843D'],
  ['#1A1714', '#7E1C26'],
  ['#3A332C', '#1E2A5E'],
  ['#A86A28', '#141C42'],
];

function hashIndex(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash % PALETTE.length;
}

function CategoryArtwork({ title, className }: ArtworkProps) {
  const [a, b] = PALETTE[hashIndex(title)] ?? PALETTE[0]!;
  return (
    <svg
      className={className}
      aria-hidden
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${title}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#bg-${title})`} />
      <g stroke="rgba(250,246,238,0.12)" strokeWidth="1" fill="none">
        <circle cx="200" cy="180" r="80" />
        <circle cx="200" cy="180" r="120" />
        <circle cx="200" cy="180" r="160" />
        <path d="M120 320 L200 280 L280 320" />
        <path d="M120 360 L200 320 L280 360" />
        <path d="M140 400 L200 370 L260 400" />
      </g>
    </svg>
  );
}
