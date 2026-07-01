'use client';

import { useState } from 'react';
import { PageContentFormShell } from '@/components/admin/page-content/PageContentFormShell';
import { PageContentSection } from '@/components/admin/page-content/PageContentSection';
import { HeroBannerImageField } from '@/components/admin/page-content/HeroBannerImageField';
import { MetadataFields, SectionTextFields } from '@/components/admin/page-content/editors/SectionTextFields';
import { TextField } from '@/components/forms/fields/TextField';
import { TextareaField } from '@/components/forms/fields/TextareaField';
import { parseCulturalPortalPageContent } from '@/lib/types/page-content';
import {
  asMutableContent,
  patchContent,
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

export function CulturalPortalPageContentForm({ initial, locale }: Props) {
  const [content, setContent] = useState<MutablePageContent>(() =>
    asMutableContent(parseCulturalPortalPageContent(initial)),
  );

  const update = (patch: MutablePageContent): void => {
    setContent((prev) => patchContent(prev, patch));
  };

  const metadata = readRecord(content.metadata);
  const hero = readRecord(content.hero);
  const primaryCta = readRecord(hero.primaryCta);
  const secondaryCta = readRecord(hero.secondaryCta);
  const portalSection = readRecord(content.CULTURAL_PORTAL_SECTION);
  const portalMap = readRecord(content.CULTURAL_PORTAL_MAP);
  const projectsSection = readRecord(content.CULTURAL_PORTAL_PROJECTS_SECTION);
  const aboutSection = readRecord(content.CULTURAL_PORTAL_ABOUT);
  const aboutCards = readArray<{ title: string; description: string; href: string; icon: string }>(
    aboutSection.cards,
  );
  const donorsSection = readRecord(content.CULTURAL_PORTAL_DONORS);
  const donorTiers = readArray<{ badge: string; names: string }>(donorsSection.tiers);
  const newsletter = readRecord(content.CULTURAL_PORTAL_NEWSLETTER);
  const partnershipSection = readRecord(content.HOME_PARTNERSHIP_SECTION);

  return (
    <PageContentFormShell slug="cultural-portal-page" content={content} locale={locale}>
      <MetadataFields
        title={readString(metadata.title)}
        description={readString(metadata.description)}
        onTitleChange={(title) => update({ metadata: { ...metadata, title } })}
        onDescriptionChange={(description) => update({ metadata: { ...metadata, description } })}
      />

      <SectionTextFields
        title="Hero"
        values={{
          eyebrow: readString(hero.eyebrow),
          title: readString(hero.title),
          accent: readString(hero.accent),
          subtitle: readString(hero.subtitle),
        }}
        onChange={(values) => update({ hero: { ...hero, ...values } })}
      />

      <HeroBannerImageField
        value={readString(content.heroImage)}
        onChange={(heroImage) => update({ heroImage })}
      />

      <PageContentSection title="Hero calls to action">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Primary button label"
            value={readString(primaryCta.label)}
            onChange={(e) => update({ hero: { ...hero, primaryCta: { ...primaryCta, label: e.target.value } } })}
          />
          <TextField
            label="Primary button link"
            value={readString(primaryCta.href)}
            onChange={(e) => update({ hero: { ...hero, primaryCta: { ...primaryCta, href: e.target.value } } })}
          />
          <TextField
            label="Secondary button label"
            value={readString(secondaryCta.label)}
            onChange={(e) =>
              update({ hero: { ...hero, secondaryCta: { ...secondaryCta, label: e.target.value } } })
            }
          />
          <TextField
            label="Secondary button link"
            value={readString(secondaryCta.href)}
            onChange={(e) =>
              update({ hero: { ...hero, secondaryCta: { ...secondaryCta, href: e.target.value } } })
            }
          />
        </div>
      </PageContentSection>

      <PageContentSection title="Portal categories header">
        <SectionTextFields
          title=""
          values={{
            eyebrow: readString(portalSection.eyebrow),
            title: readString(portalSection.title),
            description: readString(portalSection.description),
          }}
          fields={['eyebrow', 'title', 'description']}
          onChange={(values) => update({ CULTURAL_PORTAL_SECTION: { ...portalSection, ...values } })}
        />
        <p className="text-xs text-ink-muted">
          Category cards are built automatically from the culture menu. Featured highlights come from published culture items.
        </p>
      </PageContentSection>

      <PageContentSection title="Interactive map">
        <SectionTextFields
          title=""
          values={{
            eyebrow: readString(portalMap.eyebrow),
            title: readString(portalMap.title),
            description: readString(portalMap.description),
          }}
          fields={['eyebrow', 'title', 'description']}
          onChange={(values) => update({ CULTURAL_PORTAL_MAP: { ...portalMap, ...values } })}
        />
        <TextField
          label="Map placeholder title"
          value={readString(portalMap.placeholderTitle)}
          onChange={(e) =>
            update({ CULTURAL_PORTAL_MAP: { ...portalMap, placeholderTitle: e.target.value } })
          }
        />
        <TextField
          label="Map placeholder subtitle"
          value={readString(portalMap.placeholderSubtitle)}
          onChange={(e) =>
            update({ CULTURAL_PORTAL_MAP: { ...portalMap, placeholderSubtitle: e.target.value } })
          }
        />
      </PageContentSection>

      <PageContentSection title="Upcoming projects header">
        <SectionTextFields
          title=""
          values={{
            eyebrow: readString(projectsSection.eyebrow),
            title: readString(projectsSection.title),
            description: readString(projectsSection.description),
          }}
          fields={['eyebrow', 'title', 'description']}
          onChange={(values) => update({ CULTURAL_PORTAL_PROJECTS_SECTION: { ...projectsSection, ...values } })}
        />
        <p className="text-xs text-ink-muted">
          Project cards are loaded from published projects in the admin Projects section.
        </p>
      </PageContentSection>

      <PageContentSection title="About the team">
        <SectionTextFields
          title=""
          values={{
            eyebrow: readString(aboutSection.eyebrow),
            title: readString(aboutSection.title),
            description: readString(aboutSection.description),
          }}
          fields={['eyebrow', 'title', 'description']}
          onChange={(values) => update({ CULTURAL_PORTAL_ABOUT: { ...aboutSection, ...values } })}
        />
        {aboutCards.map((card, index) => (
          <div key={`about-card-${index}`} className="rounded-xl border border-stone-100 bg-white p-4">
            <TextField
              label="Card title"
              value={card.title}
              onChange={(e) => {
                const cards = [...aboutCards];
                cards[index] = { ...card, title: e.target.value };
                update({ CULTURAL_PORTAL_ABOUT: { ...aboutSection, cards } });
              }}
            />
            <div className="mt-3">
              <TextareaField
                label="Description"
                rows={3}
                value={card.description}
                onChange={(e) => {
                  const cards = [...aboutCards];
                  cards[index] = { ...card, description: e.target.value };
                  update({ CULTURAL_PORTAL_ABOUT: { ...aboutSection, cards } });
                }}
              />
            </div>
          </div>
        ))}
      </PageContentSection>

      <PageContentSection title="Donors section">
        <SectionTextFields
          title=""
          values={{
            eyebrow: readString(donorsSection.eyebrow),
            title: readString(donorsSection.title),
            description: readString(donorsSection.description),
          }}
          fields={['eyebrow', 'title', 'description']}
          onChange={(values) => update({ CULTURAL_PORTAL_DONORS: { ...donorsSection, ...values } })}
        />
        {donorTiers.map((tier, index) => (
          <div key={`donor-tier-${index}`} className="rounded-lg border border-stone-100 bg-white p-3">
            <TextField
              label="Tier badge"
              value={tier.badge}
              onChange={(e) => {
                const tiers = [...donorTiers];
                tiers[index] = { ...tier, badge: e.target.value };
                update({ CULTURAL_PORTAL_DONORS: { ...donorsSection, tiers } });
              }}
            />
            <TextareaField
              label="Patron names"
              rows={2}
              value={tier.names}
              onChange={(e) => {
                const tiers = [...donorTiers];
                tiers[index] = { ...tier, names: e.target.value };
                update({ CULTURAL_PORTAL_DONORS: { ...donorsSection, tiers } });
              }}
              className="mt-2"
            />
          </div>
        ))}
      </PageContentSection>

      <PageContentSection title="Newsletter">
        <TextField
          label="Title"
          value={readString(newsletter.title)}
          onChange={(e) => update({ CULTURAL_PORTAL_NEWSLETTER: { ...newsletter, title: e.target.value } })}
        />
        <TextareaField
          label="Description"
          rows={2}
          value={readString(newsletter.description)}
          onChange={(e) =>
            update({ CULTURAL_PORTAL_NEWSLETTER: { ...newsletter, description: e.target.value } })
          }
        />
      </PageContentSection>

      <PageContentSection title="Partnership strip">
        <SectionTextFields
          title=""
          values={{
            eyebrow: readString(partnershipSection.eyebrow),
            title: readString(partnershipSection.title),
            description: readString(partnershipSection.description),
          }}
          fields={['eyebrow', 'title', 'description']}
          onChange={(values) => update({ HOME_PARTNERSHIP_SECTION: { ...partnershipSection, ...values } })}
        />
        <p className="text-xs text-ink-muted">
          Partner logos and cards are edited on the Partnership page content screen.
        </p>
      </PageContentSection>
    </PageContentFormShell>
  );
}
