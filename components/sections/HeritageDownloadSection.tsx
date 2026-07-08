import Link from 'next/link';
import { Download } from 'lucide-react';

/** Set to true when download resources are ready to show on the homepage. */
export const HERITAGE_DOWNLOADS_HOME_VISIBLE = false;

const DOWNLOAD_RESOURCES = [
  {
    title: 'Sample Heritage Primer',
    description: 'A short introduction to Armenian Treasures digital catalogue.',
    href: '/images/placeholder.svg',
    fileLabel: 'PDF',
  },
] as const;

/** Public download block — files managed later via admin/CMS. */
export function HeritageDownloadSection() {
  return (
    <section
      id="downloads"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="downloads-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <p className="font-cinzel text-[10px] font-bold uppercase tracking-[0.22em] text-heritage-gold">
          Resources
        </p>
        <h2
          id="downloads-heading"
          className="mt-3 font-cinzel text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase tracking-[0.06em] text-heritage-champagne"
        >
          Downloads
        </h2>
        <p className="mt-4 max-w-2xl font-display text-base italic text-heritage-text-muted">
          Download selected books and resources. Additional titles will appear here as the archive expands.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOWNLOAD_RESOURCES.map((resource) => (
            <li key={resource.title}>
              <Link
                href={resource.href}
                download
                className="group flex h-full flex-col gap-3 border border-[rgba(214,184,90,0.22)] bg-[rgba(9,9,9,0.72)] p-5 transition hover:border-[rgba(214,184,90,0.5)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(214,184,90,0.35)] text-heritage-gold">
                  <Download size={18} aria-hidden />
                </span>
                <span className="font-cinzel text-sm font-semibold uppercase tracking-[0.12em] text-heritage-champagne">
                  {resource.title}
                </span>
                <span className="font-display text-sm text-heritage-text-muted">
                  {resource.description}
                </span>
                <span className="mt-auto font-cinzel text-[10px] font-bold uppercase tracking-[0.18em] text-heritage-teal">
                  Download {resource.fileLabel} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
