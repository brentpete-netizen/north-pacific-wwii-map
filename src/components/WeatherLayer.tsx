import { divIcon } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { Marker, Polygon, useMap } from "react-leaflet";
import { weatherBand } from "../data/weather.ts";
import { toMapLng } from "../lib/longitude.ts";
import type { WeatherNote } from "../types.ts";

const noteIcon = divIcon({
  className: "pin-icon",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  html: '<span class="weather-mark"></span>',
});

const selectedNoteIcon = divIcon({
  className: "pin-icon",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  html: '<span class="weather-mark weather-mark-selected"></span>',
});

function shifted(points: [number, number][]): [number, number][] {
  return points.map(([lat, lng]) => [lat, toMapLng(lng)]);
}

export default function WeatherLayer({
  notes,
  selectedId,
  onSelect,
}: {
  notes: WeatherNote[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const map = useMap();
  const [ready, setReady] = useState(false);
  const band = useMemo(() => shifted(weatherBand), []);

  useEffect(() => {
    if (!map.getPane("weather")) {
      const pane = map.createPane("weather");
      pane.style.zIndex = "320";
      pane.style.pointerEvents = "none";
    }
    setReady(true);
  }, [map]);

  if (!ready) return null;

  return (
    <>
      <Polygon
        positions={band}
        pane="weather"
        interactive={false}
        pathOptions={{
          stroke: false,
          fillColor: "#8aa0b4",
          fillOpacity: 0.28,
        }}
      />
      {notes.map((note) => (
        <Marker
          key={note.id}
          position={[note.lat, toMapLng(note.lng)]}
          icon={note.id === selectedId ? selectedNoteIcon : noteIcon}
          keyboard
          zIndexOffset={note.id === selectedId ? 500 : 200}
          eventHandlers={{ click: () => onSelect(note.id) }}
        />
      ))}
    </>
  );
}
