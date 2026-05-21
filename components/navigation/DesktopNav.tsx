import Link from 'next/link';
import { PRIMARY_LINKS } from './primary-links';
import { CultureDropdown } from './CultureDropdown';
import type { MenuNode } from '@/lib/culture-menu';

interface DesktopNavProps {
  menuTree: MenuNode[];
}

export function DesktopNav({ menuTree }: DesktopNavProps) {
  const visibleTree = menuTree.filter((node) => node.isActive);
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {PRIMARY_LINKS.slice(0, 2).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full px-3 py-2 text-sm font-medium text-parchment-200 transition hover:text-parchment-50"
        >
          {link.label}
        </Link>
      ))}
      <CultureDropdown tree={visibleTree} />
      {PRIMARY_LINKS.slice(2).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full px-3 py-2 text-sm font-medium text-parchment-200 transition hover:text-parchment-50"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
