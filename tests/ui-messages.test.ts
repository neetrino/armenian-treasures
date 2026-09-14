import { describe, expect, it } from 'vitest';
import { uiMessage, uiMessageFormat } from '@/lib/i18n/ui-messages';

describe('ui messages', () => {
  it('returns English by default key lookup', () => {
    expect(uiMessage('EN', 'signIn')).toBe('Sign in');
    expect(uiMessage('EN', 'sendMessage')).toBe('Send message');
  });

  it('translates common chrome across locales', () => {
    expect(uiMessage('HY', 'signIn')).toBe('Մուտք');
    expect(uiMessage('RU', 'more')).toBe('Ещё');
    expect(uiMessage('FR', 'heritageMap')).toBe('Carte du patrimoine');
    expect(uiMessage('PT', 'viewDetails')).toBe('Ver detalhes');
    expect(uiMessage('HY', 'menuArchitecture')).toBe('Ճարտարապետություն');
    expect(uiMessage('RU', 'allRegions')).toBe('Все регионы');
    expect(uiMessage('FR', 'newsTitle')).toBe('Récits de la communauté du patrimoine');
    expect(uiMessage('PT', 'applyFilters')).toBe('Aplicar filtros');
    expect(uiMessage('HY', 'portalCatDescChurches')).toContain('Հաղպատ');
    expect(uiMessage('RU', 'lostInArchive')).toContain('архиве');
  });

  it('mirrors HY for HYW', () => {
    expect(uiMessage('HYW', 'supportMission')).toBe(uiMessage('HY', 'supportMission'));
  });

  it('formats placeholders', () => {
    expect(uiMessageFormat('EN', 'visibleCount', { n: 12 })).toBe('12 visible');
    expect(uiMessageFormat('HY', 'confirmMonthly', { amount: '5,000' })).toContain('5,000');
  });
});
