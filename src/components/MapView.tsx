import { latLngBounds, type Map as LeafletMap } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { controlForPeriod } from "../lib/control.ts";
import { groupByLocation } from "../lib/filterEvents.ts";
import { toMapLng } from "../lib/longitude.ts";
import type {
  AirRoute,
  CampaignEvent,
  Location,
  MovementWindow,
  PeriodFilter,
  SupplyRoute,
  SupplyRouteId,
  Track,
  ViewMode,
  WeatherNote,
} from "../types.ts";
import AirLayer, { type AirBadge } from "./AirLayer.tsx";
import EventMarker from "./EventMarker.tsx";
import FleetMotion from "./FleetMotion.tsx";
import ForceMarkers, { type PlacedForce } from "./ForceMarkers.tsx";
import Legend from "./Legend.tsx";
import MovementControl from "./MovementControl.tsx";
import MovementLines from "./MovementLines.tsx";
import SupplyRoutes from "./SupplyRoutes.tsx";
import WeatherLayer from "./WeatherLayer.tsx";

const MAX_BOUNDS: [[number, number], [number, number]] = [
  [10, -280],
  [85, -108],
];

const TILE_ATTRIBUTION =
  "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC";

const ALEUTIANS_BOUNDS: [[number, number], [number, number]] = [
  [50.8, -189.2],
  [56.0, -159.8],
];

const FIT_PADDING = {
  paddingTopLeft: [64, 48] as [number, number],
  paddingBottomRight: [36, 40] as [number, number],
  animate: false,
};

function nudgeOffLegend(map: LeafletMap, markers: [number, number][]) {
  const legend = map.getContainer().parentElement?.querySelector(".legend");
  if (!legend || markers.length === 0) return;
  const mapRect = map.getContainer().getBoundingClientRect();
  const legendRect = legend.getBoundingClientRect();
  const legendLeft = legendRect.left - mapRect.left;
  const legendRight = legendRect.right - mapRect.left;
  const legendTop = legendRect.top - mapRect.top;
  const legendBottom = legendRect.bottom - mapRect.top;
  let overlap = 0;
  for (const point of markers) {
    const placed = map.latLngToContainerPoint(point);
    const left = placed.x - 26;
    const right = placed.x + 26;
    const top = placed.y - 26;
    const bottom = placed.y + 26;
    const hits = right > legendLeft && left < legendRight && bottom > legendTop && top < legendBottom;
    if (hits) overlap = Math.max(overlap, legendRight + 6 - left);
  }
  if (overlap <= 2) return;
  const width = map.getSize().x;
  let room = Infinity;
  for (const point of markers) {
    const placed = map.latLngToContainerPoint(point);
    room = Math.min(room, width - 2 - (placed.x + 26));
  }
  const dx = Math.min(overlap, Math.max(0, room));
  if (dx > 2) map.panBy([-dx, 0], { animate: false });
}

function FitToMarkers({
  points,
  nudgePoints,
  pointKey,
  nonce,
  viewMode,
}: {
  points: [number, number][];
  nudgePoints: [number, number][];
  pointKey: string;
  nonce: number;
  viewMode: ViewMode;
}) {
  const map = useMap();
  useEffect(() => {
    const fit = () => {
      map.invalidateSize();
      if (viewMode === "aleutians") {
        const snap = map.options.zoomSnap;
        map.options.zoomSnap = 0;
        map.fitBounds(latLngBounds(ALEUTIANS_BOUNDS), { ...FIT_PADDING, maxZoom: 7 });
        map.options.zoomSnap = snap;
        nudgeOffLegend(map, nudgePoints);
        return;
      }
      if (points.length === 0) return;
      map.fitBounds(latLngBounds(points), { ...FIT_PADDING, maxZoom: 6 });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [map, points, nudgePoints, pointKey, nonce, viewMode]);
  return null;
}

function PanToSelected({
  selectedId,
  point,
}: {
  selectedId: string | null;
  point: [number, number] | null;
}) {
  const map = useMap();
  const pointRef = useRef(point);
  pointRef.current = point;

  useEffect(() => {
    const next = pointRef.current;
    if (!selectedId || !next) return;
    map.panTo(next, { animate: true });
  }, [map, selectedId]);
  return null;
}

interface MapViewProps {
  locations: Location[];
  events: CampaignEvent[];
  period: PeriodFilter;
  selectedLocationId: string | null;
  viewMode: ViewMode;
  drawnTracks: Track[];
  listedTracks: Track[];
  trackWindow: MovementWindow;
  hiddenTrackIds: readonly string[];
  weatherOn: boolean;
  airOn: boolean;
  weatherNotes: WeatherNote[];
  selectedWeatherId: string | null;
  airBadges: AirBadge[];
  airRoutes: AirRoute[];
  forces: PlacedForce[];
  selectedForceId: string | null;
  onViewMode: (mode: ViewMode) => void;
  onSelect: (locationId: string) => void;
  onSelectWeather: (id: string) => void;
  onSelectForce: (id: string) => void;
  onTrackWindow: (window: MovementWindow) => void;
  onToggleTrack: (id: string) => void;
  onWeather: (on: boolean) => void;
  onAir: (on: boolean) => void;
  onForces: (on: boolean) => void;
  onLeadership: (on: boolean) => void;
  onReference: () => void;
  forcesOn: boolean;
  leadershipOn: boolean;
  supplyRoutes: SupplyRoute[];
  highwayOn: boolean;
  alsibOn: boolean;
  onHighway: (on: boolean) => void;
  onAlsib: (on: boolean) => void;
  onSupplyNote: (id: SupplyRouteId) => void;
  onAllLayers: () => void;
  motionOn: boolean;
  onMotion: () => void;
}

export default function MapView({
  locations,
  events,
  period,
  selectedLocationId,
  viewMode,
  drawnTracks,
  listedTracks,
  trackWindow,
  hiddenTrackIds,
  weatherOn,
  airOn,
  weatherNotes,
  selectedWeatherId,
  airBadges,
  airRoutes,
  forces,
  selectedForceId,
  onViewMode,
  onSelect,
  onSelectWeather,
  onSelectForce,
  onTrackWindow,
  onToggleTrack,
  onWeather,
  onAir,
  onForces,
  onLeadership,
  onReference,
  forcesOn,
  leadershipOn,
  supplyRoutes,
  highwayOn,
  alsibOn,
  onHighway,
  onAlsib,
  onSupplyNote,
  onAllLayers,
  motionOn,
  onMotion,
}: MapViewProps) {
  const [nonce, setNonce] = useState(0);
  const groups = useMemo(() => groupByLocation(events, locations), [events, locations]);

  const selectedGroup = groups.find((group) => group.location.id === selectedLocationId);

  const points = useMemo(
    () =>
      groups
        .filter((group) => !group.location.omitFromFrame)
        .map((group) => [group.location.lat, toMapLng(group.location.lng)] as [number, number]),
    [groups],
  );

  const nudgePoints = useMemo(() => {
    if (viewMode !== "aleutians") return [];
    return points.filter(
      ([lat, lng]) => lat >= 50.8 && lat <= 56 && lng >= -189.2 && lng <= -159.8,
    );
  }, [points, viewMode]);

  const pointKey = points.map((point) => point.join(",")).join("|");

  const selectedForce = forces.find((unit) => unit.id === selectedForceId) ?? null;

  const selectedPoint = useMemo(() => {
    if (selectedGroup) {
      return [selectedGroup.location.lat, toMapLng(selectedGroup.location.lng)] as [number, number];
    }
    if (!selectedForce) return null;
    return [selectedForce.lat, toMapLng(selectedForce.lng)] as [number, number];
  }, [selectedGroup, selectedForce]);

  function chooseView(mode: ViewMode) {
    onViewMode(mode);
    setNonce((value) => value + 1);
  }

  return (
    <div className="map-wrap">
      <MapContainer
        center={[48, -178]}
        zoom={4}
        minZoom={3}
        maxZoom={12}
        maxBounds={MAX_BOUNDS}
        maxBoundsViscosity={0.85}
        className="campaign-map"
        worldCopyJump={false}
        scrollWheelZoom
      >
        <TileLayer
          attribution={TILE_ATTRIBUTION}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <FitToMarkers
          points={points}
          nudgePoints={nudgePoints}
          pointKey={pointKey}
          nonce={nonce}
          viewMode={viewMode}
        />
        <FleetMotion enabled={motionOn && (period === "june1942" || period === "all")} />
        <PanToSelected selectedId={selectedLocationId ?? selectedForceId} point={selectedPoint} />
        {weatherOn ? (
          <WeatherLayer notes={weatherNotes} selectedId={selectedWeatherId} onSelect={onSelectWeather} />
        ) : null}
        <SupplyRoutes routes={supplyRoutes} onSelect={onSupplyNote} />
        <MovementLines tracks={drawnTracks} />
        {airOn ? <AirLayer badges={airBadges} routes={airRoutes} onSelect={onSelect} /> : null}
        <ForceMarkers units={forces} selectedId={selectedForceId} onSelect={onSelectForce} />
        {groups.map((group) => (
          <EventMarker
            key={group.location.id}
            group={group}
            halo={controlForPeriod(group.location, period)}
            selected={group.location.id === selectedGroup?.location.id}
            onSelect={onSelect}
          />
        ))}
      </MapContainer>
      <div className="view-toggle" role="group" aria-label="Map extent">
        <button
          type="button"
          aria-pressed={viewMode === "theater"}
          onClick={() => chooseView("theater")}
        >
          Theater
        </button>
        <button
          type="button"
          aria-pressed={viewMode === "aleutians"}
          onClick={() => chooseView("aleutians")}
        >
          Aleutians
        </button>
      </div>
      <Legend />
      <MovementControl
        window={trackWindow}
        listed={listedTracks}
        hiddenIds={hiddenTrackIds}
        weatherOn={weatherOn}
        airOn={airOn}
        forcesOn={forcesOn}
        leadershipOn={leadershipOn}
        onWindow={onTrackWindow}
        onToggle={onToggleTrack}
        onWeather={onWeather}
        onAir={onAir}
        onForces={onForces}
        onLeadership={onLeadership}
        onReference={onReference}
        highwayOn={highwayOn}
        alsibOn={alsibOn}
        onHighway={onHighway}
        onAlsib={onAlsib}
        onSupplyNote={onSupplyNote}
        onAllLayers={onAllLayers}
        motionOn={motionOn}
        onMotion={onMotion}
      />
    </div>
  );
}
