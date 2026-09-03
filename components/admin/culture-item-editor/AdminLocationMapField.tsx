'use client';

import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { CULTURE_MAP_TYPE_OPTIONS } from '@/lib/admin/enum-labels';
import { parseMapCoordinatesFromUrl } from '@/lib/culture-catalog/parse-map-url';

interface AdminLocationMapFieldProps {
  locationName?: string;
  address?: string;
  mapUrl?: string;
  mapType?: string;
  showOnMap?: boolean;
  fieldErrors?: Record<string, string>;
  onMapUrlChange: (value: string) => void;
}

export function AdminLocationMapField({
  locationName,
  address,
  mapUrl = '',
  mapType,
  showOnMap,
  fieldErrors,
  onMapUrlChange,
}: AdminLocationMapFieldProps) {
  const parsed = parseMapCoordinatesFromUrl(mapUrl);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Location name"
          name="locationName"
          defaultValue={locationName ?? ''}
          error={fieldErrors?.locationName}
        />
        <TextField label="Address" name="address" defaultValue={address ?? ''} />
        <div className="sm:col-span-2">
          <TextField
            label="Map link"
            name="mapUrl"
            value={mapUrl}
            onChange={(event) => onMapUrlChange(event.target.value)}
            hint="Paste a Google Maps, OpenStreetMap, or geo: link. Coordinates for the heritage map are read from the URL."
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
