/** CMS-managed static pages linked from Admin → Pages (outside PageContent slugs). */
export const ADMIN_PAGES_STATIC_ENTRIES = [
  {
    href: '/admin/about-content',
    title: 'About page',
    description: 'Mission, pillars, and team/career page copy',
  },
  {
    href: '/admin/team',
    title: 'Team page',
    description: 'Staff and board member profiles',
  },
] as const;
