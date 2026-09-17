import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicAboutContent, type PublicAboutContentDTO } from '@/lib/dto';
import { normalizeAboutPillars, type AboutPillar } from '@/lib/types/about-content';
import { DEFAULT_SITE_LOCALE, getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { localizedOrEnglishDefault } from '@/lib/i18n/home-fallbacks';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { chromeLabel } from '@/lib/i18n/ui-chrome';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';

const FALLBACK_PILLARS: AboutPillar[] = [
  {
    title: 'Permanent digitization',
    description:
      'Every monument we visit becomes a redundant, open digital twin — secured against erosion, conflict and time.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Curated scholarship',
    description:
      'Each entry is researched and cross-checked with Armenian academic institutions, then published with full citations.',
    iconName: 'BookOpen',
  },
  {
    title: 'Open access for everyone',
    description:
      'The archive is free for scholars, teachers, students and the diaspora — released under Creative Commons whenever possible.',
    iconName: 'Globe2',
  },
];

export const FALLBACK_ABOUT_CONTENT: PublicAboutContentDTO = {
  heroEyebrow: 'About the Foundation',
  heroTitle: "Stewards of Armenia's living memory.",
  heroDescription:
    'A non-profit dedicated to the permanent, open digital preservation of Armenian cultural heritage.',
  heroImage: resolvePageHeroImageUrl(),
  missionEyebrow: 'Mission',
  missionTitle: 'A permanent, open digital memory of Armenia.',
  missionIntro:
    'We work alongside the Ministry of Education, Science, Culture and Sports of Armenia, the Mother See of Holy Etchmiadzin, the Matenadaran, regional museums and a community of diaspora partners to preserve the country\u2019s cultural memory at archival quality.',
  pillars: FALLBACK_PILLARS,
  whyNowHeading: 'Why now',
  whyNowBody:
    'Armenia preserves more than 24,000 monuments above ground and an order of magnitude more beneath. Each year, weathering, neglect and conflict claim irreplaceable detail. A high-resolution digital twin — accessible, redundant, free — is the only way to ensure that the work of medieval masons, scribes and weavers reaches the next thousand years.',
  howWeWorkHeading: 'How we work',
  howWeWorkBody:
    'Fieldwork is led by certified Matterport operators and drone pilots, supported by architectural historians. Captured data is processed, annotated and reviewed by our curators before being added to the public archive.',
  teamEyebrow: 'Team',
  teamTitle: 'A small, deeply specialised team.',
  teamIntro:
    'Historians, technologists and curators working full-time on the open digital archive of Armenian heritage.',
  careerEyebrow: 'Career',
  careerTitle: 'Build the archive of a civilisation.',
  careerIntro:
    'We are hiring engineers, drone pilots and cultural researchers across Yerevan, the regions and remote. Send us your work — we read every application.',
  missionShortcutImage: null,
  teamShortcutImage: null,
  careerShortcutImage: null,
  contactShortcutImage: null,
};

function localizedAboutFallback(locale: SiteLocaleCode): PublicAboutContentDTO {
  if (locale === 'EN') return FALLBACK_ABOUT_CONTENT;
  return {
    ...FALLBACK_ABOUT_CONTENT,
    heroEyebrow: uiMessage(locale, 'aboutHeroEyebrow'),
    heroTitle: uiMessage(locale, 'aboutHeroTitle'),
    heroDescription: uiMessage(locale, 'aboutHeroDescription'),
    missionEyebrow: uiMessage(locale, 'aboutMissionEyebrow'),
    missionTitle: uiMessage(locale, 'aboutMissionTitle'),
    missionIntro: uiMessage(locale, 'aboutMissionIntro'),
    pillars: [
      {
        title: uiMessage(locale, 'pillarDigitizationTitle'),
        description: uiMessage(locale, 'pillarDigitizationDescription'),
        iconName: 'ShieldCheck',
      },
      {
        title: uiMessage(locale, 'pillarScholarshipTitle'),
        description: uiMessage(locale, 'pillarScholarshipDescription'),
        iconName: 'BookOpen',
      },
      {
        title: uiMessage(locale, 'pillarOpenAccessTitle'),
        description: uiMessage(locale, 'pillarOpenAccessDescription'),
        iconName: 'Globe2',
      },
    ],
    whyNowHeading: uiMessage(locale, 'aboutWhyNowHeading'),
    whyNowBody: uiMessage(locale, 'aboutWhyNowBody'),
    howWeWorkHeading: uiMessage(locale, 'aboutHowWeWorkHeading'),
    howWeWorkBody: uiMessage(locale, 'aboutHowWeWorkBody'),
    teamEyebrow: chromeLabel(locale, 'team'),
    teamTitle: uiMessage(locale, 'aboutTeamTitle'),
    teamIntro: uiMessage(locale, 'aboutTeamIntro'),
    careerEyebrow: chromeLabel(locale, 'career'),
    careerTitle: uiMessage(locale, 'aboutCareerTitle'),
    careerIntro: uiMessage(locale, 'aboutCareerIntro'),
  };
}

function applyAboutFallback(
  content: PublicAboutContentDTO,
  locale: SiteLocaleCode,
): PublicAboutContentDTO {
  const fallback = localizedAboutFallback(locale);
  const english = FALLBACK_ABOUT_CONTENT;
  const field = (
    value: string,
    englishValue: string,
    localizedValue: string,
  ): string => localizedOrEnglishDefault(value, englishValue, localizedValue, locale);

  const storedPillars = normalizeAboutPillars(content.pillars);
  const pillars =
    locale === 'EN'
      ? storedPillars.length > 0
        ? storedPillars
        : FALLBACK_PILLARS
      : fallback.pillars.map((pillar, index) => ({
          ...pillar,
          iconName: storedPillars[index]?.iconName ?? pillar.iconName,
        }));

  return {
    ...fallback,
    ...content,
    heroEyebrow: field(content.heroEyebrow, english.heroEyebrow, fallback.heroEyebrow),
    heroTitle: field(content.heroTitle, english.heroTitle, fallback.heroTitle),
    heroDescription: field(content.heroDescription, english.heroDescription, fallback.heroDescription),
    missionEyebrow: field(content.missionEyebrow, english.missionEyebrow, fallback.missionEyebrow),
    missionTitle: field(content.missionTitle, english.missionTitle, fallback.missionTitle),
    missionIntro: field(content.missionIntro, english.missionIntro, fallback.missionIntro),
    whyNowHeading: field(content.whyNowHeading, english.whyNowHeading, fallback.whyNowHeading),
    whyNowBody: field(content.whyNowBody, english.whyNowBody, fallback.whyNowBody),
    howWeWorkHeading: field(content.howWeWorkHeading, english.howWeWorkHeading, fallback.howWeWorkHeading),
    howWeWorkBody: field(content.howWeWorkBody, english.howWeWorkBody, fallback.howWeWorkBody),
    teamEyebrow: field(content.teamEyebrow, english.teamEyebrow, fallback.teamEyebrow),
    teamTitle: field(content.teamTitle, english.teamTitle, fallback.teamTitle),
    teamIntro: field(content.teamIntro, english.teamIntro, fallback.teamIntro),
    careerEyebrow: field(content.careerEyebrow, english.careerEyebrow, fallback.careerEyebrow),
    careerTitle: field(content.careerTitle, english.careerTitle, fallback.careerTitle),
    careerIntro: field(content.careerIntro, english.careerIntro, fallback.careerIntro),
    pillars,
    heroImage: resolvePageHeroImageUrl(content.heroImage),
  };
}

async function fetchAboutContent(): Promise<PublicAboutContentDTO> {
  try {
    const locale = await getCurrentSiteLocale().catch(() => DEFAULT_SITE_LOCALE);
    return getAboutContentCachedByLocale(locale);
  } catch {
    const locale = await getCurrentSiteLocale().catch(() => DEFAULT_SITE_LOCALE);
    return localizedAboutFallback(locale);
  }
}

const getAboutContentCachedByLocale = unstable_cache(
  async (locale: SiteLocaleCode): Promise<PublicAboutContentDTO> => {
    const row = await prisma.aboutContent.findFirst();
    if (!row) return localizedAboutFallback(locale);
    return applyAboutFallback(toPublicAboutContent(row, locale), locale);
  },
  ['about-content'],
  {
    tags: ['about-content'],
    revalidate: 60,
  },
);

export async function getAboutContent(): Promise<PublicAboutContentDTO> {
  return fetchAboutContent();
}
