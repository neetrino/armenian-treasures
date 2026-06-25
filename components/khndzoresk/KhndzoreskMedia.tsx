import Image from 'next/image';
import type { KhndzoreskPageContent } from '@/lib/queries/page-content';

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

type KhndzoreskVirtualTourProps = {
  tours: KhndzoreskPageContent['tours'];
};

export function KhndzoreskVirtualTour({ tours }: KhndzoreskVirtualTourProps) {
  const { featured, mini } = tours;

  return (
    <section id="virtual-tour">
      <p className="sec-label">Virtual Experience</p>
      <h2 className="sec-title">Walk the Sacred Ground — From Anywhere</h2>
      <p className="sec-desc">
        High-resolution Matterport 3D walkthroughs of Khndzoresk&apos;s most significant spaces — step inside
        the gorge without leaving home.
      </p>
      <div className="tour-grid">
        <div className="tour-main reveal">
          <iframe
            className="tour-embed"
            src={featured.embed}
            allowFullScreen
            allow="xr-spatial-tracking"
            title="St. Hripsime Church Virtual Tour"
          />
          <div className="tour-label">
            <span className="tour-name">{featured.title}</span>
            <span className="tour-tag">{featured.tag}</span>
          </div>
        </div>
        <div className="tour-side">
          {mini.map((tour) => (
            <a
              key={tour.title}
              href={tour.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tour-mini reveal"
            >
              <Image
                className="tour-mini-thumb"
                src={tour.image}
                alt={tour.title}
                width={400}
                height={122}
              />
              <div className="tour-play">
                <PlayIcon />
              </div>
              <div className="tour-mini-info">
                <div className="tour-mini-title">{tour.title}</div>
                <div className="tour-mini-sub">{tour.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function KhndzoreskAerial() {
  return (
    <section id="3d-aerial">
      <p className="sec-label">Aerial 3D Model</p>
      <h2 className="sec-title">St. Hripsime — Seen From Every Angle</h2>
      <p className="sec-desc">
        A fully rotatable photogrammetric 3D model captured by drone and reconstructed to museum standard.
        Rotate, zoom, inspect every stone.
      </p>
      <div className="aerial-embed-wrap reveal">
        <iframe
          className="aerial-embed"
          title="St. Hripsime church, Khndzoresk"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/65ffde4982d7424a8eb3ef7216bc9699/embed?autostart=0&ui_theme=dark&ui_infos=0"
        />
        <div className="aerial-label">
          <span className="aerial-badge">✦ 3D Photogrammetry</span>
          <span className="aerial-title">St. Hripsime Church, Khndzoresk · by Arsho.Mk</span>
          <span className="aerial-badge tc">Drone Capture</span>
        </div>
      </div>
    </section>
  );
}

export function KhndzoreskPanorama() {
  return (
    <section id="panorama">
      <p className="sec-label">Aerial 360° Panorama</p>
      <h2 className="sec-title">The Gorge From Above</h2>
      <p className="sec-desc">
        Highest-resolution aerial 360° tour of Khndzoresk — look in every direction across the canyon, the
        village, and the mountains of Syunik.
      </p>
      <div className="pano-wrap reveal">
        <iframe
          className="pano-frame"
          src="https://khndzoresk.armeniantreasures.com/pano/"
          allowFullScreen
          title="Aerial 360° Panorama — Khndzoresk"
        />
        <div className="pano-footer">
          <span className="pano-title">Khndzoresk Aerial 360° · Syunik Province</span>
          <span className="aerial-badge tc">Highest Resolution</span>
        </div>
      </div>
    </section>
  );
}
