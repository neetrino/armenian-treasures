'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { authPathWithNext, safeReturnPath } from '@/lib/auth/safe-return-path';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import '@/components/virtual-tour/virtual-tour-gate.css';

interface TourRegisterPromptProps {
  locale: SiteLocaleCode;
  returnHash?: string;
  onClose: () => void;
}

function hashForReturn(returnHash: string | undefined): string {
  if (!returnHash) return window.location.hash;
  if (returnHash.startsWith('#')) return returnHash;
  return `#${returnHash}`;
}

function currentTourReturnPath(returnHash?: string): string {
  const candidate = `${window.location.pathname}${window.location.search}${hashForReturn(returnHash)}`;
  return safeReturnPath(candidate) ?? '/';
}

export function TourRegisterPrompt({ locale, returnHash, onClose }: TourRegisterPromptProps) {
  const [returnTo] = useState(() => currentTourReturnPath(returnHash));
  const registerHref = authPathWithNext('/register', returnTo);
  const loginHref = authPathWithNext('/login', returnTo);

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="tour-register">
      <button type="button" className="tour-register__backdrop" aria-label={uiMessage(locale, 'tourGateClose')} onClick={onClose} />
      <div className="tour-register__dialog" role="dialog" aria-modal="true" aria-labelledby="tour-register-title">
        <button type="button" className="tour-register__close" onClick={onClose} aria-label={uiMessage(locale, 'tourGateClose')}>
          ×
        </button>
        <p className="tour-register__eyebrow">{uiMessage(locale, 'virtualExperience')}</p>
        <h2 id="tour-register-title" className="tour-register__title">
          {uiMessage(locale, 'tourGateTitle')}
        </h2>
        <p className="tour-register__lead">{uiMessage(locale, 'tourGateLead')}</p>
        <div className="tour-register__actions">
          <a className="tour-register__primary" href={registerHref}>
            {uiMessage(locale, 'createAccount')}
          </a>
          <a className="tour-register__secondary" href={loginHref}>
            {uiMessage(locale, 'signIn')}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
