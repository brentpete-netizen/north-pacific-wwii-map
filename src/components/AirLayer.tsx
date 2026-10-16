import { divIcon } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Polyline, Tooltip, useMap } from "react-leaflet";
import { toMapLng } from "../lib/longitude.ts";
import type { AirRoute } from "../types.ts";

const JAPAN = "#7a332c";
const NAVY = "#1e3a5f";

const badgeIcon = divIcon({
  className: "pin-icon",
  iconSize: [16, 16],
  iconAnchor: [-18, 34],
  html: '<span class="air-badge"></span>',
});

export interface AirBadge {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

function shifted(points: [number, number][]): [number, number][] {
  return points.map(([lat, lng]) => [lat, toMapLng(lng)]);
}

export default function AirLayer({
  badges,
  routes,
  onSelect,
}: {
  badges: AirBadge[];
  routes: AirRoute[];
  onSelect: (locationId: string) => void;
}) {
  const map = useMap();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!map.getPane("movement")) {
      const pane = map.createPane("movement");
      pane.style.zIndex = "350";
    }
    setReady(true);
  }, [map]);

  if (!ready) return null;

  return (
    <>
      {routes.map((route) => (
        <Polyline
          key={route.id}
          positions={shifted(route.coordinates)}
          pane="movement"
          pathOptions={{
            color: route.side === "japan" ? JAPAN : NAVY,
            weight: 2,
            opacity: 0.92,
            dashArray: "6 5",
          }}
        >
          <Tooltip className="track-tip" direction="top">
            <strong>{route.title}</strong>
            <span>{route.side === "japan" ? "Japanese" : "United States"}</span>
            <span>{route.summary}</span>
          </Tooltip>
        </Polyline>
      ))}
      {badges.map((badge) => (
        <Marker
          key={badge.id}
          position={[badge.lat, toMapLng(badge.lng)]}
          icon={badgeIcon}
          keyboard
          zIndexOffset={400}
          eventHandlers={{ click: () => onSelect(badge.id) }}
        >
          <Tooltip direction="top" offset={[26, -28]}>
            {badge.name}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
}
