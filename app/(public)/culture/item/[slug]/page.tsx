import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureItemDetailView } from '@/components/culture-catalog/CultureItemDetailView';
import { getCultureItemDetailBySlug } from '@/lib/queries/culture-items';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

function itemMetaDescription(item: PublicCultureItemDetailDTO): string {
  if (item.shortDescription) return item.shortDescription;
  if (item.description) return item.description.slice(0, 160);
  return `Curated Armenian heritage entry: ${item.title}.`;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const item = await getCultureItemDetailBySlug(params.slug);
  if (!item) return { title: 'Culture item not found' };
  const description = itemMetaDescription(item);
  return {
    title: item.title,
    description,
    openGraph: {
      title: item.title,
      description,
      ...(item.image ? { images: [{ url: item.image }] } : {}),
    },
  };
}

async function CultureItemDetailPage(props: PageProps) {
  const params = await props.params;
  const item = await getCultureItemDetailBySlug(params.slug);
  if (!item) notFound();
  return <CultureItemDetailView item={item} />;
}

export default CultureItemDetailPage;
