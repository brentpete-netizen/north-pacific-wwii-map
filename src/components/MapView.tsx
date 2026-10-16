import { latLngBounds } from "leaflet";
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
import ForceMarkers, { type PlacedForce } from "./ForceMarkers.tsx";
import Legend from "./Legend.tsx";
import MovementControl from "./MovementControl.tsx";
import MovementLines from "./MovementLines.tsx";
import SupplyRoutes from "./SupplyRoutes.tsx";
import WeatherLayer from "./WeatherLayer.tsx";

const MAX_BOUNDS: [[number, number], [number, number]] = [
  [10, -245],
  [85, -108],
];

const TILE_ATTRIBUTION =
  "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC";

function FitToMarkers({
  points,
  omitPoints,
  pointKey,
  nonce,
  viewMode,
}: {
  points: [number, number][];
  omitPoints: [number, number][];
  pointKey: string;
  nonce: number;
  viewMode: ViewMode;
}) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const fit = () => {
      map.invalidateSize();
      map.fitBounds(latLngBounds(points), {
        paddingTopLeft: [64, 48],
        paddingBottomRight: [36, 40],
        maxZoom: 6,
        animate: false,
      });
      if (viewMode !== "aleutians" || omitPoints.length === 0) return;
      const northmost = omitPoints.reduce((best, point) => (point[0] > best[0] ? point : best));
      const omitted = map.latLngToContainerPoint(northmost);
      const dropShift = omitted.y - (map.getSize().y + 28);
      if (dropShift < -4) map.panBy([0, dropShift], { animate: false });

      const legend = map.getContainer().parentElement?.querySelector(".legend");
      if (!legend) return;
      const mapRect = map.getContainer().getBoundingClientRect();
      const legendRect = legend.getBoundingClientRect();
      const legendLeft = legendRect.left - mapRect.left;
      const legendRight = legendRect.right - mapRect.left;
      const legendTop = legendRect.top - mapRect.top;
      const legendBottom = legendRect.bottom - mapRect.top;
      let overlap = 0;
      for (const point of points) {
        const placed = map.latLngToContainerPoint(point);
        const left = placed.x - 22;
        const right = placed.x + 22;
        const top = placed.y - 22;
        const bottom = placed.y + 22;
        const hits =
          right > legendLeft && left < legendRight && bottom > legendTop && top < legendBottom;
        if (hits) overlap = Math.max(overlap, legendRight + 6 - left);
      }
      if (overlap <= 2) return;
      const width = map.getSize().x;
      let room = Infinity;
      for (const point of points) {
        const placed = map.latLngToContainerPoint(point);
        room = Math.min(room, width - 2 - (placed.x + 22));
      }
      const dx = Math.min(overlap, Math.max(0, room));
      if (dx > 2) map.panBy([-dx, 0], { animate: false });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [map, points, omitPoints, pointKey, nonce, viewMode]);
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
}: MapViewProps) {
  const [nonce, setNonce] = useState(0);
  const groups = useMemo(() => groupByLocation(events, locations), [events, locations]);

  const selectedGroup = groups.find((group) => group.location.id === selectedLocationId);

  const points = useMemo(() => {
    const inFrame =
      viewMode === "aleutians" ? groups.filter((group) => group.location.lat >= 48) : groups;
    const source = inFrame.length > 0 ? inFrame : groups;
    return source.map(
      (group) => [group.location.lat, toMapLng(group.location.lng)] as [number, number],
    );
  }, [groups, viewMode]);

  const omitPoints = useMemo(() => {
    if (viewMode !== "aleutians") return [];
    return groups
      .filter((group) => group.location.lat < 48)
      .map((group) => [group.location.lat, toMapLng(group.location.lng)] as [number, number]);
  }, [groups, viewMode]);

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
          omitPoints={omitPoints}
          pointKey={pointKey}
          nonce={nonce}
          viewMode={viewMode}
        />
        <PanToSelected selectedId={selectedLocationId ?? selectedForceId} point={selectedPoint} />
        {weatherOn ? (
          <WeatherLayer notes={weatherNotes} selectedId={selectedWeatherId} onSelect={onSelectWeather} />
        ) : null}
        <SupplyRoutes routes={supplyRoutes} />
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
      />
    </div>
  );
}
