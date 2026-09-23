'use client';

import { useEffect, useState } from 'react';
import { tintPartnerLogoPixels } from '@/lib/images/tint-partner-logo';

const tintedSources = new Map<string, Promise<string>>();

function loadTintedLogo(src: string): Promise<string> {
  const cached = tintedSources.get(src);
  if (cached) return cached;

  const pending = new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        reject(new Error('canvas'));
        return;
      }
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      tintPartnerLogoPixels(pixels.data, canvas.width, canvas.height);
      context.putImageData(pixels, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => reject(new Error('logo'));
    image.src = `/_next/image?url=${encodeURIComponent(src)}&w=384&q=75`;
  });

  tintedSources.set(src, pending);
  return pending;
}

export function TintedPartnerLogo({ src, alt }: { src: string; alt: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadTintedLogo(src)
      .then((value) => {
        if (!cancelled) setUrl(value);
      })
      .catch(() => {
        if (!cancelled) setUrl(src);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!url) return <span className="home-partners-logos__mark" aria-hidden />;

  return (
    // Generated monochrome mark; next/image cannot serve the canvas data URL.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt={alt} className="home-partners-logos__mark" />
  );
}
