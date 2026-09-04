import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { pickLocale } from '@/lib/i18n/message-row';
import { CATALOG_MESSAGES, type CatalogMessageKey } from '@/lib/i18n/messages/catalog';
import {
  DONATION_MESSAGES,
  PARTNERSHIP_MESSAGES,
  type DonationMessageKey,
  type PartnershipMessageKey,
} from '@/lib/i18n/messages/donation-partnership';
import { FORM_MESSAGES, type FormMessageKey } from '@/lib/i18n/messages/forms';
import { MAP_MESSAGES, type MapMessageKey } from '@/lib/i18n/messages/map';
import { NAV_MESSAGES, type NavMessageKey } from '@/lib/i18n/messages/nav';
import { PAGE_MESSAGES, type PageMessageKey } from '@/lib/i18n/messages/pages';
import { MICROSITE_MESSAGES, type MicrositeMessageKey } from '@/lib/i18n/messages/microsites';

export const UI_MESSAGES = {
  ...NAV_MESSAGES,
  ...FORM_MESSAGES,
  ...MAP_MESSAGES,
  ...CATALOG_MESSAGES,
  ...PAGE_MESSAGES,
  ...DONATION_MESSAGES,
  ...PARTNERSHIP_MESSAGES,
  ...MICROSITE_MESSAGES,
} as const;

export type UiMessageKey =
  | NavMessageKey
  | FormMessageKey
  | MapMessageKey
  | CatalogMessageKey
  | PageMessageKey
  | DonationMessageKey
  | PartnershipMessageKey
  | MicrositeMessageKey;

export function uiMessage(locale: SiteLocaleCode, key: UiMessageKey): string {
  return pickLocale(UI_MESSAGES[key], locale);
}

/** Replace `{name}` placeholders in a translated template. */
export function uiMessageFormat(
  locale: SiteLocaleCode,
  key: UiMessageKey,
  vars: Record<string, string | number>,
): string {
  let text = uiMessage(locale, key);
  for (const [name, value] of Object.entries(vars)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}
