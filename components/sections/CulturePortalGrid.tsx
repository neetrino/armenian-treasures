import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CultureCategoryCard } from '@/components/cards/CultureCategoryCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { isFormRoute, type MenuNode } from '@/lib/culture-menu';

interface CulturePortalGridProps {
  tree: MenuNode[];
  limit?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function CulturePortalGrid({
  tree,
  limit = 8,
  eyebrow = 'Culture Portal',
  title = 'Eleven living domains of Armenian heritage',
  description = 'From cliff-top monasteries to UNESCO-recognised bread — explore curated entry points to every part of the archive.',
}: CulturePortalGridProps) {
  const visible = tree
    .filter((node) => node.isActive && !isFormRoute(node.routeType))
    .slice(0, limit);

  return (
    <section className="bg-parchment py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          <Link
            href="/culture"
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-pomegranate hover:underline lg:self-end"
          >
            View the full portal
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((node) => (
            <StaggerItem key={node.id} className="h-full">
              <CultureCategoryCard node={node} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
