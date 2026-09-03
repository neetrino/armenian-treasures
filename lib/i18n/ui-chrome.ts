import { ABOUT_MENU, PRIMARY_LINKS } from '@/components/navigation/primary-links';
import { isArmenianLocale, type SiteLocaleCode } from '@/lib/i18n/locale-config';

type ChromeRow = Record<SiteLocaleCode, string>;

function row(hy: string, en: string, ru: string, fr: string, pt: string): ChromeRow {
  return { HY: hy, HYW: hy, EN: en, RU: ru, FR: fr, PT: pt };
}

const NAV = {
  culturalPortal: row('Մշակութային պորտալ', 'Cultural Portal', 'Культурный портал', 'Portail culturel', 'Portal cultural'),
  upcomingProjects: row('Առաջիկա ծրագրեր', 'Upcoming Projects', 'Предстоящие проекты', 'Projets à venir', 'Projetos futuros'),
  heritageMap: row('Ժառանգության քարտեզ', 'Heritage Map', 'Карта наследия', 'Carte du patrimoine', 'Mapa do património'),
  partnership: row('Գործընկերություն', 'Partnership', 'Партнёрство', 'Partenariat', 'Parceria'),
  donate: row('Նվիրաբերել', 'Donate', 'Пожертвовать', 'Faire un don', 'Doar'),
  blog: row('Բլոգ', 'Blog', 'Блог', 'Blog', 'Blog'),
  highlights: row('Ընտրյալներ', 'Highlights', 'Избранное', 'À la une', 'Destaques'),
  aboutUs: row('Մեր մասին', 'About Us', 'О нас', 'À propos', 'Sobre nós'),
  mission: row('Առաքելություն', 'Mission', 'Миссия', 'Mission', 'Missão'),
  team: row('Թիմ', 'Team', 'Команда', 'Équipe', 'Equipa'),
  career: row('Կարիերա', 'Career', 'Карьера', 'Carrières', 'Carreira'),
  contactUs: row('Կապ', 'Contact Us', 'Контакты', 'Contact', 'Contacto'),
  contact: row('Կապ', 'Contact', 'Контакты', 'Contact', 'Contacto'),
  about: row('Մեր մասին', 'About', 'О нас', 'À propos', 'Sobre'),
} as const;

export type UiChromeKey = keyof typeof NAV;

const PRIMARY_BY_HREF: Record<string, UiChromeKey> = {
  '/map': 'heritageMap',
  '/partnership': 'partnership',
  '/donate': 'donate',
  '/blog': 'blog',
  '/highlights': 'highlights',
};

const ABOUT_BY_HREF: Record<string, UiChromeKey> = {
  '/about/mission': 'mission',
  '/about/team': 'team',
  '/about/career': 'career',
  '/contacts': 'contactUs',
};

export function chromeLabel(locale: SiteLocaleCode, key: UiChromeKey): string {
  return NAV[key][locale] || NAV[key].EN;
}

const HEADER_HY: Partial<Record<UiChromeKey, string>> = {
  culturalPortal: 'Պորտալ',
  upcomingProjects: 'Ծրագրեր',
  heritageMap: 'Քարտեզ',
  partnership: 'Գործընկերներ',
  donate: 'Նվիրել',
  highlights: 'Ընտրյալ',
  aboutUs: 'Մեր մասին',
};

export function headerChromeLabel(locale: SiteLocaleCode, key: UiChromeKey): string {
  if (isArmenianLocale(locale)) {
    const shortLabel = HEADER_HY[key];
    if (shortLabel) return shortLabel;
  }
  return chromeLabel(locale, key);
}

export function primaryLinkLabel(href: string, locale: SiteLocaleCode): string {
  const key = PRIMARY_BY_HREF[href];
  const fallback = PRIMARY_LINKS.find((link) => link.href === href)?.label ?? href;
  return key ? chromeLabel(locale, key) : fallback;
}

export function headerPrimaryLinkLabel(href: string, locale: SiteLocaleCode): string {
  const key = PRIMARY_BY_HREF[href];
  const fallback = PRIMARY_LINKS.find((link) => link.href === href)?.label ?? href;
  return key ? headerChromeLabel(locale, key) : fallback;
}

export function aboutMenuLabel(href: string, locale: SiteLocaleCode): string {
  const key = ABOUT_BY_HREF[href];
  const fallback = ABOUT_MENU.find((item) => item.href === href)?.label ?? href;
  return key ? chromeLabel(locale, key) : fallback;
}

export function translatedAboutMenu(locale: SiteLocaleCode) {
  return ABOUT_MENU.map((item) => ({ ...item, label: aboutMenuLabel(item.href, locale) }));
}

export function translatedFooterAboutLinks(locale: SiteLocaleCode): { href: string; label: string }[] {
  return translatedAboutMenu(locale).map((item) => ({ href: item.href, label: item.label }));
}
