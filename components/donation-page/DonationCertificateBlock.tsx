'use client';

import Image from 'next/image';
import { DONATION_PAGE, type DonationTierId } from '@/lib/constants/donation-page';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

type Certificates = (typeof DONATION_PAGE)['certificates'];

interface DonationCertificateBlockProps {
  certificates: Certificates;
  selectedTierId: DonationTierId | null;
  templateUrls?: {
    guardian: string | null;
    ambassador: string | null;
    magistr: string | null;
  };
}

export function DonationCertificateBlock({
  certificates,
  selectedTierId,
  templateUrls,
}: DonationCertificateBlockProps) {
  return (
    <div className="donation-certificates reveal" id="certificates">
      <p className="sec-label" style={{ marginTop: 48 }}>
        {certificates.label}
      </p>
      <h3 className="sec-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
        {certificates.title}
      </h3>
      <p className="sec-desc">{certificates.description}</p>

      <div className="donation-certificate-slots">
        {certificates.slots.map((slot) => {
          const previewUrl = templateUrls?.[slot.id] ?? null;
          return (
            <div
              key={slot.id}
              className={[
                'donation-certificate-slot',
                selectedTierId ===
                (slot.id === 'guardian' ? '1000' : slot.id === 'ambassador' ? '5000' : '10000')
                  ? 'is-active'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="donation-certificate-slot__preview" aria-hidden>
                {previewUrl ? (
                  <Image
                    src={resolvePublicAssetUrl(previewUrl)}
                    alt=""
                    width={480}
                    height={320}
                    className="donation-certificate-slot__image"
                  />
                ) : (
                  <span>{slot.label}</span>
                )}
              </div>
              <p className="donation-certificate-slot__label">{slot.label}</p>
            </div>
          );
        })}
      </div>

      <form
        className="donation-certificate-form"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Certificate recipient details"
      >
        <label className="donation-certificate-field">
          <span>{certificates.fields.fullName}</span>
          <input type="text" name="fullName" autoComplete="name" required />
        </label>
        <label className="donation-certificate-field">
          <span>{certificates.fields.email}</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="donation-certificate-field donation-certificate-field--full">
          <span>{certificates.fields.note}</span>
          <textarea name="note" rows={3} />
        </label>
      </form>
    </div>
  );
}
