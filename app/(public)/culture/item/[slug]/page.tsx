import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, ChevronLeft, ExternalLink, MapPin, Play } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { CultureItemTourSection } from '@/components/sections/CultureItemTourSection';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
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

function heroDescription(item: PublicCultureItemDetailDTO): string {
  if (item.shortDescription) return item.shortDescription;
  if (item.description) return item.description;
  return 'Curated entry from the Armenian cultural archive.';
}

function formatEnumLabel(value: string): string {
  return value
    .split('_')
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(' ');
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

  const menu = item.menuItem;
  const parent = menu?.parent ?? null;
  const eyebrow = parent ? `${parent.title} / ${menu?.title ?? 'Culture Portal'}` : menu?.title ?? 'Culture Portal';
  const gallery = item.galleryImages.filter((src) => src.trim().length > 0);
  const hasCoords = item.latitude !== null && item.longitude !== null;

  return (
    <>
      <HeroPage
        eyebrow={eyebrow.toUpperCase()}
        title={item.title}
        description={heroDescription(item)}
      >
        <nav className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-parchment-200">
          <Link href="/culture" className="inline-flex items-center gap-1 hover:text-parchment-50">
            <ChevronLeft size={14} aria-hidden /> Culture Portal
          </Link>
          {menu && parent ? (
            <>
              <span aria-hidden>/</span>
              <Link href={`/culture/${parent.slug}`} className="hover:text-parchment-50">
                {parent.title}
              </Link>
              <span aria-hidden>/</span>
              <Link
                href={`/culture/${parent.slug}/${menu.slug}`}
                className="hover:text-parchment-50"
              >
                {menu.title}
              </Link>
            </>
          ) : menu ? (
            <>
              <span aria-hidden>/</span>
              <Link href={`/culture/${menu.slug}`} className="hover:text-parchment-50">
                {menu.title}
              </Link>
            </>
          ) : null}
        </nav>
      </HeroPage>
      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="flex flex-col gap-10">
            <div className="relative overflow-hidden rounded-2xl border border-stone-100 bg-stone-100 shadow-card">
              <div className="aspect-[16/10] w-full">
                <Image
                  src={item.image ?? '/images/placeholder.svg'}
                  alt={item.title}
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              {item.tourUrl ? (
                <Badge tone="bronze" className="absolute left-4 top-4 backdrop-blur">
                  <Box size={12} aria-hidden /> 3D Tour available
                </Badge>
              ) : null}
            </div>

            {item.description ? (
              <article className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink-soft">
                <p className="text-base leading-relaxed">{item.description}</p>
              </article>
            ) : null}

            {item.tourUrl ? (
              <CultureItemTourSection title={item.title} tourUrl={item.tourUrl} />
            ) : null}

            {gallery.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl text-ink">Gallery</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gallery.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-100 bg-stone-100"
                    >
                      <Image
                        src={src}
                        alt=""
                        width={600}
                        height={450}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {item.videoUrl ? (
              <section className="flex flex-wrap gap-3">
                <ButtonLink href={item.videoUrl} variant="primary" external>
                  <Play size={14} aria-hidden /> Watch video
                </ButtonLink>
              </section>
            ) : null}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl text-ink">Details</h2>
              <dl className="mt-4 flex flex-col gap-4 text-sm">
                <DetailRow label="Type" value={formatEnumLabel(item.itemType)} />
                {item.region ? (
                  <DetailRow
                    label="Region"
                    value={
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} aria-hidden /> {item.region}
                      </span>
                    }
                  />
                ) : null}
                {item.locationName ? <DetailRow label="Location" value={item.locationName} /> : null}
                {item.periodLabel ? <DetailRow label="Period" value={item.periodLabel} /> : null}
                {item.century !== null ? (
                  <DetailRow label="Century" value={String(item.century)} />
                ) : null}
                {item.yearLabel ? <DetailRow label="Year" value={item.yearLabel} /> : null}
                {item.mapType ? (
                  <DetailRow label="Map category" value={formatEnumLabel(item.mapType)} />
                ) : null}
                {hasCoords ? (
                  <DetailRow
                    label="Coordinates"
                    value={`${item.latitude!.toFixed(4)}, ${item.longitude!.toFixed(4)}`}
                  />
                ) : null}
              </dl>
            </div>

            {item.showOnMap && hasCoords ? (
              <ButtonLink href="/map" variant="secondary" withArrow>
                View on heritage map
              </ButtonLink>
            ) : null}

            {menu ? (
              <Link
                href={parent ? `/culture/${parent.slug}/${menu.slug}` : `/culture/${menu.slug}`}
                className="inline-flex items-center gap-1 text-sm text-pomegranate hover:underline"
              >
                Browse more in {menu.title}
                <ExternalLink size={12} aria-hidden />
              </Link>
            ) : null}
          </aside>
        </div>
      </Container>
    </>
  );
}

export default CultureItemDetailPage;

interface DetailRowProps {
  label: string;
  value: ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-stone-100 pb-4 last:border-0 last:pb-0">
      <dt className="text-[11px] uppercase tracking-eyebrow text-bronze-700">{label}</dt>
      <dd className="text-ink-soft">{value}</dd>
    </div>
  );
}
