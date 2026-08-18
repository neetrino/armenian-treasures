import { describe, expect, it } from 'vitest';
import { mapProjectToCulturalPortalProject } from '@/lib/mappers/cultural-portal-projects';
import type { PublicProjectDTO } from '@/lib/dto';

function project(overrides: Partial<PublicProjectDTO> = {}): PublicProjectDTO {
  return {
    id: '1',
    title: 'Tatev Monastery',
    slug: 'tatev-monastery',
    category: 'Architecture',
    region: 'Syunik',
    description: 'Full 3D capture.',
    image: '/images/projects/tatev.jpg',
    goalAmount: 28000,
    raisedAmount: 12400,
    status: 'ACTIVE',
    order: 1,
    ...overrides,
  };
}

describe('mapProjectToCulturalPortalProject', () => {
  it('uses the project image as the homepage card background', () => {
    const mapped = mapProjectToCulturalPortalProject(project());
    expect(mapped.cardBackgroundImage).toBe('/images/projects/tatev.jpg');
    expect(mapped.href).toBe('/projects');
  });
});
