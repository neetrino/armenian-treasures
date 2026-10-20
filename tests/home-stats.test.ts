import { describe, expect, it } from 'vitest';
import { resolvePublicHomeStats } from '@/lib/i18n/home-stats';

const stored = [
  { value: '3,100+', label: 'ՏԱՐՎԱ ՊԱՏՄՈՒԹՅՈՒՆ' },
  { value: '850+', label: 'ՄՇԱԿՈՒԹԱՅԻՆ ԺԱՌԱՆԳՈՒԹՅԱՆ ՀՈՒՇԱՐՁԱՆ' },
  { value: '12,000+', label: 'ՓԱՍՏԱԳՐՎԱԾ ՄՇԱԿՈՒԹԱՅԻՆ ԱՐԺԵՔ' },
  { value: '47', label: 'ԳՈՐԾԸՆԿԵՐ ԿԱԶՄԱԿԵՐՊՈՒԹՅՈՒՆ' },
];

describe('resolvePublicHomeStats', () => {
  it('shows English labels for an English visitor when the saved copy is Armenian', () => {
    expect(resolvePublicHomeStats(stored, 'EN').map((stat) => stat.label)).toEqual([
      'Years of History',
      'Heritage Sites',
      'Artefacts Documented',
      'Partner Institutions',
    ]);
    expect(resolvePublicHomeStats(stored, 'EN').map((stat) => stat.value)).toEqual([
      '3,100+',
      '850+',
      '12,000+',
      '47',
    ]);
  });

  it('keeps the saved Armenian labels for an Armenian visitor', () => {
    expect(resolvePublicHomeStats(stored, 'HY')).toEqual(stored);
  });
});
