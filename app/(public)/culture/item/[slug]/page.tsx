import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CultureItemDetailView } from '@/components/culture-catalog/CultureItemDetailView';
import { CultureItemDraftPreviewBanner } from '@/components/culture-catalog/CultureItemDraftPreviewBanner';
import { requireAdminPage } from '@/lib/auth/require-admin';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import {
  getCultureItemDetailBySlug,
  getCultureItemDetailBySlugForPreview,
} from '@/lib/queries/culture-items';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';
import { buildNotFoundMetadata, buildPublicPageMetadata } from '@/lib/seo/metadata';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

function itemMetaDescription(item: PublicCultureItemDetailDTO): string {
  if (item.shortDescription) return item.shortDescription;
  if (item.description) return item.description.slice(0, 160);
  return `Curated Armenian heritage entry: ${item.title}.`;
}

function isPreviewRequest(preview: string | undefined): boolean {
  return preview === '1' || preview === 'true';
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const preview = isPreviewRequest(searchParams.preview);

  if (preview) {
    return {
      title: 'Preview culture item',
      robots: { index: false, follow: false },
    };
  }

  const item = await getCultureItemDetailBySlug(params.slug);
  if (!item) return buildNotFoundMetadata('Culture item');
  const description = itemMetaDescription(item);
  return buildPublicPageMetadata({
    title: item.title,
    description,
    pathname: resolveCultureItemHref(item.slug),
    openGraphImage: item.image ?? undefined,
  });
}

async function CultureItemDetailPage(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = await getCurrentSiteLocale();
  const preview = isPreviewRequest(searchParams.preview);

  if (preview) {
    await requireAdminPage();
    const previewResult = await getCultureItemDetailBySlugForPreview(params.slug);
    if (!previewResult) notFound();
    return (
      <>
        <CultureItemDraftPreviewBanner
          itemId={previewResult.item.id}
          status={previewResult.status}
        />
        <CultureItemDetailView item={previewResult.item} locale={locale} />
      </>
    );
  }

  const item = await getCultureItemDetailBySlug(params.slug);
  if (!item) notFound();
  return <CultureItemDetailView item={item} locale={locale} />;
}

export default CultureItemDetailPage;
