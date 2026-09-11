import { describe, expect, it } from 'vitest';
import { toSketchfabEmbedSrc, toTourEmbedSrc, toYouTubeEmbedSrc } from '@/lib/embed-urls';

describe('embed-urls', () => {
  it('builds YouTube embed from watch URL', () => {
    expect(toYouTubeEmbedSrc('https://www.youtube.com/watch?v=NAExQa6twus')).toBe(
      'https://www.youtube.com/embed/NAExQa6twus',
    );
  });

  it('embeds Matterport show URLs', () => {
    const url = 'https://my.matterport.com/show/?m=wKrfv5qLjTi';
    expect(toTourEmbedSrc(url)).toBe(url);
  });

  it('builds Sketchfab model embeds', () => {
    expect(toSketchfabEmbedSrc('https://sketchfab.com/models/abc123abc123abc123abc123abc123ab/embed')).toBe(
      'https://sketchfab.com/models/abc123abc123abc123abc123abc123ab/embed',
    );
    expect(
      toSketchfabEmbedSrc(
        'https://sketchfab.com/3d-models/st-hripsime-church-khndzoresk-old-ef898f47ad45493aa3baf47d206b5762',
      ),
    ).toBe('https://sketchfab.com/models/ef898f47ad45493aa3baf47d206b5762/embed');
  });

  it('does not embed unresolved Sketchfab short links synchronously', () => {
    expect(toTourEmbedSrc('https://skfb.ly/oSq9S')).toBeNull();
  });
});
