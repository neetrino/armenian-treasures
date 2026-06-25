'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Briefcase,
  BookOpen,
  Folders,
  Gauge,
  HeartHandshake,
  Home,
  Inbox,
  ListTree,
  Mail,
  Settings,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  links: NavLink[];
}

const GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    links: [{ href: '/admin/dashboard', label: 'Dashboard', icon: Gauge }],
  },
  {
    label: 'Content',
    links: [
      { href: '/admin/culture-menu', label: 'Culture Menu', icon: ListTree },
      { href: '/admin/culture-items', label: 'Culture Items', icon: Folders },
      { href: '/admin/projects', label: 'Projects', icon: HeartHandshake },
      { href: '/admin/team', label: 'Team', icon: Users },
      { href: '/admin/careers', label: 'Careers', icon: Briefcase },
      { href: '/admin/donators', label: 'Donators', icon: HeartHandshake },
      { href: '/admin/home-content', label: 'Home Content', icon: Home },
      { href: '/admin/about-content', label: 'About Content', icon: BookOpen },
      { href: '/admin/page-content', label: 'Page Content', icon: BookOpen },
    ],
  },
  {
    label: 'Inbox',
    links: [
      { href: '/admin/submissions', label: 'Submissions', icon: Inbox },
      { href: '/admin/contact-messages', label: 'Contact messages', icon: Mail },
    ],
  },
  {
    label: 'System',
    links: [{ href: '/admin/settings', label: 'Site settings', icon: Settings }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname() ?? '';
  return (
    <aside className="hidden h-full w-[240px] shrink-0 flex-col border-r border-stone-100 bg-white p-5 lg:flex">
      <div className="mb-6 shrink-0">
        <Logo variant="on-light" subtitle="Admin Panel" />
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto" aria-label="Admin">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-2 text-[11px] uppercase tracking-eyebrow text-ink-muted">
              {group.label}
            </p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {group.links.map((link) => {
                const Icon = link.icon;
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition',
                        active
                          ? 'bg-pomegranate text-parchment-50'
                          : 'text-ink-soft hover:bg-stone-100 hover:text-ink',
                      )}
                    >
                      <Icon size={16} strokeWidth={1.5} aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
