import { describe, expect, it } from 'vitest';
import {
  chromeLabel,
  headerChromeLabel,
  headerPrimaryLinkLabel,
  primaryLinkLabel,
  translatedAboutMenu,
} from '@/lib/i18n/ui-chrome';

describe('ui chrome translations', () => {
  it('keeps English nav labels as the default', () => {
    expect(primaryLinkLabel('/highlights', 'EN')).toBe('Highlights');
    expect(chromeLabel('EN', 'culturalPortal')).toBe('Cultural Portal');
  });

  it('translates chrome when the locale is not English', () => {
    expect(primaryLinkLabel('/highlights', 'HY')).toBe('Ընտրյալներ');
    expect(chromeLabel('RU', 'donate')).toBe('Пожертвовать');
    expect(translatedAboutMenu('FR').some((item) => item.label === 'Mission')).toBe(true);
  });

  it('uses shorter Armenian labels in the desktop header', () => {
    expect(headerChromeLabel('HY', 'culturalPortal')).toBe('Պորտալ');
    expect(headerPrimaryLinkLabel('/map', 'HY')).toBe('Քարտեզ');
    expect(headerPrimaryLinkLabel('/highlights', 'HY')).toBe('Ընտրյալ');
    expect(headerChromeLabel('HY', 'aboutUs')).toBe('Մեր մասին');
    expect(headerChromeLabel('EN', 'culturalPortal')).toBe('Cultural Portal');
  });
});
