import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { CultureCategoryCard } from '@/components/cards/CultureCategoryCard';
import { CultureItemCard } from '@/components/cards/CultureItemCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { EmptyState } from '@/components/ui/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { isFormRoute, resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { getMenuTree } from '@/lib/queries/menu';
import { getItemsByMenuItem } from '@/lib/queries/culture-items';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = tree.find((n) => n.slug === params.categorySlug);
  if (!node) return { title: 'Category not found' };
  return {
    title: node.title,
    description: node.description ?? `Browse Armenian ${node.title.toLowerCase()} entries.`,
  };
}

async function CultureCategoryPage(props: PageProps) {
  const params = await props.params;
  const tree = await getMenuTree();
  const node = tree.find((n) => n.slug === params.categorySlug && n.isActive);
  if (!node || isFormRoute(node.routeType)) notFound();
  const children = (node.children ?? []).filter(
    (child) => child.isActive && !isFormRoute(child.routeType),
  );
  const formChild = (node.children ?? []).find(
    (child) => child.isActive && child.routeType === 'SUBCATEGORY_FORM',
  );
  const items = children.length === 0 ? await getItemsByMenuItem(node.id) : [];

  return (
    <>
      <HeroPage
        eyebrow={node.title.toUpperCase()}
        title={node.title}
        description={node.description ?? 'Curated entries from the Armenian cultural world.'}
      >
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <ButtonLink href="/culture/submit" variant="primary" withArrow>
            Add your project
          </ButtonLink>
          {formChild ? (
            <ButtonLink
              href={resolveMenuHref(formChild, node)}
              variant="on-dark"
              size="md"
            >
              <Plus size={14} aria-hidden /> Add a new sub-catalog
            </ButtonLink>
          ) : null}
        </div>
      </HeroPage>
      <Container className="py-20 lg:py-28">
        {children.length > 0 ? (
          <SubcategoryGrid parent={node} nodes={children} formChild={formChild ?? undefined} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No entries yet"
            description="This category is awaiting curation. Check back soon."
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

export default CultureCategoryPage;

interface SubcategoryGridProps {
  parent: MenuNode;
  nodes: MenuNode[];
  formChild?: MenuNode;
}

function SubcategoryGrid({ parent, nodes, formChild }: SubcategoryGridProps) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {nodes.map((child) => (
        <StaggerItem key={child.id} className="h-full">
          <CultureCategoryCard node={child} parent={parent} />
        </StaggerItem>
      ))}
      {formChild ? (
        <StaggerItem className="h-full">
          <Link
            href={resolveMenuHref(formChild, parent)}
            className="group flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-pomegranate/40 bg-pomegranate/5 p-6 text-center text-pomegranate transition hover:-translate-y-1 hover:border-pomegranate hover:bg-pomegranate/10"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pomegranate/10 text-pomegranate transition group-hover:bg-pomegranate group-hover:text-parchment-50">
              <Plus size={22} strokeWidth={1.5} aria-hidden />
            </span>
            <span className="font-display text-xl text-ink">Add a new sub-catalog</span>
            <span className="text-sm text-ink-muted">
              Propose a new {parent.title.toLowerCase()} sub-catalog.
            </span>
          </Link>
        </StaggerItem>
      ) : null}
    </Stagger>
  );
}
