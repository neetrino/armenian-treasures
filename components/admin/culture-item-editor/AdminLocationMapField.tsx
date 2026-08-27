'use client';

import dynamic from 'next/dynamic';
import { TextField } from '@/components/forms/fields/TextField';
import { SelectField } from '@/components/forms/fields/SelectField';
import { ClientMounted } from '@/components/admin/ClientMounted';
import { CULTURE_MAP_TYPE_OPTIONS } from '@/lib/admin/enum-labels';

const AdminPinMap = dynamic(
  () => import('./AdminPinMap').then((module) => ({ default: module.AdminPinMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-72 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-muted">
        Loading map…
      </div>
    ),
  },
);

interface AdminLocationMapFieldProps {
  locationName?: string;
  address?: string;
  latitude: string;
  longitude: string;
  mapType?: string;
  showOnMap?: boolean;
  fieldErrors?: Record<string, string>;
  onLatitudeChange: (value: string) => void;
  onLongitudeChange: (value: string) => void;
}

export function AdminLocationMapField({
  locationName,
  address,
  latitude,
  longitude,
  mapType,
  showOnMap,
  fieldErrors,
  onLatitudeChange,
  onLongitudeChange,
}: AdminLocationMapFieldProps) {
  const lat = latitude.trim() ? Number(latitude) : null;
  const lng = longitude.trim() ? Number(longitude) : null;

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
        <TextField
          label="Latitude"
          name="latitude"
          type="number"
          step="any"
          value={latitude}
          onChange={(event) => onLatitudeChange(event.target.value)}
          error={fieldErrors?.latitude}
        />
        <TextField
          label="Longitude"
          name="longitude"
          type="number"
          step="any"
          value={longitude}
          onChange={(event) => onLongitudeChange(event.target.value)}
          error={fieldErrors?.longitude}
        />
        <SelectField
          label="Map pin style"
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
          Show on public map
        </label>
      </div>
      <ClientMounted
        fallback={
          <div className="flex h-72 min-h-[18rem] items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-muted">
            Loading map…
          </div>
        }
      >
        <AdminPinMap
          latitude={Number.isFinite(lat) ? lat : null}
          longitude={Number.isFinite(lng) ? lng : null}
          onChange={(nextLat, nextLng) => {
            onLatitudeChange(nextLat.toFixed(6));
            onLongitudeChange(nextLng.toFixed(6));
          }}
        />
      </ClientMounted>
      <p className="text-xs text-ink-muted">
        Latitude / longitude fill automatically from the pin (default: Yerevan). Drag the pin or
        click the map to move it, then Save. Publish is required for the public /map page.
      </p>
    </div>
  );
}
