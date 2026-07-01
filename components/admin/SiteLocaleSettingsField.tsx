'use client';

import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface SiteLocaleSettingsFieldProps {
  defaultEnabled: SiteLocaleCode[];
}

const LABELS: Record<SiteLocaleCode, string> = {
  HY: 'Armenian',
  RU: 'Russian',
  EN: 'English',
  FR: 'French',
  PT: 'Portuguese',
};

export function SiteLocaleSettingsField({ defaultEnabled }: SiteLocaleSettingsFieldProps) {
  const enabled = new Set(defaultEnabled);

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-display text-sm font-semibold text-ink">Enabled site languages</legend>
      <p className="text-sm text-muted-foreground">
        Control which locales appear in the public language switcher. Only English has live
        translations today — other locales show a safe &quot;Soon&quot; state until copy ships.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_LOCALE_CODES.map((code) => (
          <label
            key={code}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
          >
            <input
              type="checkbox"
              name="enabledLocales"
              value={code}
              defaultChecked={enabled.has(code)}
              className="h-4 w-4 accent-primary"
            />
            <span>
              {code} — {LABELS[code]}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
