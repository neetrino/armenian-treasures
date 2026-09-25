'use client';

import { useRouter } from 'next/navigation';
import { BarChart3, BookOpen, ImageIcon, LayoutGrid, ListOrdered, Map } from 'lucide-react';
import type { ReactNode } from 'react';
import { AdminSectionCard } from '@/components/admin/AdminSectionCard';

interface CultureMenuCatalogSheetFormProps {
  menuPath: string;
}

const SECTIONS: Array<{ id: string; title: string; description: string; icon: ReactNode }> = [
  {
    id: 'hero',
    title: 'Hero banner',
    description: 'Top banner image, eyebrow, accent line, and slogan.',
    icon: <ImageIcon size={20} aria-hidden />,
  },
  {
    id: 'about',
    title: 'About section',
    description: 'Intro text, paragraphs, and extra content block.',
    icon: <BookOpen size={20} aria-hidden />,
  },
  {
    id: 'facts',
    title: 'Fact cards',
    description: 'Four highlight facts shown in the about area.',
    icon: <ListOrdered size={20} aria-hidden />,
  },
  {
    id: 'entries',
    title: 'Grid section labels',
    description: 'Titles above the monument card grid.',
    icon: <LayoutGrid size={20} aria-hidden />,
  },
  {
    id: 'map',
    title: 'Map section',
    description: 'Heritage map block copy and placeholder.',
    icon: <Map size={20} aria-hidden />,
  },
  {
    id: 'stats',
    title: 'Stat bar labels',
    description: 'Labels for the numbers bar under the hero.',
    icon: <BarChart3 size={20} aria-hidden />,
  },
];

export function CultureMenuCatalogSheetForm({ menuPath }: CultureMenuCatalogSheetFormProps) {
  const router = useRouter();

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {SECTIONS.map((section) => (
        <AdminSectionCard
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          onClick={() => router.push(`/admin/culture-pages/section/${section.id}/${menuPath}`)}
        />
      ))}
    </div>
  );
}
