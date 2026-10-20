import { describe, expect, it } from 'vitest';
import { toClassicalArmenian } from '@/lib/i18n/western-armenian';

describe('toClassicalArmenian', () => {
  it('reverses the spelling reform without touching other scripts', () => {
    expect(toClassicalArmenian('Երևան')).toBe('Երեւան');
    expect(toClassicalArmenian('Սյունիք')).toBe('Սիւնիք');
    expect(toClassicalArmenian('նյութ')).toBe('նիւթ');
    expect(toClassicalArmenian('կյանք')).toBe('կեանք');
    expect(toClassicalArmenian('արևելյան')).toBe('արեւելեան');
    expect(toClassicalArmenian('պատմություն')).toBe('պատմութիւն');
    expect(toClassicalArmenian('հայության')).toBe('հայութեան');
    expect(toClassicalArmenian('մշակույթ')).toBe('մշակոյթ');
    expect(toClassicalArmenian('նույն')).toBe('նոյն');
    expect(toClassicalArmenian('Հայաստան')).toBe('Հայաստան');
    expect(toClassicalArmenian('Հուշահամալիր')).toBe('Յուշահամալիր');
    expect(toClassicalArmenian('նվիրել')).toBe('նուիրել');
    expect(toClassicalArmenian('Syunik')).toBe('Syunik');
    expect(toClassicalArmenian('Карта')).toBe('Карта');
  });

  it('leaves classical spelling unchanged', () => {
    const classical = 'Երեւան, Սիւնիք, պատմութիւն, արեւելեան';
    expect(toClassicalArmenian(classical)).toBe(classical);
  });
});
