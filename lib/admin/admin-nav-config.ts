import {
  Briefcase,
  Folders,
  Gauge,
  Globe,
  HeartHandshake,
  Home,
  Inbox,
  Landmark,
  LayoutGrid,
  ListTree,
  Mail,
  Megaphone,
  Settings,
  Users,
  HandCoins,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AdminNavLink {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
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
    ],
  },
  {
    label: 'Site pages',
    links: [
      {
        href: '/admin/home-content',
        label: 'Homepage',
        description: 'Hero, sections, newsletter',
        icon: Home,
      },
      {
        href: '/admin/about-content',
        label: 'About page',
        description: 'Mission, pillars, team intro',
        icon: Landmark,
      },
      {
        href: '/admin/page-content',
        label: 'Marketing pages',
        description: 'Donation & partnership copy',
        icon: Megaphone,
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
        label: 'Culture page copy',
        description: 'Portal, landings, catalog copy',
        icon: LayoutGrid,
      },
      {
        href: '/admin/culture-items',
        label: 'Culture entries',
        description: 'Monuments, museums, people…',
        icon: Folders,
      },
    ],
  },
  {
    label: 'Fundraising',
    links: [
      {
        href: '/admin/projects',
        label: 'Projects',
        description: 'Active fundraising campaigns',
        icon: HeartHandshake,
      },
      {
        href: '/admin/donators',
        label: 'Donators',
        description: 'Public donor wall entries',
        icon: HandCoins,
      },
    ],
  },
  {
    label: 'People',
    links: [
      {
        href: '/admin/team',
        label: 'Team members',
        description: 'Staff and board profiles',
        icon: Users,
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
        description: 'Contact and newsletter',
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
