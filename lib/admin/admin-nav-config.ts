import {
  BarChart3,
  Briefcase,
  Gauge,
  Globe,
  HeartHandshake,
  Home,
  Inbox,
  LayoutGrid,
  ListTree,
  Mail,
  Megaphone,
  Newspaper,
  Settings,
  HandCoins,
  Tags,
  UserCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AdminNavLink {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  children?: AdminNavLink[];
  isActive?: (pathname: string) => boolean;
}

export function isAdminNavLinkActive(pathname: string, link: AdminNavLink): boolean {
  if (link.isActive) return link.isActive(pathname);
  if (link.href === '/admin/dashboard') return pathname === link.href;
  return pathname.startsWith(link.href);
}

function isBlogPostsPath(pathname: string): boolean {
  if (pathname.startsWith('/admin/blog/categories')) return false;
  return pathname === '/admin/blog' || pathname.startsWith('/admin/blog/');
}

export interface AdminNavGroup {
  label: string;
  links: AdminNavLink[];
}

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    label: 'Overview',
    links: [
      {
        href: '/admin/dashboard',
        label: 'Dashboard',
        description: 'Stats and quick links',
        icon: Gauge,
      },
      {
        href: '/admin/analytics',
        label: 'Analytics',
        description: 'Full site performance snapshot',
        icon: BarChart3,
      },
    ],
  },
  {
    label: 'Site pages',
    links: [
      {
        href: '/admin/home-content',
        label: 'Homepage',
        description: 'Hero and homepage sections',
        icon: Home,
      },
      {
        href: '/admin/page-content',
        label: 'Pages',
        description: 'About, team, donation, partnership & contact',
        icon: Megaphone,
      },
      {
        href: '/admin/blog',
        label: 'Blog',
        description: 'News articles and stories',
        icon: Newspaper,
        isActive: isBlogPostsPath,
        children: [
          {
            href: '/admin/blog/categories',
            label: 'Categories',
            description: 'Flat blog categories for public tabs',
            icon: Tags,
          },
        ],
      },
    ],
  },
  {
    label: 'Culture',
    links: [
      {
        href: '/admin/culture-menu',
        label: 'Menu structure',
        description: 'Categories and navigation tree',
        icon: ListTree,
      },
      {
        href: '/admin/culture-pages',
        label: 'Culture Portal',
        description: 'Portal, landings, catalog copy',
        icon: LayoutGrid,
      },
    ],
  },
  {
    label: 'Fundraising',
    links: [
      {
        href: '/admin/projects',
        label: 'Project list',
        description: 'Active fundraising campaigns',
        icon: HeartHandshake,
      },
      {
        href: '/admin/page-content/projects-page',
        label: 'Project banner',
        description: 'Projects page hero banner image',
        icon: LayoutGrid,
      },
    ],
  },
  {
    label: 'People',
    links: [
      {
        href: '/admin/users',
        label: 'Users',
        description: 'Registered member accounts',
        icon: UserCircle,
      },
      {
        href: '/admin/member-donations',
        label: 'Donations',
        description: 'Member payment history',
        icon: HandCoins,
      },
      {
        href: '/admin/careers',
        label: 'Careers',
        description: 'Open job listings',
        icon: Briefcase,
      },
    ],
  },
  {
    label: 'Inbox',
    links: [
      {
        href: '/admin/submissions',
        label: 'Submissions',
        description: 'Public form responses',
        icon: Inbox,
      },
      {
        href: '/admin/contact-messages',
        label: 'Public inbox',
        description: 'Contact form messages',
        icon: Mail,
      },
    ],
  },
  {
    label: 'System',
    links: [
      {
        href: '/admin/settings',
        label: 'Site settings',
        description: 'Contact info and branding',
        icon: Settings,
      },
    ],
  },
];

export const ADMIN_PUBLIC_SITE_LINK = {
  href: '/',
  label: 'View public site',
  icon: Globe,
};
