import Image from 'next/image';
import Link from 'next/link';
import { khndzoreskImg, type KhndzoreskPageContent } from '@/lib/queries/page-content';

export function KhndzoreskMap() {
  return (
    <section id="map">
      <p className="sec-label">Location &amp; Geography</p>
      <h2 className="sec-title">Find Khndzoresk</h2>
      <p className="sec-desc">
        Goris Municipality, Syunik Province — accessible via the Goris–Stepanakert highway at 39°29′12.7″N,
        46°25′19.3″E.
      </p>
      <div className="map-wrap reveal">
        <iframe
          className="map-embed"
          src="https://maps.google.com/maps?q=39%C2%B029%2712.7%22N+46%C2%B025%2719.3%22E&t=m&z=13&output=embed&iwloc=near"
          allowFullScreen
          loading="lazy"
          title="Khndzoresk Location"
        />
        <div className="map-info">
          <span className="map-coord">
            Coordinates: <span>39°29′12.7″N · 46°25′19.3″E</span>
          </span>
          <span className="map-coord">
            Province: <span>Syunik · Goris Municipality</span>
          </span>
          <span className="map-coord">
            Elevation: <span>1,580 m</span>
          </span>
          <span className="map-coord">
            Area: <span>6,772.8 ha</span>
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
