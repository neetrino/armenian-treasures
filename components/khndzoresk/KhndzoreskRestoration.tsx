'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import type { KhndzoreskPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray } from '@/lib/landing/landing-section-utils';

function RestorationCard({
  before,
  after,
  caption,
}: {
  before: string;
  after: string;
  caption: string;
}) {
  const compareRef = useRef<HTMLDivElement>(null);

  const handleRange = useCallback((value: number) => {
    compareRef.current?.style.setProperty('--split', `${value}%`);
  }, []);

  return (
    <div className="rest-card reveal">
      <div className="rest-compare" ref={compareRef} style={{ ['--split' as string]: '50%' }}>
        <Image className="rest-img rest-before" src={before} alt="Historical" fill sizes="(max-width: 900px) 100vw, 50vw" />
        <Image className="rest-img rest-after" src={after} alt="Restored" fill sizes="(max-width: 900px) 100vw, 50vw" />
        <input
          type="range"
          className="rest-range"
          min={5}
          max={95}
          defaultValue={50}
          aria-label={`Compare historical and restored views: ${caption}`}
          onChange={(e) => handleRange(Number(e.target.value))}
        />
        <div className="rest-handle" aria-hidden />
      </div>
      <div className="rest-labels">
        <span className="rest-lbl">Historical</span>
        <span className="rest-lbl">Restored</span>
      </div>
      <div className="rest-caption">{caption}</div>
    </div>
  );
}

type KhndzoreskRestorationProps = {
  restorations: KhndzoreskPageContent['restorations'];
};

export function KhndzoreskRestoration({ restorations }: KhndzoreskRestorationProps) {
  if (!hasNonEmptyArray(restorations)) {
    return null;
  }

  return (
    <section id="restoration">
      <p className="sec-label">Visual Restoration</p>
      <h2 className="sec-title">Before &amp; After — Bringing the Past to Light</h2>
      <p className="sec-desc">
        AI-assisted visual restoration reveals how Khndzoresk&apos;s monuments looked in their original glory.
        Drag the slider to compare.
      </p>
      <div className="restoration-grid">
        {restorations.map((item) => (
          <RestorationCard key={item.caption} {...item} />
        ))}
      </div>
    </section>
  );
}
