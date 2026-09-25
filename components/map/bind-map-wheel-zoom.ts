import type { Map as LeafletMapInstance } from 'leaflet';

export function bindMapWheelZoom(
  map: LeafletMapInstance,
  container: HTMLElement,
  setActive: (active: boolean) => void,
): () => void {
  map.scrollWheelZoom.disable();

  const activate = (): void => {
    map.scrollWheelZoom.enable();
    setActive(true);
  };
  const deactivate = (): void => {
    map.scrollWheelZoom.disable();
    setActive(false);
  };
  const handleDocumentClick = (event: MouseEvent): void => {
    if (container.contains(event.target as Node)) return;
    deactivate();
  };
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return;
    deactivate();
    container.blur();
  };

  container.addEventListener('click', activate);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('click', activate);
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('keydown', handleKeyDown);
  };
}
