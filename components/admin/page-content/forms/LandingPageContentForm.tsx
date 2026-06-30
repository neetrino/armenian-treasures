'use client';

import { useState } from 'react';
import { PageContentFormShell } from '@/components/admin/page-content/PageContentFormShell';
import { PageContentSection } from '@/components/admin/page-content/PageContentSection';
import { HeroBannerImageField } from '@/components/admin/page-content/HeroBannerImageField';
import {
  AudioTracksEditor,
  CardGridEditor,
  ExhibitionsEditor,
  HighlightCardsEditor,
  MiniToursEditor,
  RestorationPairsEditor,
} from '@/components/admin/page-content/editors/CardEditors';
import {
  GalleryImagesEditor,
  LabelValueFactsEditor,
  NumLabelStatsEditor,
  RelatedLinksEditor,
  type GalleryImageItem,
  type NumLabelStat,
} from '@/components/admin/page-content/editors/ContentListEditors';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import {
  parseKhachaturianPageContent,
  parseKhndzoreskPageContent,
  parseNationalGalleryPageContent,
  type KhachaturianPageContent,
  type KhndzoreskPageContent,
  type NationalGalleryPageContent,
} from '@/lib/types/page-content';
import {
  asMutableContent,
  patchContent,
  readArray,
  readString,
  type MutablePageContent,
} from '@/lib/admin/page-content-form/mutable-content';

type LandingSlug = 'khndzoresk' | 'khachaturian-museum' | 'national-gallery-armenia';

interface Props {
  slug: LandingSlug;
  initial: Record<string, unknown>;
}

function parseLandingContent(slug: LandingSlug, initial: Record<string, unknown>): MutablePageContent {
  switch (slug) {
    case 'khndzoresk':
      return asMutableContent(parseKhndzoreskPageContent(initial));
    case 'khachaturian-museum':
      return asMutableContent(parseKhachaturianPageContent(initial));
    case 'national-gallery-armenia':
      return asMutableContent(parseNationalGalleryPageContent(initial));
  }
}

function KhndzoreskGallerySection({
  gallery,
  onChange,
}: {
  gallery: KhndzoreskPageContent['gallery'];
  onChange: (gallery: MutablePageContent) => void;
}) {
  const groups = [
    { key: 'now' as const, label: 'Present day' },
    { key: 'hist' as const, label: 'Historical archive' },
    { key: 'fut' as const, label: 'Future / concept' },
  ];

  return (
    <>
      {groups.map(({ key, label }) => (
        <PageContentSection key={key} title={`Gallery — ${label}`}>
          <GalleryImagesEditor
            items={[...gallery[key]] as GalleryImageItem[]}
            onChange={(items) => onChange({ [key]: items })}
          />
        </PageContentSection>
      ))}
    </>
  );
}

export function LandingPageContentForm({ slug, initial }: Props) {
  const [content, setContent] = useState<MutablePageContent>(() => parseLandingContent(slug, initial));

  const update = (patch: MutablePageContent): void => {
    setContent((prev) => patchContent(prev, patch));
  };

  const khndzoresk = content as unknown as KhndzoreskPageContent;
  const khachaturian = content as unknown as KhachaturianPageContent;
  const nga = content as unknown as NationalGalleryPageContent;
  const tickets = readArray<{ label: string; title: string; price: string; sub: string }>(content.tickets);

  return (
    <PageContentFormShell slug={slug} content={content}>
      <HeroBannerImageField
        value={readString(content.heroImage)}
        onChange={(heroImage) => update({ heroImage })}
        hint="Overrides the default landing hero photo when set. Remove to show the standard page background."
      />

      <PageContentSection title="Images" description="Base URL prefix used for legacy image paths on this landing page.">
        <TextField
          label="Image base URL"
          value={readString(content.imgBase)}
          onChange={(e) => update({ imgBase: e.target.value })}
          hint="Usually a CDN or WordPress uploads folder URL"
        />
      </PageContentSection>

      <PageContentSection title="Key statistics">
        <NumLabelStatsEditor
          items={readArray<NumLabelStat>(content.stats)}
          onChange={(stats) => update({ stats })}
        />
      </PageContentSection>

      <PageContentSection title="Quick facts">
        <LabelValueFactsEditor
          items={readArray(content.facts)}
          onChange={(facts) => update({ facts })}
        />
      </PageContentSection>

      {slug === 'khndzoresk' ? (
        <>
          <PageContentSection title="Heritage sites">
            <CardGridEditor items={[...khndzoresk.sites]} onChange={(sites) => update({ sites })} />
          </PageContentSection>

          <PageContentSection title="Featured virtual tour">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Title"
                value={khndzoresk.tours.featured.title}
                onChange={(e) =>
                  update({
                    tours: {
                      ...khndzoresk.tours,
                      featured: { ...khndzoresk.tours.featured, title: e.target.value },
                    },
                  })
                }
              />
              <TextField
                label="Tag"
                value={khndzoresk.tours.featured.tag}
                onChange={(e) =>
                  update({
                    tours: {
                      ...khndzoresk.tours,
                      featured: { ...khndzoresk.tours.featured, tag: e.target.value },
                    },
                  })
                }
              />
              <TextField
                label="Matterport embed URL"
                value={khndzoresk.tours.featured.embed}
                onChange={(e) =>
                  update({
                    tours: {
                      ...khndzoresk.tours,
                      featured: { ...khndzoresk.tours.featured, embed: e.target.value },
                    },
                  })
                }
                className="sm:col-span-2"
              />
            </div>
          </PageContentSection>

          <PageContentSection title="Mini tours">
            <MiniToursEditor
              items={[...khndzoresk.tours.mini]}
              onChange={(mini) => update({ tours: { ...khndzoresk.tours, mini } })}
            />
          </PageContentSection>

          <KhndzoreskGallerySection
            gallery={khndzoresk.gallery}
            onChange={(galleryPatch) => update({ gallery: { ...khndzoresk.gallery, ...galleryPatch } })}
          />

          <PageContentSection title="Before & after restorations">
            <RestorationPairsEditor
              items={[...khndzoresk.restorations]}
              onChange={(restorations) => update({ restorations })}
            />
          </PageContentSection>
        </>
      ) : null}

      {slug === 'khachaturian-museum' ? (
        <>
          <PageContentSection title="Highlights">
            <HighlightCardsEditor
              items={[...khachaturian.highlights]}
              onChange={(highlights) => update({ highlights })}
            />
          </PageContentSection>

          <PageContentSection title="Major works">
            <CardGridEditor items={[...khachaturian.works]} onChange={(works) => update({ works })} />
          </PageContentSection>

          <PageContentSection title="Photo gallery">
            <GalleryImagesEditor
              items={[...khachaturian.gallery]}
              onChange={(gallery) => update({ gallery })}
            />
          </PageContentSection>

          <PageContentSection title="Audio tracks">
            <AudioTracksEditor
              items={[...khachaturian.audioTracks]}
              onChange={(audioTracks) => update({ audioTracks })}
            />
          </PageContentSection>
        </>
      ) : null}

      {slug === 'national-gallery-armenia' ? (
        <>
          <PageContentSection title="Collections">
            <CardGridEditor items={[...nga.collections]} onChange={(collections) => update({ collections })} />
          </PageContentSection>

          <PageContentSection title="Featured artists">
            <HighlightCardsEditor items={[...nga.artists]} onChange={(artists) => update({ artists })} />
          </PageContentSection>

          <PageContentSection title="Exhibitions">
            <ExhibitionsEditor items={[...nga.exhibitions]} onChange={(exhibitions) => update({ exhibitions })} />
          </PageContentSection>

          <PageContentSection title="Photo gallery">
            <GalleryImagesEditor items={[...nga.gallery]} onChange={(gallery) => update({ gallery })} />
          </PageContentSection>

          <PageContentSection title="Tickets & visiting">
            {tickets.map((ticket, index) => (
              <div key={`ticket-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
                <p className="mb-3 text-sm font-medium text-ink">{ticket.label}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Label"
                    value={ticket.label}
                    onChange={(e) => {
                      const next = [...tickets];
                      next[index] = { ...ticket, label: e.target.value };
                      update({ tickets: next });
                    }}
                  />
                  <TextField
                    label="Title"
                    value={ticket.title}
                    onChange={(e) => {
                      const next = [...tickets];
                      next[index] = { ...ticket, title: e.target.value };
                      update({ tickets: next });
                    }}
                  />
                  <TextField
                    label="Price"
                    value={ticket.price}
                    onChange={(e) => {
                      const next = [...tickets];
                      next[index] = { ...ticket, price: e.target.value };
                      update({ tickets: next });
                    }}
                  />
                  <TextareaField
                    label="Details"
                    rows={2}
                    value={ticket.sub}
                    onChange={(e) => {
                      const next = [...tickets];
                      next[index] = { ...ticket, sub: e.target.value };
                      update({ tickets: next });
                    }}
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            ))}
          </PageContentSection>
        </>
      ) : null}

      <PageContentSection title="Related destinations">
        <RelatedLinksEditor
          items={readArray(content.related)}
          onChange={(related) => update({ related })}
        />
      </PageContentSection>
    </PageContentFormShell>
  );
}
