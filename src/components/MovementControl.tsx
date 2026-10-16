import type { MovementWindow, SupplyRouteId, Track, TrackKind } from "../types.ts";

const WINDOWS: { id: MovementWindow; label: string; detail: string }[] = [
  { id: "off", label: "Off", detail: "Hide movement lines" },
  { id: "approach", label: "Approach", detail: "Late May–2 June 1942" },
  { id: "raids", label: "Raids", detail: "3–4 June 1942" },
  { id: "landings", label: "Landings", detail: "6–7 June 1942" },
  { id: "all", label: "All", detail: "Every movement" },
];

interface MovementControlProps {
  window: MovementWindow;
  listed: Track[];
  hiddenIds: readonly string[];
  weatherOn: boolean;
  airOn: boolean;
  forcesOn: boolean;
  leadershipOn: boolean;
  onWindow: (window: MovementWindow) => void;
  onToggle: (id: string) => void;
  onWeather: (on: boolean) => void;
  onAir: (on: boolean) => void;
  onForces: (on: boolean) => void;
  onLeadership: (on: boolean) => void;
  onReference: () => void;
  highwayOn: boolean;
  alsibOn: boolean;
  onHighway: (on: boolean) => void;
  onAlsib: (on: boolean) => void;
  onSupplyNote: (id: SupplyRouteId) => void;
  onAllLayers: () => void;
  motionOn: boolean;
  onMotion: () => void;
}

function TrackGroup({
  label,
  kind,
  tracks,
  hiddenIds,
  onToggle,
}: {
  label: string;
  kind: TrackKind;
  tracks: Track[];
  hiddenIds: readonly string[];
  onToggle: (id: string) => void;
}) {
  const items = tracks.filter((track) => track.kind === kind);
  if (items.length === 0) return null;
  return (
    <fieldset className="movement-group">
      <legend>{label}</legend>
      {items.map((track) => (
        <label key={track.id}>
          <input
            type="checkbox"
            checked={!hiddenIds.includes(track.id)}
            onChange={() => onToggle(track.id)}
          />
          {track.title}
        </label>
      ))}
    </fieldset>
  );
}

export default function MovementControl({
  window,
  listed,
  hiddenIds,
  weatherOn,
  airOn,
  forcesOn,
  leadershipOn,
  onWindow,
  onToggle,
  onWeather,
  onAir,
  onForces,
  onLeadership,
  onReference,
  highwayOn,
  alsibOn,
  onHighway,
  onAlsib,
  onSupplyNote,
  onAllLayers,
  motionOn,
  onMotion,
}: MovementControlProps) {
  return (
    <div className="movements">
      <fieldset className="movement-group layer-toggles">
        <legend>Layers</legend>
        <button type="button" className="reference-open" onClick={onAllLayers}>
          All layers
        </button>
        <label>
          <input type="checkbox" checked={weatherOn} onChange={(event) => onWeather(event.target.checked)} />
          Weather
        </label>
        <label>
          <input type="checkbox" checked={airOn} onChange={(event) => onAir(event.target.checked)} />
          Air war
        </label>
        <label>
          <input type="checkbox" checked={forcesOn} onChange={(event) => onForces(event.target.checked)} />
          Forces
        </label>
        <label>
          <input
            type="checkbox"
            checked={leadershipOn}
            onChange={(event) => onLeadership(event.target.checked)}
          />
          Leadership
        </label>
        <label>
          <input type="checkbox" checked={highwayOn} onChange={(event) => onHighway(event.target.checked)} />
          Highway
        </label>
        <label>
          <input type="checkbox" checked={alsibOn} onChange={(event) => onAlsib(event.target.checked)} />
          ALSIB
        </label>
        <button type="button" className="reference-open" onClick={onReference}>
          Reference
        </button>
        <button type="button" className="reference-open" onClick={() => onSupplyNote("alaska-highway")}>
          Highway note
        </button>
        <button type="button" className="reference-open" onClick={() => onSupplyNote("alsib")}>
          ALSIB note
        </button>
      </fieldset>
      <p className="legend-title">Movements</p>
      <div className="movement-windows" role="group" aria-label="Movement window">
        {WINDOWS.map((item) => (
          <button
            key={item.id}
            type="button"
            title={item.detail}
            aria-pressed={window === item.id}
            onClick={() => onWindow(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="play-routes"
        aria-pressed={motionOn}
        title="Loop the Japanese approaches to Dutch Harbor and Midway"
        onClick={onMotion}
      >
        Play routes
      </button>
      {listed.length > 0 && (
        <>
          <TrackGroup
            label="Fleet"
            kind="fleet"
            tracks={listed}
            hiddenIds={hiddenIds}
            onToggle={onToggle}
          />
          <TrackGroup
            label="Air"
            kind="air"
            tracks={listed}
            hiddenIds={hiddenIds}
            onToggle={onToggle}
          />
          <div className="movement-key">
            <p>
              <span className="key-line key-japan" />
              <span className="key-line key-us" />
              Fleet, Japanese and United States
            </p>
            <p>
              <span className="key-line key-japan key-dashed" />
              <span className="key-line key-us key-dashed" />
              Air paths, dashed
            </p>
          </div>
        </>
      )}
    </div>
  );
}
