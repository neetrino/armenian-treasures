'use client';

import { useState } from 'react';
import { PageContentFormShell } from '@/components/admin/page-content/PageContentFormShell';
import { PageContentSection } from '@/components/admin/page-content/PageContentSection';
import { HeroBannerImageField } from '@/components/admin/page-content/HeroBannerImageField';
import { PageContentImageField } from '@/components/admin/page-content/PageContentImageField';
import { NumLabelStatsEditor } from '@/components/admin/page-content/editors/ContentListEditors';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import {
  parsePartnershipPageContent,
} from '@/lib/types/page-content';
import {
  asMutableContent,
  patchContent,
  readArray,
  readString,
  type MutablePageContent,
} from '@/lib/admin/page-content-form/mutable-content';

interface Props {
  initial: Record<string, unknown>;
}

export function PartnershipPageContentForm({ initial }: Props) {
  const [content, setContent] = useState<MutablePageContent>(() =>
    asMutableContent(parsePartnershipPageContent(initial)),
  );

  const update = (patch: MutablePageContent): void => {
    setContent((prev) => patchContent(prev, patch));
  };

  const stats = readArray<{ num: string; label: string }>(content.stats);
  const impact = readArray<{ ghost: string; tag: string; title: string; desc: string }>(content.impact);
  const timeline = readArray<{ num: string; name: string; desc: string }>(content.timeline);
  const values = readArray<{ title: string; desc: string }>(content.values);
  const categories = readArray<{
    label: string;
    row: string;
    partners: Array<{
      sector: string;
      name: string;
      desc: string;
      href: string;
      arrow: string;
      logo: { type: 'image'; src: string; alt: string } | { type: 'placeholder'; label: string };
    }>;
  }>(content.categories);

  return (
    <PageContentFormShell slug="partnership-page" content={content}>
      <HeroBannerImageField
        value={readString(content.heroImage)}
        onChange={(heroImage) => update({ heroImage })}
      />

      <PageContentSection title="Impact statistics">
        <NumLabelStatsEditor
          items={stats}
          showSuffix={false}
          onChange={(nextStats) => update({ stats: nextStats })}
        />
      </PageContentSection>

      <PageContentSection title="Impact pillars">
        {impact.map((item, index) => (
          <div key={`impact-${index}`} className="rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-medium text-ink">Pillar {index + 1}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Roman numeral"
                value={item.ghost}
                onChange={(e) => {
                  const next = [...impact];
                  next[index] = { ...item, ghost: e.target.value };
                  update({ impact: next });
                }}
              />
              <TextField
                label="Tag"
                value={item.tag}
                onChange={(e) => {
                  const next = [...impact];
                  next[index] = { ...item, tag: e.target.value };
                  update({ impact: next });
                }}
              />
              <TextField
                label="Title"
                value={item.title}
                onChange={(e) => {
                  const next = [...impact];
                  next[index] = { ...item, title: e.target.value };
                  update({ impact: next });
                }}
                className="sm:col-span-2"
              />
              <TextareaField
                label="Description"
                rows={3}
                value={item.desc}
                onChange={(e) => {
                  const next = [...impact];
                  next[index] = { ...item, desc: e.target.value };
                  update({ impact: next });
                }}
                className="sm:col-span-2"
              />
            </div>
          </div>
        ))}
      </PageContentSection>

      <PageContentSection title="Partnership process">
        {timeline.map((step, index) => (
          <div key={`timeline-${index}`} className="grid gap-3 rounded-xl border border-stone-100 bg-white p-4 sm:grid-cols-[auto_1fr]">
            <TextField
              label="#"
              value={step.num}
              onChange={(e) => {
                const next = [...timeline];
                next[index] = { ...step, num: e.target.value };
                update({ timeline: next });
              }}
            />
            <TextField
              label="Step name"
              value={step.name}
              onChange={(e) => {
                const next = [...timeline];
                next[index] = { ...step, name: e.target.value };
                update({ timeline: next });
              }}
            />
            <TextareaField
              label="Description"
              rows={2}
              value={step.desc}
              onChange={(e) => {
                const next = [...timeline];
                next[index] = { ...step, desc: e.target.value };
                update({ timeline: next });
              }}
              className="sm:col-span-2"
            />
          </div>
        ))}
      </PageContentSection>

      <PageContentSection title="Core values">
        {values.map((value, index) => (
          <div key={`value-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
            <TextField
              label="Title"
              value={value.title}
              onChange={(e) => {
                const next = [...values];
                next[index] = { ...value, title: e.target.value };
                update({ values: next });
              }}
            />
            <div className="mt-3">
              <TextareaField
                label="Description"
                rows={3}
                value={value.desc}
                onChange={(e) => {
                  const next = [...values];
                  next[index] = { ...value, desc: e.target.value };
                  update({ values: next });
                }}
              />
            </div>
          </div>
        ))}
      </PageContentSection>

      <PageContentSection
        title="Partner institutions"
        description="Organised by category. Upload partner logos or use a text placeholder."
      >
        {categories.map((category, catIndex) => (
          <div key={`cat-${catIndex}`} className="rounded-xl border border-bronze-200/40 bg-white p-4">
            <TextField
              label="Category label"
              value={category.label}
              onChange={(e) => {
                const next = [...categories];
                next[catIndex] = { ...category, label: e.target.value };
                update({ categories: next });
              }}
            />
            <div className="mt-4 flex flex-col gap-4">
              {category.partners.map((partner, partnerIndex) => (
                <div key={`partner-${catIndex}-${partnerIndex}`} className="rounded-lg border border-stone-100 bg-parchment-50/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-ink">{partner.name || 'Partner'}</p>
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...categories];
                        next[catIndex] = {
                          ...category,
                          partners: category.partners.filter((_, i) => i !== partnerIndex),
                        };
                        update({ categories: next });
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 hover:text-pomegranate"
                      aria-label="Remove partner"
                    >
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField
                      label="Sector"
                      value={partner.sector}
                      onChange={(e) => {
                        const next = [...categories];
                        const partners = [...category.partners];
                        partners[partnerIndex] = { ...partner, sector: e.target.value };
                        next[catIndex] = { ...category, partners };
                        update({ categories: next });
                      }}
                    />
                    <TextField
                      label="Institution name"
                      value={partner.name}
                      onChange={(e) => {
                        const next = [...categories];
                        const partners = [...category.partners];
                        partners[partnerIndex] = { ...partner, name: e.target.value };
                        next[catIndex] = { ...category, partners };
                        update({ categories: next });
                      }}
                    />
                    <TextareaField
                      label="Description"
                      rows={3}
                      value={partner.desc}
                      onChange={(e) => {
                        const next = [...categories];
                        const partners = [...category.partners];
                        partners[partnerIndex] = { ...partner, desc: e.target.value };
                        next[catIndex] = { ...category, partners };
                        update({ categories: next });
                      }}
                      className="sm:col-span-2"
                    />
                    <TextField
                      label="Link"
                      value={partner.href}
                      onChange={(e) => {
                        const next = [...categories];
                        const partners = [...category.partners];
                        partners[partnerIndex] = { ...partner, href: e.target.value };
                        next[catIndex] = { ...category, partners };
                        update({ categories: next });
                      }}
                    />
                    <TextField
                      label="CTA text"
                      value={partner.arrow}
                      onChange={(e) => {
                        const next = [...categories];
                        const partners = [...category.partners];
                        partners[partnerIndex] = { ...partner, arrow: e.target.value };
                        next[catIndex] = { ...category, partners };
                        update({ categories: next });
                      }}
                    />
                    {partner.logo.type === 'image' ? (
                      <div className="sm:col-span-2">
                        <PageContentImageField
                          label="Partner logo"
                          layout="card"
                          value={partner.logo.src}
                          onChange={(src) => {
                            const next = [...categories];
                            const partners = [...category.partners];
                            partners[partnerIndex] = {
                              ...partner,
                              logo: {
                                type: 'image' as const,
                                src,
                                alt: partner.logo.type === 'image' ? partner.logo.alt : partner.name,
                              },
                            };
                            next[catIndex] = { ...category, partners };
                            update({ categories: next });
                          }}
                        />
                        <TextField
                          label="Logo alt text"
                          value={partner.logo.type === 'image' ? partner.logo.alt : ''}
                          onChange={(e) => {
                            if (partner.logo.type !== 'image') return;
                            const next = [...categories];
                            const partners = [...category.partners];
                            partners[partnerIndex] = {
                              ...partner,
                              logo: { type: 'image' as const, src: partner.logo.src, alt: e.target.value },
                            };
                            next[catIndex] = { ...category, partners };
                            update({ categories: next });
                          }}
                          className="mt-3"
                        />
                      </div>
                    ) : (
                      <TextField
                        label="Placeholder label"
                        value={partner.logo.type === 'placeholder' ? partner.logo.label : ''}
                        onChange={(e) => {
                          const next = [...categories];
                          const partners = [...category.partners];
                          partners[partnerIndex] = {
                            ...partner,
                            logo: { type: 'placeholder' as const, label: e.target.value },
                          };
                          next[catIndex] = { ...category, partners };
                          update({ categories: next });
                        }}
                        className="sm:col-span-2"
                      />
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  const next = [...categories];
                  next[catIndex] = {
                    ...category,
                    partners: [
                      ...category.partners,
                      {
                        sector: '',
                        name: 'New partner',
                        desc: '',
                        href: '/culture',
                        arrow: 'View Institution →',
                        logo: { type: 'placeholder' as const, label: 'Partner logo' },
                      },
                    ],
                  };
                  update({ categories: next });
                }}
              >
                Add partner to category
              </Button>
            </div>
          </div>
        ))}
      </PageContentSection>
    </PageContentFormShell>
  );
}
