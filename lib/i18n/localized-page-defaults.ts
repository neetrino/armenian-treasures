import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import {
  buildDefaultCulturalPortalPageContent,
  buildDefaultDonationPageContent,
  buildDefaultKhachaturianContent,
  buildDefaultKhndzoreskContent,
  buildDefaultNationalGalleryContent,
  buildDefaultPartnershipPageContent,
  type CulturalPortalPageContent,
  type DonationPageContent,
  type KhachaturianPageContent,
  type KhndzoreskPageContent,
  type NationalGalleryPageContent,
  type PartnershipPageContent,
} from '@/lib/types/page-content';

/* Page-content defaults are deeply readonly `as const` values. Localization
   mutates a structured clone before overlaying it onto stored CMS content. */
/* eslint-disable @typescript-eslint/no-explicit-any */

function cloneDraft<T>(value: T): any {
  return structuredClone(value);
}

function t(locale: SiteLocaleCode, key: Parameters<typeof uiMessage>[1]) {
  return uiMessage(locale, key);
}

export function localizedDonationPageContent(locale: SiteLocaleCode): DonationPageContent {
  const content = cloneDraft(buildDefaultDonationPageContent());
  if (locale === 'EN') return content as DonationPageContent;

  content.metadata.title = t(locale, 'donationMetaTitle');
  content.metadata.description = t(locale, 'donationMetaDescription');
  content.page.breadcrumb = t(locale, 'donateBreadcrumb');
  content.page.hero.eyebrow = t(locale, 'donationHeroEyebrow');
  content.page.hero.title = t(locale, 'becomeA');
  content.page.hero.titleLine2 = t(locale, 'heritageGuardian');
  content.page.hero.accent = t(locale, 'keepHeritageAlive');
  content.page.hero.subtitle = t(locale, 'donationHeroSubtitle');
  content.page.hero.badges[0].label = t(locale, 'activeSince2024');
  content.page.hero.badges[1].label = t(locale, 'monthlyPatronsCount');
  content.page.hero.badges[2].label = t(locale, 'nonprofitTaxDeductible');
  content.page.mission.label = t(locale, 'whyItMatters');
  content.page.mission.title = t(locale, 'whatPatronageActivates');
  content.page.mission.description = t(locale, 'patronageMissionDesc');
  content.page.engine.label = t(locale, 'patronageLevels');
  content.page.engine.title = t(locale, 'chooseContribution');
  content.page.engine.description = t(locale, 'chooseContributionDesc');
  content.page.engine.narrative.paragraphs = [
    t(locale, 'donationNarrative1'),
    t(locale, 'donationNarrative2'),
  ];
  content.page.engine.narrative.closing = t(locale, 'donationNarrativeClosing');
  content.page.certificates.label = t(locale, 'certificatesLabel');
  content.page.certificates.title = t(locale, 'certificateDetails');
  content.page.certificates.description = t(locale, 'certificateDetailsDesc');
  content.page.certificates.slots[0].label = t(locale, 'guardianCertificate');
  content.page.certificates.slots[1].label = t(locale, 'ambassadorCertificate');
  content.page.certificates.slots[2].label = t(locale, 'magistrCertificate');
  content.page.certificates.fields.fullName = t(locale, 'fullName');
  content.page.certificates.fields.email = t(locale, 'email');
  content.page.certificates.fields.note = t(locale, 'dedicationNote');
  content.page.ledger.label = t(locale, 'wherePatronageGoes');
  content.page.ledger.title = t(locale, 'ledgerIsOpen');
  content.page.ledger.description = t(locale, 'ledgerDesc');
  content.page.patronWall.label = t(locale, 'patronWallLabel');
  content.page.patronWall.title = t(locale, 'thoseWhoAlreadySustain');
  content.page.patronWall.description = t(locale, 'patronWallDesc');
  content.page.patronWall.ctaLabel = t(locale, 'joinPatronWall');
  content.page.quote.text = t(locale, 'donationQuote');
  content.page.quote.cite = t(locale, 'donationQuoteCite');

  const statKeys = [
    'artifactsDigitized',
    'heritageSitesMapped',
    'monthlyPatrons',
    'countriesReached',
    'manuscriptsArchived',
  ] as const;
  content.stats = content.stats.map((stat: { label: string }, index: number) => ({
    ...stat,
    label: t(locale, statKeys[index] ?? 'artifactsDigitized'),
  }));

  content.pillars[0].title = t(locale, 'digitalPreservation');
  content.pillars[0].description = t(locale, 'digitalPreservationDesc');
  content.pillars[1].title = t(locale, 'immersiveAccess');
  content.pillars[1].description = t(locale, 'immersiveAccessDesc');
  content.pillars[2].title = t(locale, 'permanentRecord');
  content.pillars[2].description = t(locale, 'permanentRecordDesc');

  content.tiers[0].ctaLabel = t(locale, 'selectGuardian');
  content.tiers[1].ctaLabel = t(locale, 'selectAmbassador');
  content.tiers[2].ctaLabel = t(locale, 'selectMagistr');

  const ledgerKeys = [
    'ledgerDigitization',
    'ledgerInfrastructure',
    'ledgerResearch',
    'ledgerOperations',
  ] as const;
  content.ledger = content.ledger.map((item: { label: string }, index: number) => ({
    ...item,
    label: t(locale, ledgerKeys[index] ?? 'ledgerDigitization'),
  }));

  content.wall[0].badge = t(locale, 'goldPatrons');
  content.wall[0].count = t(locale, 'moreGoldPatrons');
  content.wall[1].badge = t(locale, 'silverPatrons');
  content.wall[1].count = t(locale, 'moreSilverPatrons');
  content.wall[2].badge = t(locale, 'bronzePatrons');
  content.wall[2].names = t(locale, 'communitySupporters');
  content.wall[2].count = t(locale, 'bronzePatronsAnnual');

  const trustKeys = [
    'nonprofitRegistered',
    'secureCheckoutSoon',
    'cancelInOneClick',
    'taxDeductibleReceipt',
    'annualImpactReport',
  ] as const;
  content.trustItems = content.trustItems.map((item: { label: string }, index: number) => ({
    label: t(locale, trustKeys[index] ?? 'nonprofitRegistered'),
  }));

  return content as DonationPageContent;
}

export function localizedPartnershipPageContent(locale: SiteLocaleCode): PartnershipPageContent {
  const content = cloneDraft(buildDefaultPartnershipPageContent());
  if (locale === 'EN') return content as PartnershipPageContent;

  const partnerStatKeys = [
    'partnerInstitutions',
    'countriesReached',
    'artifactsPreserved',
    'globalLearners',
    'inOperation',
  ] as const;
  content.stats = content.stats.map((stat: { num: string; label: string }, index: number) => ({
    ...stat,
    num: index === 4 ? t(locale, 'since2020') : stat.num,
    label: t(locale, partnerStatKeys[index] ?? 'partnerInstitutions'),
  }));

  const categoryKeys = [
    'catGovernment',
    'catReligious',
    'catMuseums',
    'catEducation',
    'catFoundations',
    'catTechnology',
  ] as const;
  content.categories = content.categories.map(
    (category: { partners: Array<{ future?: boolean }> }, index: number) => ({
      ...category,
      label: t(locale, categoryKeys[index] ?? 'catGovernment'),
      partners: category.partners.map((partner) => ({
        ...partner,
        arrow: partner.future ? t(locale, 'expressStrategicInterest') : t(locale, 'viewInstitution'),
      })),
    }),
  );

  return content as PartnershipPageContent;
}

export function localizedCulturalPortalPageContent(locale: SiteLocaleCode): CulturalPortalPageContent {
  const content = cloneDraft(buildDefaultCulturalPortalPageContent());
  if (locale === 'EN') return content as CulturalPortalPageContent;

  content.CULTURAL_PORTAL_SECTION = {
    ...content.CULTURAL_PORTAL_SECTION,
    eyebrow: t(locale, 'culturalPortalEyebrow'),
    title: t(locale, 'exploreArmenianCivilisation'),
    description: t(locale, 'culturalPortalSectionDesc'),
  };
  content.CULTURAL_PORTAL_MAP = {
    ...content.CULTURAL_PORTAL_MAP,
    eyebrow: t(locale, 'interactiveMap'),
    title: t(locale, 'exploreSacredGeography'),
    description: t(locale, 'culturalMapDesc'),
    placeholderTitle: t(locale, 'interactiveMap'),
    placeholderSubtitle: t(locale, 'mapPlaceholderSubtitle'),
    legend: [
      { ...content.CULTURAL_PORTAL_MAP.legend[0], label: t(locale, 'mapReligiousSites') },
      { ...content.CULTURAL_PORTAL_MAP.legend[1], label: t(locale, 'mapHistoricalMonuments') },
      { ...content.CULTURAL_PORTAL_MAP.legend[2], label: t(locale, 'mapMuseumsGalleries') },
      { ...content.CULTURAL_PORTAL_MAP.legend[3], label: t(locale, 'mapNaturalHeritage') },
      { ...content.CULTURAL_PORTAL_MAP.legend[4], label: t(locale, 'mapArchaeologicalSites') },
    ],
  };
  content.CULTURAL_PORTAL_PROJECTS_SECTION = {
    ...content.CULTURAL_PORTAL_PROJECTS_SECTION,
    eyebrow: t(locale, 'upcomingProjectsEyebrow'),
    title: t(locale, 'whatWeAreBuilding'),
    description: t(locale, 'whatWeAreBuildingDesc'),
  };
  content.CULTURAL_PORTAL_DONORS = {
    ...content.CULTURAL_PORTAL_DONORS,
    eyebrow: t(locale, 'donatorsEyebrow'),
    title: t(locale, 'thoseWhoMakeItPossible'),
    description: t(locale, 'donorsDesc'),
    ctaLabel: t(locale, 'supportOurMission'),
    tiers: [
      { ...content.CULTURAL_PORTAL_DONORS.tiers[0], badge: t(locale, 'goldPatrons') },
      { ...content.CULTURAL_PORTAL_DONORS.tiers[1], badge: t(locale, 'silverPatrons') },
      { ...content.CULTURAL_PORTAL_DONORS.tiers[2], badge: t(locale, 'bronzePatrons') },
    ],
  };

  return content as CulturalPortalPageContent;
}

export function localizedKhndzoreskContent(locale: SiteLocaleCode): KhndzoreskPageContent {
  const content = cloneDraft(buildDefaultKhndzoreskContent());
  if (locale === 'EN') return content as KhndzoreskPageContent;

  const khndzStatKeys = [
    'yearsOfHabitation',
    'peakPopulation1900s',
    'elevationAboveSea',
    'digitizedHeritageSites',
    'stHripsimeChurch',
  ] as const;
  content.stats = content.stats.map((stat: { suffix: string }, index: number) => ({
    ...stat,
    suffix: index === 4 ? t(locale, 'thCentury') : stat.suffix,
    label: t(locale, khndzStatKeys[index] ?? 'yearsOfHabitation'),
  }));
  content.facts = content.facts.map((fact: { label: string }) =>
    fact.label === 'Armenian Name' ? { ...fact, label: t(locale, 'armenianName') } : fact,
  );
  content.sites = content.sites.map((site: { id: string }) =>
    site.id === 'hripsime' ? { ...site, title: t(locale, 'stHripsimeChurch') } : site,
  );
  content.tours = {
    ...content.tours,
    featured: { ...content.tours.featured, title: t(locale, 'stHripsimeChurch') },
  };

  return content as KhndzoreskPageContent;
}

export function localizedKhachaturianContent(locale: SiteLocaleCode): KhachaturianPageContent {
  const content = cloneDraft(buildDefaultKhachaturianContent());
  if (locale === 'EN') return content as KhachaturianPageContent;

  const khachaturianStatKeys = [
    'yearOfBirth',
    'museumEstablished',
    'majorBallets',
    'symphonies',
    'musicTracksOnline',
    'govtDecisionMuseum',
  ] as const;
  content.stats = content.stats.map((stat: object, index: number) => ({
    ...stat,
    label: t(locale, khachaturianStatKeys[index] ?? 'yearOfBirth'),
  }));

  return content as KhachaturianPageContent;
}

export function localizedNationalGalleryContent(locale: SiteLocaleCode): NationalGalleryPageContent {
  const content = cloneDraft(buildDefaultNationalGalleryContent());
  if (locale === 'EN') return content as NationalGalleryPageContent;

  const ngaStatKeys = [
    'yearEstablished',
    'worksInCollection',
    'exhibitionHalls',
    'armenianPaintings',
    'regionalBranches',
    'aivazovskyCollectionWorld',
  ] as const;
  content.stats = content.stats.map((stat: object, index: number) => ({
    ...stat,
    label: t(locale, ngaStatKeys[index] ?? 'yearEstablished'),
  }));
  content.facts = content.facts.map((fact: { label: string }) =>
    fact.label === 'Armenian Name' ? { ...fact, label: t(locale, 'armenianName') } : fact,
  );

  return content as NationalGalleryPageContent;
}
