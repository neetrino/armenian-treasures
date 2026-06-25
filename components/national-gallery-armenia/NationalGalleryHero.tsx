import Link from 'next/link';
import { ngaImg } from '@/lib/queries/page-content';

type NationalGalleryHeroProps = {
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

function NationalGalleryBreadcrumb() {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Armenian Treasures</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">Cultural Portal</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <Link href="/culture">Museums</Link>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>National Gallery of Armenia</span>
    </div>
  );
}

export function NationalGalleryHero({ imgBase }: NationalGalleryHeroProps) {
  return (
    <div className="hero">
      <NationalGalleryBreadcrumb />
      <div
        className="hero-img-overlay"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(9,9,9,.9) 0%,rgba(9,9,9,.38) 42%,rgba(9,9,9,.84) 100%),url('${ngaImg(imgBase, 'national-gallery-logo-thegem-blog-timeline-large.jpg')}')`,
        }}
      />
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-bloom" style={{ width: 700, height: 700, top: -120, left: '50%', transform: 'translateX(-50%)', ['--bd' as string]: '8s' }} />
      <div className="hero-bloom" style={{ width: 380, height: 380, bottom: 0, left: '5%', ['--bd' as string]: '6s', ['--bdelay' as string]: '2s' }} />
      <div className="hero-bloom" style={{ width: 300, height: 300, top: '22%', right: '5%', ['--bd' as string]: '9s', ['--bdelay' as string]: '1s' }} />
      <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
      </svg>
      <div className="hero-content">
        <p className="hero-eyebrow">✦ Fine Arts Heritage · Republic Square · Yerevan ✦</p>
        <div className="hero-location">
          <LocationIcon />
          1 Aram Street · Yerevan 0010 · Armenia
        </div>
        <h1>
          National Gallery
          <br />
          of Armenia
          <span>Հայաստանի Ազգային Պատկերասրահ</span>
        </h1>
        <p className="hero-slogan">The world&apos;s largest Armenian fine arts collection</p>
        <p className="hero-sub">
          Established in 1921 and home to over 40,000 works — from Aivazovsky&apos;s seascapes to Saryan&apos;s blazing
          colours, Kandinsky&apos;s abstractions to Chagall&apos;s dreams.
        </p>
        <div className="hero-btns">
          <a href="#virtual-tour" className="btn-gold">
            Enter Virtual Tour
          </a>
          <a href="#collection" className="btn-teal">
            Explore Collection
          </a>
          <a href="#exhibitions" className="btn-outline">
            Current Exhibitions
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
