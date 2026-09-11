/** Build in-page embed URLs for YouTube, Matterport, and Sketchfab. */

const SKETCHFAB_MODEL_ID = /(?:^|-)([a-f0-9]{32})$/i;

export function isMatterportUrl(url?: string | null): boolean {
  if (!url || url.trim().length === 0) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.hostname.includes('my.matterport.com') && parsed.pathname.includes('/show');
  } catch {
    return false;
  }
}

export function isSketchfabShortUrl(url?: string | null): boolean {
  if (!url || url.trim().length === 0) return false;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, '');
    if (host === 'skfb.ly') return true;
    if (host === 'sketchfab.com') {
      const parts = parsed.pathname.split('/').filter(Boolean);
      return parts[0] === 's' && Boolean(parts[1]);
    }
    return false;
  } catch {
    return false;
  }
}

export function youtubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, '');
    let videoId = '';
    if (host === 'youtu.be') {
      videoId = parsed.pathname.split('/').filter(Boolean)[0] ?? '';
    } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/')[2] ?? '';
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/')[2] ?? '';
      } else {
        videoId = parsed.searchParams.get('v') ?? '';
      }
    }
    if (!videoId || !/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) return null;
    return videoId;
  } catch {
    return null;
  }
}

export function toYouTubeEmbedSrc(url: string): string | null {
  const videoId = youtubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export function toYouTubeThumbnailSrc(url: string): string | null {
  const videoId = youtubeVideoId(url);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
}

function sketchfabEmbedFromModelId(modelId: string): string | null {
  const id = modelId.trim();
  if (!/^[a-f0-9]{32}$/i.test(id)) return null;
  return `https://sketchfab.com/models/${id}/embed`;
}

export function toSketchfabEmbedSrc(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, '');
    if (host !== 'sketchfab.com') return null;

    const parts = parsed.pathname.split('/').filter(Boolean);

    // /models/{id}/embed or /models/{id}
    const modelsIdx = parts.indexOf('models');
    if (modelsIdx >= 0 && parts[modelsIdx + 1]) {
      const embed = sketchfabEmbedFromModelId(parts[modelsIdx + 1]!);
      if (embed) return embed;
    }

    // /3d-models/{slug}-{32hex}
    const threeDIdx = parts.indexOf('3d-models');
    if (threeDIdx >= 0 && parts[threeDIdx + 1]) {
      const slug = parts[threeDIdx + 1]!;
      const match = slug.match(SKETCHFAB_MODEL_ID);
      if (match?.[1]) {
        const embed = sketchfabEmbedFromModelId(match[1]);
        if (embed) return embed;
      }
    }

    const embedIdx = parts.indexOf('embed');
    if (embedIdx > 0 && parts[embedIdx - 1]) {
      return sketchfabEmbedFromModelId(parts[embedIdx - 1]!);
    }

    return null;
  } catch {
    return null;
  }
}

export function toTourEmbedSrc(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (isMatterportUrl(trimmed)) return trimmed;
  return toSketchfabEmbedSrc(trimmed);
}

/**
 * Follow redirects for Sketchfab short links (skfb.ly / sketchfab.com/s/…)
 * and return a playable embed URL. Safe to call on the server only.
 */
export async function resolveTourEmbedSrc(url: string): Promise<string | null> {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const direct = toTourEmbedSrc(trimmed);
  if (direct) return direct;
  if (!isSketchfabShortUrl(trimmed)) return null;

  try {
    const response = await fetch(trimmed, {
      method: 'GET',
      redirect: 'follow',
      headers: { Accept: 'text/html' },
      next: { revalidate: 86400 },
    });
    return toSketchfabEmbedSrc(response.url) ?? toTourEmbedSrc(response.url);
  } catch {
    return null;
  }
}
