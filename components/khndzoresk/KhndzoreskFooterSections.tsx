import Image from 'next/image';
import Link from 'next/link';
import { khndzoreskImg, type KhndzoreskPageContent } from '@/lib/queries/page-content';
import { hasNonEmptyArray, hasTrimmedText } from '@/lib/landing/landing-section-utils';

type KhndzoreskMapProps = {
  map: KhndzoreskPageContent['map'];
};

export function KhndzoreskMap({ map }: KhndzoreskMapProps) {
  if (!hasTrimmedText(map.embed)) {
    return null;
  }

  return (
    <section id="map">
      <p className="sec-label">Location &amp; Geography</p>
      <h2 className="sec-title">Find Khndzoresk</h2>
      <p className="sec-desc">{map.description}</p>
      <div className="map-wrap reveal">
        <iframe
          className="map-embed"
          src={map.embed}
          allowFullScreen
          loading="lazy"
          title="Khndzoresk Location"
        />
        <div className="map-info">
          <span className="map-coord">
            Coordinates: <span>{map.coords}</span>
          </span>
          <span className="map-coord">
            Province: <span>{map.province}</span>
          </span>
          <span className="map-coord">
            Elevation: <span>{map.elevation}</span>
          </span>
          <span className="map-coord">
            Area: <span>{map.area}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

type KhndzoreskCreditsProps = {
  imgBase: string;
};

export function KhndzoreskCredits({ imgBase }: KhndzoreskCreditsProps) {
  if (!hasTrimmedText(imgBase)) {
    return null;
  }

  return (
    <section style={{ paddingBottom: 'var(--section-padding-y)' }}>
      <p className="sec-label">Digitization Credits</p>
      <h2 className="sec-title">Those Who Made This Possible</h2>
      <div className="credits-wrap reveal">
        <div className="credits-logo">
          <Image
            src={khndzoreskImg(imgBase, 'new-logos-AT-SAM.png')}
            alt="Armenian Treasures & Safe Armenian Monuments"
            width={280}
            height={56}
          />
        </div>
        <div className="credits-body">
          <div className="credits-title">Khndzoresk Digital Preservation Project</div>
          <div className="credits-team">
            Created by <strong>Armenian Treasures</strong>
            <br />
            Scanning &amp; drone shooting by <strong>Spartak Garnikyan</strong> and{' '}
            <strong>Arshaluys Mkrtchyan</strong>
            <br />
            Visual Concepts by <strong>Andranik Asatryan</strong>
            <br />
            Project Funding by <strong>Safe Armenian Monuments Foundation</strong> and{' '}
            <strong>Armenian Treasures Team</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

type KhndzoreskRelatedProps = {
  related: KhndzoreskPageContent['related'];
};

export function KhndzoreskRelated({ related }: KhndzoreskRelatedProps) {
  if (!hasNonEmptyArray(related)) {
    return null;
  }

  return (
    <section style={{ paddingTop: 'var(--section-padding-y-lg)', paddingBottom: 'var(--section-padding-y-lg)' }}>
      <p className="sec-label">Explore Further</p>
      <h2 className="sec-title">More Digitized Heritage Sites</h2>
      <div className="related-grid">
        {related.map((site) => (
          <Link key={site.num} href={site.href} className="rel-card reveal">
            <div className="rel-num">{site.num}</div>
            <div>
              <div className="rel-name">{site.name}</div>
              <div className="rel-type">{site.type}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
