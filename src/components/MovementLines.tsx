import { useEffect, useState, type ReactNode } from "react";
import { Polyline, Tooltip, useMap } from "react-leaflet";
import { toMapLng } from "../lib/longitude.ts";
import type { Track } from "../types.ts";

const JAPAN = "#7a332c";
const NAVY = "#1e3a5f";

function MovementPane({ children }: { children: ReactNode }) {
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
  return children;
}

function trackPositions(track: Track): [number, number][] {
  return track.coordinates.map(([lat, lng]) => [lat, toMapLng(lng)]);
}

export default function MovementLines({ tracks }: { tracks: Track[] }) {
  return (
    <MovementPane>
      {tracks.map((track) => (
        <Polyline
          key={track.id}
          positions={trackPositions(track)}
          pane="movement"
          pathOptions={{
            color: track.side === "japan" ? JAPAN : NAVY,
            weight: track.kind === "air" ? 2 : 2.5,
            opacity: 0.92,
            dashArray: track.kind === "air" ? "6 5" : undefined,
          }}
        >
          <Tooltip className="track-tip" direction="top">
            <strong>{track.title}</strong>
            <span>{track.side === "japan" ? "Japanese" : "United States"}</span>
            <span>{track.summary}</span>
          </Tooltip>
        </Polyline>
      ))}
    </MovementPane>
  );
}
