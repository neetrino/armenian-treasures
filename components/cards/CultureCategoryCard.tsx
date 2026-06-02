import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { resolveCultureCategoryTheme } from '@/components/cards/culture-category-theme';
import { CultureCategoryWave } from '@/components/cards/CultureCategoryWave';

interface CultureCategoryCardProps {
  node: MenuNode;
  parent?: MenuNode;
  index?: number;
  className?: string;
}

function formatIndex(value: number): string {
  return value.toString().padStart(2, '0');
}

export function CultureCategoryCard({
  node,
  parent,
  index,
  className,
}: CultureCategoryCardProps) {
  const href = resolveMenuHref(node, parent);
  const themeSlug = parent?.slug ?? node.slug;
  const theme = resolveCultureCategoryTheme(themeSlug);
  const displayIndex = index ?? node.order;
  const imageSrc = node.image ?? theme.cardSrc;

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full min-h-[22.5rem] w-full flex-col overflow-hidden rounded-2xl bg-[#FDFBF6] shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
      style={{ borderWidth: 1, borderStyle: 'solid', borderColor: `${theme.accentColor}55` }}
    >
      <div className="relative h-[11.5rem] shrink-0 overflow-hidden sm:h-[12.5rem]">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 52vw, 15rem"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: theme.objectPosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" />
        <CultureCategoryWave
          fill="#FDFBF6"
          className="absolute bottom-0 left-0 h-7 w-full"
        />
      </div>

      <div className="relative flex flex-1 flex-col items-center px-5 pb-6 pt-5 text-center">
        <span
          className="font-display text-[2.75rem] leading-none tracking-tight"
          style={{ color: theme.accentColor }}
        >
          {formatIndex(displayIndex)}
        </span>

        <h3 className="mt-2 font-display text-[1.35rem] font-semibold leading-tight text-ink">
          {node.title}
        </h3>

        {node.description ? (
          <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-ink-muted">
            {node.description}
          </p>
        ) : null}

        <span
          className="mt-auto flex h-9 w-9 items-center justify-center rounded-full border transition duration-300 group-hover:scale-105"
          style={{ borderColor: theme.accentColor, color: theme.accentColor }}
          aria-hidden
        >
          <ArrowRight size={16} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
