'use client';

import { useActionState } from 'react';
import { getPartnershipSectorOptions } from '@/lib/constants/partnership-page';
import {
  submitPartnershipInquiry,
  type PartnershipInquiryActionState,
} from '@/app/(public)/partnership/actions';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

const INITIAL_STATE: PartnershipInquiryActionState = { status: 'idle' };

export function PartnershipInquiryForm({ locale }: { locale: SiteLocaleCode }) {
  const [state, formAction, pending] = useActionState(submitPartnershipInquiry, INITIAL_STATE);
  const sectorOptions = getPartnershipSectorOptions(locale);

  return (
    <section id="partner-form" className="reveal">
      <div className="sec-label">{uiMessage(locale, 'joinAlliance')}</div>
      <div className="sec-title">{uiMessage(locale, 'diplomaticInquiry')}</div>
      <p className="sec-desc">{uiMessage(locale, 'inquiryInvitation')}</p>
      <div className="cta-form-outer">
        <div className="cta-glow" aria-hidden />
        <div className="cta-form-content">
          <div style={{ marginBottom: 38 }}>
            <div className="sec-label">{uiMessage(locale, 'confidentialSecure')}</div>
            <div className="form-intro-title">{uiMessage(locale, 'submitInstitutionCredentials')}</div>
            <p className="form-intro-desc">{uiMessage(locale, 'inquiryReviewNotice')}</p>
          </div>
          {state.status === 'success' && state.messageKey ? (
            <div className="form-success">{uiMessage(locale, state.messageKey)}</div>
          ) : (
            <form action={formAction} noValidate>
              <input type="hidden" name="website" value="" tabIndex={-1} autoComplete="off" />
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="inst-name">
                    {uiMessage(locale, 'institutionName')}
                  </label>
                  <input
                    className="form-input"
                    id="inst-name"
                    name="inst-name"
                    type="text"
                    placeholder={uiMessage(locale, 'officialInstitutionName')}
                    autoComplete="organization"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="sector">
                    {uiMessage(locale, 'sectorClassification')}
                  </label>
                  <select className="form-select" id="sector" name="sector" defaultValue="" required>
                    <option value="" disabled>
                      {uiMessage(locale, 'selectSector')}
                    </option>
                    {sectorOptions.map((sector) => (
                      <option key={sector.value} value={sector.value}>
                        {sector.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="rep-name">
                    {uiMessage(locale, 'authorisedRepresentative')}
                  </label>
                  <input
                    className="form-input"
                    id="rep-name"
                    name="rep-name"
                    type="text"
                    placeholder={uiMessage(locale, 'fullNameAndTitle')}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="official-email">
                    {uiMessage(locale, 'officialEmailAddress')}
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
                    {uiMessage(locale, 'strategicObjective')}
                  </label>
                  <textarea
                    className="form-textarea"
                    id="objective"
                    name="objective"
                    placeholder={uiMessage(locale, 'strategicObjectivePlaceholder')}
                    required
                  />
                </div>
              </div>
              {state.status === 'error' && state.messageKey ? (
                <p className="form-note" role="alert">
                  {uiMessage(locale, state.messageKey)}
                </p>
              ) : null}
              <div className="form-actions">
                <button type="submit" className="btn-gold" disabled={pending}>
                  {pending ? uiMessage(locale, 'submitting') : uiMessage(locale, 'submitCredentials')}
                </button>
                <p className="form-note">{uiMessage(locale, 'inquiryConfidentiality')}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
