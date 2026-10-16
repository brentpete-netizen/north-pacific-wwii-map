import { useMemo, useState } from "react";
import Header from "./components/Header.tsx";
import MapView from "./components/MapView.tsx";
import SidePanel from "./components/SidePanel.tsx";
import Timeline from "./components/Timeline.tsx";
import { airNotes, airRoutes } from "./data/airWar.ts";
import { events } from "./data/events.ts";
import { forces } from "./data/forces.ts";
import { locations } from "./data/locations.ts";
import { supplyRoutes } from "./data/supplyRoutes.ts";
import { tracks } from "./data/tracks.ts";
import { weatherNotes } from "./data/weather.ts";
import { eventsInPeriod, locationsInPeriod } from "./lib/filterEvents.ts";
import { forcePosition } from "./lib/forcePosition.ts";
import { tracksForWindow, tracksInWindow } from "./lib/filterTracks.ts";
import { matchesPeriod } from "./lib/matchesPeriod.ts";
import type { MovementWindow, PeriodFilter, SupplyRouteId, ViewMode } from "./types.ts";

function earliestEventId(locationId: string, periodEvents: typeof events): string | null {
  const atPlace = periodEvents
    .filter((event) => event.locationId === locationId)
    .sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
  return atPlace[0]?.id ?? null;
}

export default function App() {
  const [period, setPeriod] = useState<PeriodFilter>("june1942");
  const [locationId, setLocationId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("theater");
  const [trackWindow, setTrackWindow] = useState<MovementWindow>("off");
  const [hiddenTrackIds, setHiddenTrackIds] = useState<string[]>([]);
  const [weatherOn, setWeatherOn] = useState(false);
  const [airOn, setAirOn] = useState(false);
  const [weatherNoteId, setWeatherNoteId] = useState<string | null>(null);
  const [forcesOn, setForcesOn] = useState(false);
  const [leadershipOn, setLeadershipOn] = useState(false);
  const [forceId, setForceId] = useState<string | null>(null);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [highwayOn, setHighwayOn] = useState(false);
  const [alsibOn, setAlsibOn] = useState(false);
  const [supplyRouteId, setSupplyRouteId] = useState<SupplyRouteId | null>(null);
  const [motionOn, setMotionOn] = useState(false);

  const activeEvents = useMemo(() => eventsInPeriod(events, period), [period]);
  const visibleLocations = useMemo(() => locationsInPeriod(locations, period), [period]);
  const selectedEvent = activeEvents.find((event) => event.id === eventId) ?? null;
  const drawnTracks = useMemo(
    () => tracksInWindow(tracks, trackWindow, hiddenTrackIds),
    [trackWindow, hiddenTrackIds],
  );
  const listedTracks = useMemo(() => tracksForWindow(tracks, trackWindow), [trackWindow]);
  const visibleWeatherNotes = useMemo(
    () => (weatherOn ? weatherNotes.filter((note) => matchesPeriod(note.periodIds, period)) : []),
    [weatherOn, period],
  );
  const selectedWeather =
    visibleWeatherNotes.find((note) => note.id === weatherNoteId) ?? null;
  const airSummary = useMemo(() => {
    if (!airOn || !locationId) return null;
    const note = airNotes.find(
      (item) => item.locationId === locationId && matchesPeriod(item.periodIds, period),
    );
    return note?.summary ?? null;
  }, [airOn, locationId, period]);
  const airBadges = useMemo(() => {
    if (!airOn) return [];
    return airNotes.flatMap((note) => {
      if (!matchesPeriod(note.periodIds, period)) return [];
      const place = visibleLocations.find((item) => item.id === note.locationId);
      if (!place) return [];
      return [{ id: place.id, name: place.name, lat: place.lat, lng: place.lng }];
    });
  }, [airOn, period, visibleLocations]);
  const visibleAirRoutes = useMemo(
    () => (airOn ? airRoutes.filter((route) => matchesPeriod(route.periodIds, period)) : []),
    [airOn, period],
  );
  const visibleForces = useMemo(() => {
    return forces.flatMap((unit) => {
      const show = unit.category === "commander" ? leadershipOn : forcesOn;
      if (!show) return [];
      const position = forcePosition(unit, period);
      if (!position) return [];
      return [{ ...unit, lat: position.lat, lng: position.lng }];
    });
  }, [forcesOn, leadershipOn, period]);
  const selectedForce = visibleForces.find((unit) => unit.id === forceId) ?? null;
  const visibleSupplyRoutes = useMemo(() => {
    return supplyRoutes.filter((route) => {
      if (!matchesPeriod(route.periodIds, period)) return false;
      return route.id === "alaska-highway" ? highwayOn : alsibOn;
    });
  }, [highwayOn, alsibOn, period]);
  const selectedSupplyRoute = supplyRoutes.find((route) => route.id === supplyRouteId) ?? null;

  function clearForce() {
    setForceId(null);
    setReferenceOpen(false);
  }

  function clearSupply() {
    setSupplyRouteId(null);
  }

  function selectLocation(id: string) {
    setWeatherNoteId(null);
    clearForce();
    clearSupply();
    setLocationId(id);
    setEventId(earliestEventId(id, activeEvents));
  }

  function selectWeather(id: string) {
    setWeatherNoteId(id);
    clearForce();
    clearSupply();
    setLocationId(null);
    setEventId(null);
  }

  function selectForce(id: string) {
    setForceId(id);
    setReferenceOpen(true);
    clearSupply();
    setLocationId(null);
    setEventId(null);
    setWeatherNoteId(null);
  }

  function openReference() {
    setReferenceOpen(true);
    clearSupply();
    setLocationId(null);
    setEventId(null);
    setWeatherNoteId(null);
  }

  function showAllLayers() {
    setWeatherOn(true);
    setAirOn(true);
    setForcesOn(true);
    setLeadershipOn(true);
    setHighwayOn(true);
    setAlsibOn(true);
  }

  function selectSupply(id: SupplyRouteId) {
    setSupplyRouteId(id);
    clearForce();
    setLocationId(null);
    setEventId(null);
    setWeatherNoteId(null);
  }

  function selectEvent(id: string) {
    const event = events.find((item) => item.id === id);
    if (!event) return;
    clearForce();
    clearSupply();
    setWeatherNoteId(null);
    setLocationId(event.locationId);
    setEventId(id);
  }

  function changeTrackWindow(next: MovementWindow) {
    setTrackWindow(next);
    setHiddenTrackIds([]);
  }

  function toggleTrack(id: string) {
    setHiddenTrackIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function changePeriod(next: PeriodFilter) {
    const nextEvents = eventsInPeriod(events, next);
    const nextLocations = locationsInPeriod(locations, next);
    const placeRemains =
      locationId !== null && nextLocations.some((place) => place.id === locationId);
    setPeriod(next);
    setWeatherNoteId((current) => {
      if (!current) return null;
      const note = weatherNotes.find((item) => item.id === current);
      if (!note || !matchesPeriod(note.periodIds, next)) return null;
      return current;
    });
    setForceId((current) => {
      if (!current) return null;
      const unit = forces.find((item) => item.id === current);
      if (!unit || !matchesPeriod(unit.periodIds, next)) return null;
      return current;
    });
    setSupplyRouteId((current) => {
      if (!current) return null;
      const route = supplyRoutes.find((item) => item.id === current);
      if (!route || !matchesPeriod(route.periodIds, next)) return null;
      return current;
    });
    if (!placeRemains || locationId === null) {
      setLocationId(null);
      setEventId(null);
      return;
    }
    const eventRemains = eventId !== null && nextEvents.some((event) => event.id === eventId);
    setEventId(eventRemains ? eventId : earliestEventId(locationId, nextEvents));
  }

  return (
    <div className="app">
      <Header />
      <Timeline period={period} onChange={changePeriod} />
      <div className="workspace">
        <MapView
          locations={visibleLocations}
          events={activeEvents}
          period={period}
          selectedLocationId={locationId}
          viewMode={viewMode}
          drawnTracks={drawnTracks}
          listedTracks={listedTracks}
          trackWindow={trackWindow}
          hiddenTrackIds={hiddenTrackIds}
          weatherOn={weatherOn}
          airOn={airOn}
          weatherNotes={visibleWeatherNotes}
          selectedWeatherId={selectedWeather?.id ?? null}
          airBadges={airBadges}
          airRoutes={visibleAirRoutes}
          forces={visibleForces}
          selectedForceId={selectedForce?.id ?? null}
          forcesOn={forcesOn}
          leadershipOn={leadershipOn}
          onViewMode={setViewMode}
          onSelect={selectLocation}
          onSelectWeather={selectWeather}
          onSelectForce={selectForce}
          onTrackWindow={changeTrackWindow}
          onToggleTrack={toggleTrack}
          onWeather={setWeatherOn}
          onAir={setAirOn}
          onForces={setForcesOn}
          onLeadership={setLeadershipOn}
          onReference={openReference}
          supplyRoutes={visibleSupplyRoutes}
          highwayOn={highwayOn}
          alsibOn={alsibOn}
          onHighway={setHighwayOn}
          onAlsib={setAlsibOn}
          onSupplyNote={selectSupply}
          onAllLayers={showAllLayers}
          motionOn={motionOn}
          onMotion={() => setMotionOn((on) => !on)}
        />
        <SidePanel
          period={period}
          locationId={visibleLocations.some((place) => place.id === locationId) ? locationId : null}
          event={selectedEvent}
          activeEvents={activeEvents}
          weatherNote={weatherOn ? selectedWeather : null}
          airSummary={airSummary}
          referenceOpen={referenceOpen}
          forces={visibleForces}
          selectedForceId={selectedForce?.id ?? null}
          onSelectEvent={selectEvent}
          onSelectForce={selectForce}
          supplyRoute={selectedSupplyRoute}
          onClose={() => {
            setLocationId(null);
            setEventId(null);
            setWeatherNoteId(null);
            setForceId(null);
            setReferenceOpen(false);
            setSupplyRouteId(null);
          }}
        />
      </div>
    </div>
  );
}
