'use client';

import { useActionState } from 'react';
import { PARTNERSHIP_SECTORS } from '@/lib/constants/partnership-page';
import {
  submitPartnershipInquiry,
  type PartnershipInquiryActionState,
} from '@/app/(public)/partnership/actions';

const INITIAL_STATE: PartnershipInquiryActionState = { status: 'idle' };

export function PartnershipInquiryForm() {
  const [state, formAction, pending] = useActionState(submitPartnershipInquiry, INITIAL_STATE);

  return (
    <section id="partner-form" className="reveal">
      <div className="sec-label">Join the Alliance</div>
      <div className="sec-title">Diplomatic Inquiry</div>
      <p className="sec-desc">
        If your institution is committed to the preservation and global dissemination of cultural heritage, we invite a
        formal dialogue.
      </p>
      <div className="cta-form-outer">
        <div className="cta-glow" aria-hidden />
        <div className="cta-form-content">
          <div style={{ marginBottom: 38 }}>
            <div className="sec-label">Confidential &amp; Secure</div>
            <div className="form-intro-title">Submit Your Institution&apos;s Credentials</div>
            <p className="form-intro-desc">
              All enquiries are reviewed by our Institutional Partnerships team within 5 business days. We welcome
              organisations of all scales, sectors, and geographies.
            </p>
          </div>
          {state.status === 'success' ? (
            <div className="form-success">{state.message}</div>
          ) : (
            <form action={formAction} noValidate>
              <input type="hidden" name="website" value="" tabIndex={-1} autoComplete="off" />
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="inst-name">
                    Institution Name
                  </label>
                  <input
                    className="form-input"
                    id="inst-name"
                    name="inst-name"
                    type="text"
                    placeholder="Official institution name"
                    autoComplete="organization"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="sector">
                    Sector Classification
                  </label>
                  <select className="form-select" id="sector" name="sector" defaultValue="" required>
                    <option value="" disabled>
                      Select your sector
                    </option>
                    {PARTNERSHIP_SECTORS.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="rep-name">
                    Authorised Representative
                  </label>
                  <input
                    className="form-input"
                    id="rep-name"
                    name="rep-name"
                    type="text"
                    placeholder="Full name and title"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="official-email">
                    Official Email Address
                  </label>
                  <input
                    className="form-input"
                    id="official-email"
                    name="official-email"
                    type="email"
                    placeholder="official@institution.org"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="form-group full">
                  <label className="form-label" htmlFor="objective">
                    Strategic Objective
                  </label>
                  <textarea
                    className="form-textarea"
                    id="objective"
                    name="objective"
                    placeholder="Describe your institution's cultural mandate and the nature of partnership you are seeking…"
                    required
                  />
                </div>
              </div>
              {state.status === 'error' && state.message ? (
                <p className="form-note" role="alert">
                  {state.message}
                </p>
              ) : null}
              <div className="form-actions">
                <button type="submit" className="btn-gold" disabled={pending}>
                  {pending ? 'Submitting…' : 'Submit Credentials'}
                </button>
                <p className="form-note">
                  Your submission is handled under strict institutional confidentiality. We do not share enquiry data
                  with third parties under any circumstances.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
