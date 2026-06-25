import Link from 'next/link';
import { khachaturianImg } from '@/lib/queries/page-content';

type KhachaturianMuseumHeroProps = {
  imgBase: string;
};

function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function KhachaturianBreadcrumb() {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Armenian Treasures</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">Cultural Portal</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">Museums</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>Aram Khachaturian House-Museum</span>
    </div>
  );
}

export function KhachaturianMuseumHero({ imgBase }: KhachaturianMuseumHeroProps) {
  return (
    <div className="hero">
      <KhachaturianBreadcrumb />
      <div
        className="hero-img-overlay"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(9,9,9,.88) 0%,rgba(9,9,9,.38) 40%,rgba(9,9,9,.82) 100%),url('${khachaturianImg(imgBase, 'khachaturyan1-thegem-blog-timeline-large.jpg')}')`,
        }}
      />
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-bloom" style={{ width: 700, height: 700, top: -100, left: '50%', transform: 'translateX(-50%)', ['--bd' as string]: '8s' }} />
      <div className="hero-bloom" style={{ width: 380, height: 380, bottom: 0, left: '5%', ['--bd' as string]: '6s', ['--bdelay' as string]: '2s' }} />
      <div className="hero-bloom" style={{ width: 320, height: 320, top: '20%', right: '4%', ['--bd' as string]: '9s', ['--bdelay' as string]: '1s' }} />
      <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
      </svg>
      <div className="hero-content">
        <p className="hero-eyebrow">✦ Digital Preservation · Music Heritage · Yerevan ✦</p>
        <div className="hero-location">
          <LocationIcon />
          3 Zarobyan Street · Yerevan 0009 · Armenia
        </div>
        <h1>
          Aram Khachaturian
          <span>House-Museum · Տուն-Թանգարան</span>
        </h1>
        <p className="hero-slogan">The soul of Armenia, scored in music</p>
        <p className="hero-sub">
          The former private residence of Armenia&apos;s greatest composer — now a living museum preserving his
          legacy, instruments, manuscripts, and the rooms where he created.
        </p>
        <div className="hero-btns">
          <a href="#virtual-tour" className="btn-gold">Enter Virtual Tour</a>
          <a href="#biography" className="btn-teal">Read Biography</a>
          <a href="#audio" className="btn-outline">Listen to His Music</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </div>
  );
}
