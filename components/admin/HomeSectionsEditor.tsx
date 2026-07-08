'use client';

import { Plus, Trash2 } from 'lucide-react';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { Button } from '@/components/ui/Button';
import type { HomeSections } from '@/lib/types/home-sections';

interface HomeSectionsEditorProps {
  sections: HomeSections;
  onChange: (sections: HomeSections) => void;
  sectionError?: string;
}

interface HeaderFieldsProps {
  eyebrow: string;
  title: string;
  description: string;
  onEyebrow: (value: string) => void;
  onTitle: (value: string) => void;
  onDescription: (value: string) => void;
}

function SectionHeaderFields({
  eyebrow,
  title,
  description,
  onEyebrow,
  onTitle,
  onDescription,
}: HeaderFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField label="Section label" value={eyebrow} onChange={(e) => onEyebrow(e.target.value)} />
      <TextField label="Section title" value={title} onChange={(e) => onTitle(e.target.value)} />
      <div className="sm:col-span-2">
        <TextareaField
          label="Section description"
          rows={3}
          value={description}
          onChange={(e) => onDescription(e.target.value)}
        />
      </div>
    </div>
  );
}

const VM_ICONS = [
  { value: 'tours', label: '3D tours' },
  { value: 'artefacts', label: 'Artefacts' },
  { value: 'galleries', label: 'Galleries' },
  { value: 'events', label: 'Events' },
];

const BADGE_TONES = [
  { value: 'teal', label: 'Teal badge' },
  { value: 'gold', label: 'Gold badge' },
];

const PARTNER_ICONS = [
  { value: 'museums', label: 'Museums' },
  { value: 'universities', label: 'Universities' },
  { value: 'unesco', label: 'UNESCO' },
  { value: 'culturalNgos', label: 'Cultural NGOs' },
  { value: 'mediaPartners', label: 'Media partners' },
  { value: 'technology', label: 'Technology' },
  { value: 'governments', label: 'Governments' },
  { value: 'becomePartner', label: 'Become a partner' },
];

const ABOUT_ICONS = [
  { value: 'mission', label: 'Mission' },
  { value: 'team', label: 'Team' },
  { value: 'career', label: 'Careers' },
  { value: 'contact', label: 'Contact' },
];

export function HomeSectionsEditor({ sections, onChange, sectionError }: HomeSectionsEditorProps) {
  const patch = (partial: Partial<HomeSections>): void => {
    onChange({ ...sections, ...partial });
  };

  return (
    <div className="flex flex-col gap-5">
      <AdminFormSection
        title="Virtual Museum block"
        description="Feature cards shown in the virtual museum section on the homepage."
        tone="white"
      >
        <TextField
          label="Badge text"
          value={sections.virtualMuseum.badge}
          onChange={(e) => patch({ virtualMuseum: { ...sections.virtualMuseum, badge: e.target.value } })}
        />
        <SectionHeaderFields
          eyebrow={sections.virtualMuseum.eyebrow}
          title={sections.virtualMuseum.title}
          description={sections.virtualMuseum.description}
          onEyebrow={(v) => patch({ virtualMuseum: { ...sections.virtualMuseum, eyebrow: v } })}
          onTitle={(v) => patch({ virtualMuseum: { ...sections.virtualMuseum, title: v } })}
          onDescription={(v) => patch({ virtualMuseum: { ...sections.virtualMuseum, description: v } })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Button text"
            value={sections.virtualMuseum.ctaText}
            onChange={(e) => patch({ virtualMuseum: { ...sections.virtualMuseum, ctaText: e.target.value } })}
          />
          <TextField
            label="Button link"
            value={sections.virtualMuseum.ctaUrl}
            onChange={(e) => patch({ virtualMuseum: { ...sections.virtualMuseum, ctaUrl: e.target.value } })}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-ink">Feature cards</p>
          {sections.virtualMuseum.features.map((feature, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-stone-100 bg-parchment-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-eyebrow text-bronze-700">Card {index + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const features = sections.virtualMuseum.features.filter((_, i) => i !== index);
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                  disabled={sections.virtualMuseum.features.length <= 1}
                >
                  <Trash2 size={14} aria-hidden /> Remove
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Number"
                  value={feature.number}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, number: e.target.value };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
                <SelectField
                  label="Icon type"
                  value={feature.icon}
                  options={VM_ICONS}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, icon: e.target.value as typeof feature.icon };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
                <TextField
                  label="Icon image URL"
                  value={feature.iconSrc}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, iconSrc: e.target.value };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
                <TextField
                  label="Link URL"
                  value={feature.sourceHref}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, sourceHref: e.target.value };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
                <TextField
                  label="Badge text"
                  value={feature.badge}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, badge: e.target.value };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
                <SelectField
                  label="Badge color"
                  value={feature.badgeTone}
                  options={BADGE_TONES}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, badgeTone: e.target.value as typeof feature.badgeTone };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
                <TextField
                  label="Card title"
                  value={feature.title}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, title: e.target.value };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
                <TextareaField
                  label="Card description"
                  rows={2}
                  value={feature.description}
                  onChange={(e) => {
                    const features = [...sections.virtualMuseum.features];
                    features[index] = { ...feature, description: e.target.value };
                    patch({ virtualMuseum: { ...sections.virtualMuseum, features } });
                  }}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="self-start"
            onClick={() => {
              const last = sections.virtualMuseum.features.at(-1);
              if (!last) return;
              patch({
                virtualMuseum: {
                  ...sections.virtualMuseum,
                  features: [...sections.virtualMuseum.features, { ...last }],
                },
              });
            }}
            disabled={sections.virtualMuseum.features.length >= 8}
          >
            <Plus size={14} aria-hidden /> Add feature card
          </Button>
        </div>
      </AdminFormSection>

      <AdminFormSection title="Cultural Portal block" description="Short intro above the culture portal grid.">
        <SectionHeaderFields
          eyebrow={sections.culturalPortal.eyebrow}
          title={sections.culturalPortal.title}
          description={sections.culturalPortal.description}
          onEyebrow={(v) => patch({ culturalPortal: { ...sections.culturalPortal, eyebrow: v } })}
          onTitle={(v) => patch({ culturalPortal: { ...sections.culturalPortal, title: v } })}
          onDescription={(v) => patch({ culturalPortal: { ...sections.culturalPortal, description: v } })}
        />
      </AdminFormSection>

      <AdminFormSection title="Featured Treasures block" tone="white">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Section label"
            value={sections.featuredTreasures.eyebrow}
            onChange={(e) =>
              patch({ featuredTreasures: { ...sections.featuredTreasures, eyebrow: e.target.value } })
            }
          />
          <TextField
            label="Section title"
            value={sections.featuredTreasures.title}
            onChange={(e) =>
              patch({ featuredTreasures: { ...sections.featuredTreasures, title: e.target.value } })
            }
          />
        </div>
      </AdminFormSection>

      <AdminFormSection title="Heritage Map block" description="Map placeholder and legend labels.">
        <SectionHeaderFields
          eyebrow={sections.heritageMap.eyebrow}
          title={sections.heritageMap.title}
          description={sections.heritageMap.description}
          onEyebrow={(v) => patch({ heritageMap: { ...sections.heritageMap, eyebrow: v } })}
          onTitle={(v) => patch({ heritageMap: { ...sections.heritageMap, title: v } })}
          onDescription={(v) => patch({ heritageMap: { ...sections.heritageMap, description: v } })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Map placeholder title"
            value={sections.heritageMap.placeholderTitle}
            onChange={(e) =>
              patch({ heritageMap: { ...sections.heritageMap, placeholderTitle: e.target.value } })
            }
          />
          <TextField
            label="Map placeholder subtitle"
            value={sections.heritageMap.placeholderSubtitle}
            onChange={(e) =>
              patch({ heritageMap: { ...sections.heritageMap, placeholderSubtitle: e.target.value } })
            }
          />
          <TextField
            label="Map link"
            value={sections.heritageMap.ctaUrl}
            onChange={(e) => patch({ heritageMap: { ...sections.heritageMap, ctaUrl: e.target.value } })}
          />
        </div>
        <LegendEditor
          legend={sections.heritageMap.legend}
          onChange={(legend) => patch({ heritageMap: { ...sections.heritageMap, legend } })}
        />
      </AdminFormSection>

      <AdminFormSection title="Upcoming Projects block" tone="white">
        <SectionHeaderFields
          eyebrow={sections.upcomingProjects.eyebrow}
          title={sections.upcomingProjects.title}
          description={sections.upcomingProjects.description}
          onEyebrow={(v) => patch({ upcomingProjects: { ...sections.upcomingProjects, eyebrow: v } })}
          onTitle={(v) => patch({ upcomingProjects: { ...sections.upcomingProjects, title: v } })}
          onDescription={(v) => patch({ upcomingProjects: { ...sections.upcomingProjects, description: v } })}
        />
      </AdminFormSection>

      <PartnershipSectionEditor sections={sections} onChange={onChange} />
      <DonationsSectionEditor sections={sections} onChange={onChange} />
      <AboutSectionEditor sections={sections} onChange={onChange} />

      {sectionError ? <p className="text-sm text-pomegranate">{sectionError}</p> : null}
    </div>
  );
}

function LegendEditor({
  legend,
  onChange,
}: {
  legend: HomeSections['heritageMap']['legend'];
  onChange: (legend: HomeSections['heritageMap']['legend']) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-ink">Map legend items</p>
      {legend.map((item, index) => (
        <div key={index} className="grid gap-3 rounded-xl border border-stone-100 bg-white p-3 sm:grid-cols-2">
          <TextField
            label="Label"
            value={item.label}
            onChange={(e) => {
              const next = [...legend];
              next[index] = { ...item, label: e.target.value };
              onChange(next);
            }}
          />
          <TextField
            label="Color (CSS class or hex)"
            value={item.color}
            onChange={(e) => {
              const next = [...legend];
              next[index] = { ...item, color: e.target.value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function PartnershipSectionEditor({
  sections,
  onChange,
}: {
  sections: HomeSections;
  onChange: (sections: HomeSections) => void;
}) {
  const partnership = sections.partnership;
  return (
    <AdminFormSection title="Partnership block" description="Partner categories grid and call-to-action.">
      <SectionHeaderFields
        eyebrow={partnership.eyebrow}
        title={partnership.title}
        description={partnership.description}
        onEyebrow={(v) => onChange({ ...sections, partnership: { ...partnership, eyebrow: v } })}
        onTitle={(v) => onChange({ ...sections, partnership: { ...partnership, title: v } })}
        onDescription={(v) => onChange({ ...sections, partnership: { ...partnership, description: v } })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Button label"
          value={partnership.ctaLabel}
          onChange={(e) =>
            onChange({ ...sections, partnership: { ...partnership, ctaLabel: e.target.value } })
          }
        />
        <TextField
          label="Button link"
          value={partnership.ctaUrl}
          onChange={(e) => onChange({ ...sections, partnership: { ...partnership, ctaUrl: e.target.value } })}
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-ink">Partner categories</p>
        {partnership.categories.map((category, index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-stone-100 bg-parchment-50 p-4 sm:grid-cols-2">
            <TextField
              label="Title"
              value={category.title}
              onChange={(e) => {
                const categories = [...partnership.categories];
                categories[index] = { ...category, title: e.target.value };
                onChange({ ...sections, partnership: { ...partnership, categories } });
              }}
            />
            <SelectField
              label="Icon"
              value={category.icon}
              options={PARTNER_ICONS}
              onChange={(e) => {
                const categories = [...partnership.categories];
                categories[index] = { ...category, icon: e.target.value as typeof category.icon };
                onChange({ ...sections, partnership: { ...partnership, categories } });
              }}
            />
            <SelectField
              label="Style"
              value={category.variant ?? 'default'}
              options={[
                { value: 'default', label: 'Standard card' },
                { value: 'cta', label: 'Call-to-action card' },
              ]}
              onChange={(e) => {
                const categories = [...partnership.categories];
                categories[index] = {
                  ...category,
                  variant: e.target.value as 'default' | 'cta',
                };
                onChange({ ...sections, partnership: { ...partnership, categories } });
              }}
            />
            <TextField
              label="Link (optional)"
              value={category.href ?? ''}
              onChange={(e) => {
                const categories = [...partnership.categories];
                categories[index] = { ...category, href: e.target.value || undefined };
                onChange({ ...sections, partnership: { ...partnership, categories } });
              }}
            />
          </div>
        ))}
      </div>
    </AdminFormSection>
  );
}

function DonationsSectionEditor({
  sections,
  onChange,
}: {
  sections: HomeSections;
  onChange: (sections: HomeSections) => void;
}) {
  const donations = sections.donations;
  return (
    <AdminFormSection title="Donations block" tone="white">
      <SectionHeaderFields
        eyebrow={donations.eyebrow}
        title={donations.title}
        description={donations.description}
        onEyebrow={(v) => onChange({ ...sections, donations: { ...donations, eyebrow: v } })}
        onTitle={(v) => onChange({ ...sections, donations: { ...donations, title: v } })}
        onDescription={(v) => onChange({ ...sections, donations: { ...donations, description: v } })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Button label"
          value={donations.ctaLabel}
          onChange={(e) => onChange({ ...sections, donations: { ...donations, ctaLabel: e.target.value } })}
        />
        <TextField
          label="Button link"
          value={donations.ctaUrl}
          onChange={(e) => onChange({ ...sections, donations: { ...donations, ctaUrl: e.target.value } })}
        />
      </div>
    </AdminFormSection>
  );
}

function AboutSectionEditor({
  sections,
  onChange,
}: {
  sections: HomeSections;
  onChange: (sections: HomeSections) => void;
}) {
  const aboutUs = sections.aboutUs;
  return (
    <AdminFormSection title="About Us block" description="Intro text and quick-link cards.">
      <SectionHeaderFields
        eyebrow={aboutUs.eyebrow}
        title={aboutUs.title}
        description={aboutUs.description}
        onEyebrow={(v) => onChange({ ...sections, aboutUs: { ...aboutUs, eyebrow: v } })}
        onTitle={(v) => onChange({ ...sections, aboutUs: { ...aboutUs, title: v } })}
        onDescription={(v) => onChange({ ...sections, aboutUs: { ...aboutUs, description: v } })}
      />
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-ink">Quick-link cards</p>
        {aboutUs.cards.map((card, index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-stone-100 bg-parchment-50 p-4 sm:grid-cols-2">
            <TextField
              label="Title"
              value={card.title}
              onChange={(e) => {
                const cards = [...aboutUs.cards];
                cards[index] = { ...card, title: e.target.value };
                onChange({ ...sections, aboutUs: { ...aboutUs, cards } });
              }}
            />
            <SelectField
              label="Icon"
              value={card.icon}
              options={ABOUT_ICONS}
              onChange={(e) => {
                const cards = [...aboutUs.cards];
                cards[index] = { ...card, icon: e.target.value as typeof card.icon };
                onChange({ ...sections, aboutUs: { ...aboutUs, cards } });
              }}
            />
            <TextField
              label="Link"
              value={card.href}
              onChange={(e) => {
                const cards = [...aboutUs.cards];
                cards[index] = { ...card, href: e.target.value };
                onChange({ ...sections, aboutUs: { ...aboutUs, cards } });
              }}
            />
            <TextareaField
              label="Description"
              rows={2}
              value={card.description}
              onChange={(e) => {
                const cards = [...aboutUs.cards];
                cards[index] = { ...card, description: e.target.value };
                onChange({ ...sections, aboutUs: { ...aboutUs, cards } });
              }}
            />
          </div>
        ))}
      </div>
    </AdminFormSection>
  );
}
