'use client';

import { useState } from 'react';
import { PageContentFormShell } from '@/components/admin/page-content/PageContentFormShell';
import { SectionVisibilityPanel } from '@/components/admin/page-content/SectionVisibilityPanel';
import { PageContentSection } from '@/components/admin/page-content/PageContentSection';
import { HeroBannerImageField } from '@/components/admin/page-content/HeroBannerImageField';
import { LabelValueFactsEditor } from '@/components/admin/page-content/editors/ContentListEditors';
import { MetadataFields, SectionTextFields } from '@/components/admin/page-content/editors/SectionTextFields';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { parseDonationPageContent } from '@/lib/types/page-content';
import { DONATION_SECTION_TOGGLES } from '@/lib/landing/landing-section-visibility';
import {
  asMutableContent,
  patchContent,
  patchNestedContent,
  readArray,
  readRecord,
  readString,
  type MutablePageContent,
} from '@/lib/admin/page-content-form/mutable-content';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

interface Props {
  initial: Record<string, unknown>;
  locale: SiteLocaleCode;
}

export function DonationPageContentForm({ initial, locale }: Props) {
  const [content, setContent] = useState<MutablePageContent>(() =>
    asMutableContent(parseDonationPageContent(initial)),
  );

  const update = (patch: MutablePageContent): void => {
    setContent((prev) => patchContent(prev, patch));
  };

  const updatePage = (patch: MutablePageContent): void => {
    setContent((prev) => patchNestedContent(prev, 'page', patch));
  };

  const metadata = readRecord(content.metadata);
  const page = readRecord(content.page);
  const hero = readRecord(page.hero);
  const heroBadges = readArray<{ label: string; icon: string }>(hero.badges);
  const mission = readRecord(page.mission);
  const engine = readRecord(page.engine);
  const narrative = readRecord(engine.narrative);
  const narrativeParagraphs = readArray<string>(narrative.paragraphs);
  const quote = readRecord(page.quote);
  const stats = readArray<{ target: number; suffix: string; label: string }>(content.stats);
  const pillars = readArray<{ num: string; title: string; description: string }>(content.pillars);
  const tiers = readArray<{
    id: string;
    label: string;
    monthlyAmd: number | null;
    annualAmd: number | null;
    ctaLabel: string;
    features: Array<{ text: string; included: boolean; lockedLabel?: string }>;
  }>(content.tiers);
  const ledger = readArray<{ value: string; label: string }>(content.ledger);
  const wall = readArray<{ badge: string; count: string; names: string }>(content.wall);
  const trustItems = readArray<{ label: string }>(content.trustItems);

  return (
    <PageContentFormShell slug="donation-page" content={content} locale={locale}>
      <SectionVisibilityPanel
        sections={DONATION_SECTION_TOGGLES}
        visibility={content.sectionVisibility as Record<string, boolean | undefined> | undefined}
        onChange={(sectionVisibility) => update({ sectionVisibility })}
      />

      <MetadataFields
        title={readString(metadata.title)}
        description={readString(metadata.description)}
        onTitleChange={(title) => update({ metadata: { ...metadata, title } })}
        onDescriptionChange={(description) => update({ metadata: { ...metadata, description } })}
      />

      <SectionTextFields
        title="Hero section"
        values={{
          eyebrow: readString(hero.eyebrow),
          title: `${readString(hero.title)} ${readString(hero.titleLine2)}`.trim(),
          accent: readString(hero.accent),
          subtitle: readString(hero.subtitle),
        }}
        fields={['eyebrow', 'title', 'accent', 'subtitle']}
        onChange={(values) =>
          updatePage({
            hero: {
              ...hero,
              eyebrow: values.eyebrow ?? readString(hero.eyebrow),
              title: values.title?.split(' ')[0] ?? readString(hero.title),
              titleLine2: values.title?.split(' ').slice(1).join(' ') || readString(hero.titleLine2),
              accent: values.accent ?? readString(hero.accent),
              subtitle: values.subtitle ?? readString(hero.subtitle),
            },
          })
        }
      />

      <HeroBannerImageField
        value={readString(content.heroImage)}
        onChange={(heroImage) => update({ heroImage })}
      />

      <PageContentSection title="Hero badges">
        {heroBadges.map((badge, index) => (
          <TextField
            key={`badge-${index}`}
            label={`Badge ${index + 1}`}
            value={badge.label}
            onChange={(e) => {
              const badges = [...heroBadges];
              badges[index] = { ...badge, label: e.target.value };
              updatePage({ hero: { ...hero, badges } });
            }}
          />
        ))}
      </PageContentSection>

      <SectionTextFields
        title="Mission"
        values={{
          label: readString(mission.label),
          title: readString(mission.title),
          description: readString(mission.description),
        }}
        fields={['label', 'title', 'description']}
        onChange={(values) => updatePage({ mission: { ...mission, ...values } })}
      />

      <PageContentSection title="Patronage engine">
        <TextField
          label="Section label"
          value={readString(engine.label)}
          onChange={(e) => updatePage({ engine: { ...engine, label: e.target.value } })}
        />
        <TextField
          label="Title"
          value={readString(engine.title)}
          onChange={(e) => updatePage({ engine: { ...engine, title: e.target.value } })}
        />
        <TextareaField
          label="Description"
          rows={3}
          value={readString(engine.description)}
          onChange={(e) => updatePage({ engine: { ...engine, description: e.target.value } })}
        />
        {narrativeParagraphs.map((paragraph, index) => (
          <TextareaField
            key={`narrative-${index}`}
            label={`Story paragraph ${index + 1}`}
            rows={3}
            value={paragraph}
            onChange={(e) => {
              const paragraphs = [...narrativeParagraphs];
              paragraphs[index] = e.target.value;
              updatePage({
                engine: {
                  ...engine,
                  narrative: { ...narrative, paragraphs, closing: readString(narrative.closing) },
                },
              });
            }}
          />
        ))}
        <TextField
          label="Closing line"
          value={readString(narrative.closing)}
          onChange={(e) =>
            updatePage({
              engine: {
                ...engine,
                narrative: { ...narrative, paragraphs: narrativeParagraphs, closing: e.target.value },
              },
            })
          }
        />
      </PageContentSection>

      <PageContentSection title="Impact statistics">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={`stat-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
              <TextField
                label="Target number"
                type="number"
                value={String(stat.target)}
                onChange={(e) => {
                  const next = [...stats];
                  next[index] = { ...stat, target: Number(e.target.value) || 0 };
                  update({ stats: next });
                }}
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <TextField
                  label="Suffix"
                  value={stat.suffix}
                  onChange={(e) => {
                    const next = [...stats];
                    next[index] = { ...stat, suffix: e.target.value };
                    update({ stats: next });
                  }}
                />
                <TextField
                  label="Label"
                  value={stat.label}
                  onChange={(e) => {
                    const next = [...stats];
                    next[index] = { ...stat, label: e.target.value };
                    update({ stats: next });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </PageContentSection>

      <PageContentSection title="Impact pillars">
        {pillars.map((pillar, index) => (
          <div key={`pillar-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
              <TextField
                label="#"
                value={pillar.num}
                onChange={(e) => {
                  const next = [...pillars];
                  next[index] = { ...pillar, num: e.target.value };
                  update({ pillars: next });
                }}
              />
              <TextField
                label="Title"
                value={pillar.title}
                onChange={(e) => {
                  const next = [...pillars];
                  next[index] = { ...pillar, title: e.target.value };
                  update({ pillars: next });
                }}
              />
            </div>
            <div className="mt-3">
              <TextareaField
                label="Description"
                rows={2}
                value={pillar.description}
                onChange={(e) => {
                  const next = [...pillars];
                  next[index] = { ...pillar, description: e.target.value };
                  update({ pillars: next });
                }}
              />
            </div>
          </div>
        ))}
      </PageContentSection>

      <PageContentSection title="Donation tiers">
        {tiers.map((tier, tierIndex) => (
          <div key={`tier-${tier.id}`} className="rounded-xl border border-bronze-200/50 bg-white p-4">
            <p className="mb-3 font-display text-lg text-ink">{tier.label}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Tier label"
                value={tier.label}
                onChange={(e) => {
                  const next = [...tiers];
                  next[tierIndex] = { ...tier, label: e.target.value };
                  update({ tiers: next });
                }}
              />
              <TextField
                label="CTA button"
                value={tier.ctaLabel}
                onChange={(e) => {
                  const next = [...tiers];
                  next[tierIndex] = { ...tier, ctaLabel: e.target.value };
                  update({ tiers: next });
                }}
              />
              <TextField
                label="Monthly AMD"
                value={tier.monthlyAmd == null ? '' : String(tier.monthlyAmd)}
                onChange={(e) => {
                  const next = [...tiers];
                  next[tierIndex] = {
                    ...tier,
                    monthlyAmd: e.target.value ? Number(e.target.value) : null,
                  };
                  update({ tiers: next });
                }}
              />
              <TextField
                label="Annual AMD"
                value={tier.annualAmd == null ? '' : String(tier.annualAmd)}
                onChange={(e) => {
                  const next = [...tiers];
                  next[tierIndex] = {
                    ...tier,
                    annualAmd: e.target.value ? Number(e.target.value) : null,
                  };
                  update({ tiers: next });
                }}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm font-medium text-ink">Features</p>
              {tier.features.map((feature, featureIndex) => (
                <div
                  key={`feature-${tierIndex}-${featureIndex}`}
                  className="flex flex-wrap items-center gap-3 rounded-lg bg-parchment-50 px-3 py-2"
                >
                  <input
                    type="checkbox"
                    checked={feature.included}
                    onChange={(e) => {
                      const next = [...tiers];
                      const features = [...tier.features];
                      features[featureIndex] = { ...feature, included: e.target.checked };
                      next[tierIndex] = { ...tier, features };
                      update({ tiers: next });
                    }}
                    className="rounded border-stone-300"
                  />
                  <input
                    type="text"
                    value={feature.text}
                    onChange={(e) => {
                      const next = [...tiers];
                      const features = [...tier.features];
                      features[featureIndex] = { ...feature, text: e.target.value };
                      next[tierIndex] = { ...tier, features };
                      update({ tiers: next });
                    }}
                    className="min-w-0 flex-1 rounded border border-stone-200 px-2 py-1 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </PageContentSection>

      <PageContentSection title="Open ledger">
        <div className="grid gap-3 sm:grid-cols-2">
          {ledger.map((item, index) => (
            <div key={`ledger-${index}`} className="rounded-lg border border-stone-100 bg-white p-3">
              <TextField
                label="Value"
                value={item.value}
                onChange={(e) => {
                  const next = [...ledger];
                  next[index] = { ...item, value: e.target.value };
                  update({ ledger: next });
                }}
              />
              <TextField
                label="Label"
                value={item.label}
                onChange={(e) => {
                  const next = [...ledger];
                  next[index] = { ...item, label: e.target.value };
                  update({ ledger: next });
                }}
              />
            </div>
          ))}
        </div>
      </PageContentSection>

      <PageContentSection title="Patron wall">
        {wall.map((entry, index) => (
          <div key={`wall-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Badge"
                value={entry.badge}
                onChange={(e) => {
                  const next = [...wall];
                  next[index] = { ...entry, badge: e.target.value };
                  update({ wall: next });
                }}
              />
              <TextField
                label="Count"
                value={entry.count}
                onChange={(e) => {
                  const next = [...wall];
                  next[index] = { ...entry, count: e.target.value };
                  update({ wall: next });
                }}
              />
              <TextareaField
                label="Patron names"
                rows={2}
                value={entry.names}
                onChange={(e) => {
                  const next = [...wall];
                  next[index] = { ...entry, names: e.target.value };
                  update({ wall: next });
                }}
                className="sm:col-span-2"
              />
            </div>
          </div>
        ))}
      </PageContentSection>

      <PageContentSection title="Trust signals">
        <LabelValueFactsEditor
          items={trustItems.map((item) => ({ label: 'Item', value: item.label }))}
          onChange={(items) => update({ trustItems: items.map((i) => ({ label: i.value })) })}
        />
      </PageContentSection>

      <PageContentSection title="Quote">
        <TextareaField
          label="Quote text"
          rows={3}
          value={readString(quote.text)}
          onChange={(e) => updatePage({ quote: { ...quote, text: e.target.value } })}
        />
        <TextField
          label="Quote attribution"
          value={readString(quote.cite)}
          onChange={(e) => updatePage({ quote: { ...quote, cite: e.target.value } })}
        />
      </PageContentSection>
    </PageContentFormShell>
  );
}

