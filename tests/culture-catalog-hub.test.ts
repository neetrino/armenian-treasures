import { describe, expect, it } from 'vitest';
import { resolveCultureCatalogHubDescription } from '@/lib/mappers/culture-catalog-page';

describe('culture catalog hub description', () => {
  it('prefers the admin category description', () => {
    expect(
      resolveCultureCatalogHubDescription(
        '  Legends curated for the archive.  ',
        'Fallback about copy',
        'Fallback items copy',
      ),
    ).toBe('Legends curated for the archive.');
  });

  it('falls back to about copy when the category field is empty', () => {
    expect(
      resolveCultureCatalogHubDescription('   ', 'Myths, gods, and heroic cycles.', 'Browse sections'),
    ).toBe('Myths, gods, and heroic cycles.');
  });

  it('uses the items section copy as the last fallback', () => {
    expect(resolveCultureCatalogHubDescription(null, '', 'Browse churches and castles.')).toBe(
      'Browse churches and castles.',
    );
  });
});
