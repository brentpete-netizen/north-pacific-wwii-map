import { divIcon, type DivIcon } from "leaflet";
import { memo, useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { toMapLng } from "../lib/longitude.ts";
import type { Halo, Kind, MarkerGroup, Side } from "../types.ts";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildIcon(
  side: Side,
  kind: Kind,
  placeName: string,
  count: number,
  selected: boolean,
  halo: Halo | null,
): DivIcon {
  const countHtml = count > 1 ? `<span class="pin-count">${count}</span>` : "";
  const selectedClass = selected ? " pin-selected" : "";
  const haloHtml = halo ? `<span class="halo halo-${halo}"></span>` : "";
  return divIcon({
    className: "pin-icon",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    html: `<div class="pin-wrap">${haloHtml}<div class="pin pin-${side} pin-${kind}${selectedClass}"><span class="pin-shape"></span><span class="pin-label">${escapeHtml(placeName)}</span>${countHtml}</div></div>`,
  });
}

interface EventMarkerProps {
  group: MarkerGroup;
  halo: Halo | null;
  selected: boolean;
  onSelect: (locationId: string) => void;
}

function EventMarker({ group, halo, selected, onSelect }: EventMarkerProps) {
  const earliest = group.events[0];
  const side = earliest?.side ?? group.location.side;
  const kind = earliest?.kind ?? group.location.kind;
  const icon = useMemo(
    () => buildIcon(side, kind, group.location.name, group.events.length, selected, halo),
    [side, kind, group.location.name, group.events.length, selected, halo],
  );
  const position = useMemo(
    () => [group.location.lat, toMapLng(group.location.lng)] as [number, number],
    [group.location.lat, group.location.lng],
  );

  return (
    <Marker
      position={position}
      icon={icon}
      zIndexOffset={selected ? 800 : 0}
      keyboard
      eventHandlers={{
        click: () => onSelect(group.location.id),
      }}
    >
      <Tooltip direction="top" offset={[0, -18]}>
        {group.location.name}
      </Tooltip>
    </Marker>
  );
}

export default memo(EventMarker);
