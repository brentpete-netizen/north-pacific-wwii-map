import { divIcon, type DivIcon } from "leaflet";
import { memo, useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { toMapLng } from "../lib/longitude.ts";
import type { ForceCategory, ForceUnit } from "../types.ts";

export interface PlacedForce extends ForceUnit {
  lat: number;
  lng: number;
}

function buildIcon(category: ForceCategory, side: ForceUnit["side"], selected: boolean): DivIcon {
  const selectedClass = selected ? " force-hit-selected" : "";
  return divIcon({
    className: "pin-icon",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<span class="force-hit${selectedClass}"><span class="force-mark force-${category} force-${side}"></span></span>`,
  });
}

function ForceMarker({
  unit,
  selected,
  onSelect,
}: {
  unit: PlacedForce;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const icon = useMemo(
    () => buildIcon(unit.category, unit.side, selected),
    [unit.category, unit.side, selected],
  );
  const point = useMemo(
    () => [unit.lat, toMapLng(unit.lng)] as [number, number],
    [unit.lat, unit.lng],
  );

  return (
    <Marker
      position={point}
      icon={icon}
      zIndexOffset={selected ? -50 : -200}
      keyboard
      eventHandlers={{ click: () => onSelect(unit.id) }}
    >
      <Tooltip className="track-tip" direction="top" offset={[0, -8]}>
        <strong>{unit.name}</strong>
        <span>{unit.role}</span>
      </Tooltip>
    </Marker>
  );
}

function ForceMarkers({
  units,
  selectedId,
  onSelect,
}: {
  units: PlacedForce[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {units.map((unit) => (
        <ForceMarker key={unit.id} unit={unit} selected={unit.id === selectedId} onSelect={onSelect} />
      ))}
    </>
  );
}

export default memo(ForceMarkers);
