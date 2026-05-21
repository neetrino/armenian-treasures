import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { CultureItemCard } from '@/components/cards/CultureItemCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { EmptyState } from '@/components/ui/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { isFormRoute, type MenuNode } from '@/lib/culture-menu';
import { getMenuTree } from '@/lib/queries/menu';
import { getItemsByMenuItem } from '@/lib/queries/culture-items';

export const revalidate = 60;

interface PageProps {
  params: { categorySlug: string; subcategorySlug: string };
}

function findChild(tree: MenuNode[], categorySlug: string, subSlug: string): {
  parent: MenuNode;
  child: MenuNode;
} | null {
  const parent = tree.find((node) => node.slug === categorySlug && node.isActive);
  if (!parent) return null;
  const child = (parent.children ?? []).find(
    (node) => node.slug === subSlug && node.isActive && !isFormRoute(node.routeType),
  );
  if (!child) return null;
  return { parent, child };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tree = await getMenuTree();
  const found = findChild(tree, params.categorySlug, params.subcategorySlug);
  if (!found) return { title: 'Subcategory not found' };
  return {
    title: `${found.child.title} · ${found.parent.title}`,
    description:
      found.child.description ??
      `Curated ${found.parent.title.toLowerCase()} / ${found.child.title.toLowerCase()} entries.`,
  };
}

async function CultureSubcategoryPage({ params }: PageProps) {
  const tree = await getMenuTree();
  const found = findChild(tree, params.categorySlug, params.subcategorySlug);
  if (!found) notFound();
  const { parent, child } = found;
  const items = await getItemsByMenuItem(child.id);
  return (
    <>
      <HeroPage
        eyebrow={`${parent.title} / ${child.title}`}
        title={child.title}
        description={child.description ?? `Curated ${child.title.toLowerCase()} entries.`}
      >
        <Link
          href={`/culture/${parent.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm text-parchment-200 hover:text-parchment-50"
        >
          <ChevronLeft size={14} aria-hidden /> Back to {parent.title}
        </Link>
      </HeroPage>
      <Container className="py-20 lg:py-28">
        {items.length === 0 ? (
          <EmptyState
            title="No entries yet"
            description="This subcategory is awaiting curation. Suggest one below."
            action={
              <ButtonLink href="/culture/submit" variant="secondary" withArrow>
                Suggest an entry
              </ButtonLink>
            }
          />
        ) : (
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {items.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <CultureItemCard item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </>
  );
}

export default CultureSubcategoryPage;
