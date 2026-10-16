import { divIcon } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { Marker, Polygon, useMap } from "react-leaflet";
import { weatherBand } from "../data/weather.ts";
import { symbolMarkup } from "../icons/symbols.ts";
import { toMapLng } from "../lib/longitude.ts";
import type { WeatherNote } from "../types.ts";

const weatherFill = "#8aa0b4";
const weatherSymbol = symbolMarkup("weather", weatherFill);
const selectedWeather = symbolMarkup("weather", weatherFill, { stroke: "#1c1915" });

const noteIcon = divIcon({
  className: "pin-icon",
  iconSize: [weatherSymbol.width, weatherSymbol.height],
  iconAnchor: [weatherSymbol.width / 2, weatherSymbol.height / 2],
  html: weatherSymbol.html,
});

const selectedNoteIcon = divIcon({
  className: "pin-icon",
  iconSize: [selectedWeather.width, selectedWeather.height],
  iconAnchor: [selectedWeather.width / 2, selectedWeather.height / 2],
  html: `<span class="symbol-selected">${selectedWeather.html}</span>`,
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
