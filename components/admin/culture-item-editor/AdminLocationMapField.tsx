'use client';

import { useState } from 'react';
import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { CULTURE_MAP_TYPE_OPTIONS } from '@/lib/admin/enum-labels';
import { parseMapCoordinatesFromUrl } from '@/lib/culture-catalog/parse-map-url';
import { decodeTranslatableText } from '@/lib/i18n/translatable-content';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

interface AdminLocationMapFieldProps {
  locationNameEncoded?: string;
  address?: string;
  mapUrl?: string;
  mapType?: string;
  showOnMap?: boolean;
  activeLocale: SiteLocaleCode;
  fieldErrors?: Record<string, string>;
  onMapUrlChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

function sharedLocationName(encoded: string | undefined): string {
  const values = decodeTranslatableText(encoded ?? '');
  for (const code of SITE_LOCALE_CODES) {
    const value = values[code]?.trim();
    if (value) return value;
  }
  return '';
}

export function AdminLocationMapField({
  locationNameEncoded,
  address = '',
  mapUrl = '',
  mapType,
  showOnMap,
  activeLocale,
  fieldErrors,
  onMapUrlChange,
  onAddressChange,
}: AdminLocationMapFieldProps) {
  const parsed = parseMapCoordinatesFromUrl(mapUrl);
  const [locationName, setLocationName] = useState(() => sharedLocationName(locationNameEncoded));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {SITE_LOCALE_CODES.map((code) =>
          code === activeLocale ? null : (
            <input key={code} type="hidden" name={`locationName.${code}`} value={locationName} readOnly />
          ),
        )}
        <TextField
          label="Location name"
          name={`locationName.${activeLocale}`}
          value={locationName}
          onChange={(event) => setLocationName(event.target.value)}
          hint="Shared for all languages."
          error={fieldErrors?.locationName}
        />
        <TextField
          label="Address"
          name="address"
          value={address}
          onChange={(event) => onAddressChange(event.target.value)}
          hint="Shared for all languages."
        />
        <div className="sm:col-span-2">
          <TextField
            label="Map link"
            name="mapUrl"
            value={mapUrl}
            onChange={(event) => onMapUrlChange(event.target.value)}
            hint="Shared for all languages. Paste a Google Maps, OpenStreetMap, or geo: link."
            error={fieldErrors?.mapUrl}
          />
        </div>
        <SelectField
          label="Map pin type"
          name="mapType"
          options={[{ value: '', label: '— None —' }, ...CULTURE_MAP_TYPE_OPTIONS]}
          defaultValue={mapType ?? ''}
          error={fieldErrors?.mapType}
        />
        <label className="flex items-center gap-2 pt-7 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="showOnMap"
            defaultChecked={showOnMap ?? false}
            className="h-4 w-4 rounded border-stone-300 text-pomegranate focus:ring-pomegranate/30"
          />
          Show on public page and heritage map
        </label>
      </div>
      <input type="hidden" name="latitude" value={parsed ? String(parsed.latitude) : ''} />
      <input type="hidden" name="longitude" value={parsed ? String(parsed.longitude) : ''} />
      {parsed ? (
        <p className="text-xs text-ink-muted">
          Pin coordinates: {parsed.latitude.toFixed(5)}, {parsed.longitude.toFixed(5)}
        </p>
      ) : (
        <p className="text-xs text-ink-muted">
          Use a full maps URL that includes coordinates (for example …/@39.3793,46.2502) so the
          heritage map can place the pin.
        </p>
      )}
    </div>
  );
}
