'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import '@/components/culture-catalog/culture-item-gallery-lightbox.css';

export interface CultureGalleryLightboxItem {
  id: string;
  url: string;
  caption?: string;
  alt: string;
}

interface CultureItemGalleryLightboxProps {
  items: CultureGalleryLightboxItem[];
  title: string;
}

export function CultureItemGalleryLightbox({ items, title }: CultureItemGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const active = activeIndex === null ? null : items[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current + items.length - 1) % items.length;
    });
  }, [items.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeIndex, close, showNext, showPrev]);

  const lightbox =
    mounted && active
      ? createPortal(
          <div className="catalog-lightbox" role="dialog" aria-modal="true" aria-label={title}>
            <button type="button" className="catalog-lightbox__backdrop" aria-label="Close" onClick={close} />
            <div className="catalog-lightbox__frame">
              <Image
                src={resolvePublicAssetUrl(active.url)}
                alt={active.alt}
                width={1600}
                height={1200}
                className="catalog-lightbox__image"
              />
              {active.caption ? <p className="catalog-lightbox__caption">{active.caption}</p> : null}
              {items.length > 1 ? (
                <div className="catalog-lightbox__nav">
                  <button type="button" onClick={showPrev}>
                    Previous
                  </button>
                  <button type="button" onClick={showNext}>
                    Next
                  </button>
                </div>
              ) : null}
              <button type="button" className="catalog-lightbox__close" onClick={close}>
                Close
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="gallery-grid">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="g-item reveal catalog-gallery-trigger"
            onClick={() => setActiveIndex(index)}
          >
            <Image src={resolvePublicAssetUrl(item.url)} alt={item.alt} width={600} height={450} />
            {item.caption ? (
              <div className="g-overlay">
                <span className="g-lbl">{item.caption}</span>
              </div>
            ) : null}
          </button>
        ))}
      </div>
      {lightbox}
    </>
  );
}
