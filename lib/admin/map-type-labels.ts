import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

export const MAP_TYPE_VALUES = [
  'MONASTERY',
  'CHURCH',
  'CHAPEL',
  'FORTRESS',
  'SETTLEMENT',
  'MUSEUM',
  'MEMORIAL',
  'KHACHKAR',
  'OTHER',
] as const;

export type CultureMapTypeValue = (typeof MAP_TYPE_VALUES)[number];

const MAP_TYPE_I18N: Record<CultureMapTypeValue, Record<SiteLocaleCode, string>> = {
  MONASTERY: {
    HY: 'Վանք / վանական համալիր',
    HYW: 'Վանք / վանական համալիր',
    EN: 'Monastery / Monastic Complex',
    RU: 'Монастырь / монастырский комплекс',
    FR: 'Monastère / Ensemble monastique',
    PT: 'Mosteiro / Complexo monástico',
  },
  CHURCH: {
    HY: 'Եկեղեցի / տաճար',
    HYW: 'Եկեղեցի / տաճար',
    EN: 'Church / Cathedral',
    RU: 'Церковь / собор',
    FR: 'Église / Cathédrale',
    PT: 'Igreja / Catedral',
  },
  CHAPEL: {
    HY: 'Մատուռ / սրբավայր',
    HYW: 'Մատուռ / սրբավայր',
    EN: 'Chapel / Shrine',
    RU: 'Часовня / святилище',
    FR: 'Chapelle / Sanctuaire',
    PT: 'Capela / Santuário',
  },
  FORTRESS: {
    HY: 'Բերդ / ամրոց',
    HYW: 'Բերդ / ամրոց',
    EN: 'Fortress / Castle',
    RU: 'Крепость / замок',
    FR: 'Forteresse / Château',
    PT: 'Fortaleza / Castelo',
  },
  SETTLEMENT: {
    HY: 'Պատմական բնակավայր',
    HYW: 'Պատմական բնակավայր',
    EN: 'Historical Settlement',
    RU: 'Историческое поселение',
    FR: 'Localité historique',
    PT: 'Povoado histórico',
  },
  MUSEUM: {
    HY: 'Թանգարան',
    HYW: 'Թանգարան',
    EN: 'Museum',
    RU: 'Музей',
    FR: 'Musée',
    PT: 'Museu',
  },
  MEMORIAL: {
    HY: 'Հուշահամալիր',
    HYW: 'Յուշահամալիր',
    EN: 'Memorial Complex',
    RU: 'Мемориальный комплекс',
    FR: 'Complexe mémoriel',
    PT: 'Complexo memorial',
  },
  KHACHKAR: {
    HY: 'Խաչքար',
    HYW: 'Խաչքար',
    EN: 'Khachkar',
    RU: 'Хачкар',
    FR: 'Khatchkar',
    PT: 'Khachkar',
  },
  OTHER: {
    HY: 'Այլ',
    HYW: 'Այլ',
    EN: 'Other',
    RU: 'Другое',
    FR: 'Autre',
    PT: 'Outro',
  },
};

export function labelMapTypeLocalized(
  value: string,
  locale: SiteLocaleCode = 'EN',
): string {
  const row = MAP_TYPE_I18N[value as CultureMapTypeValue];
  if (!row) return value;
  return row[locale] || row.EN;
}

export const CULTURE_MAP_TYPE_OPTIONS = MAP_TYPE_VALUES.map((value) => ({
  value,
  label: MAP_TYPE_I18N[value].EN,
}));
