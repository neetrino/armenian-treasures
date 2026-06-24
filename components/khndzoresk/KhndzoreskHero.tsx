import Link from 'next/link';
import { khndzoreskImg } from '@/lib/constants/khndzoresk';

function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function KhndzoreskBreadcrumb() {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Armenian Treasures</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">Cultural Portal</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">Archaeological Sites</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>Khndzoresk</span>
    </div>
  );
}

export function KhndzoreskHero() {
  return (
    <div className="hero">
      <KhndzoreskBreadcrumb />
      <div
        className="hero-img-overlay"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(9,9,9,.85) 0%,rgba(9,9,9,.4) 40%,rgba(9,9,9,.8) 100%),url('${khndzoreskImg('khndzoresk-Sputnik-1.jpg')}')`,
        }}
      />
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div
        className="hero-bloom"
        style={{
          width: 750,
          height: 750,
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          ['--bd' as string]: '8s',
        }}
      />
      <div
        className="hero-bloom"
        style={{ width: 400, height: 400, bottom: 0, left: '6%', ['--bd' as string]: '6s', ['--bdelay' as string]: '2s' }}
      />
      <div
        className="hero-bloom"
        style={{ width: 340, height: 340, top: '18%', right: '4%', ['--bd' as string]: '9s', ['--bdelay' as string]: '1s' }}
      />
      <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
      </svg>
      <div className="hero-content">
        <p className="hero-eyebrow">✦ Digital Preservation · Syunik Province · Armenia ✦</p>
        <div className="hero-location">
          <LocationIcon />
          Goris Municipality · Syunik Province
        </div>
        <h1>
          Khndzoresk
          <span>Խնձորեսկ · Cave Settlement &amp; Sacred Gorge</span>
        </h1>
        <p className="hero-slogan">One of Eastern Armenia&apos;s oldest inhabited landscapes</p>
        <p className="hero-sub">
          A cathedral of stone, sky, and memory carved into the cliffs of Khor Dzor — preserved here in full
          digital dimension.
        </p>
        <div className="hero-btns">
          <a href="#virtual-tour" className="btn-gold">
            Explore Virtual Tours
          </a>
          <a href="#3d-aerial" className="btn-teal">
            View 3D Aerial
          </a>
          <a href="#about" className="btn-outline">
            Read the History
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </div>
  );
}
