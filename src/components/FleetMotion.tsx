import { divIcon, latLng, marker, polyline } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { MOTION_MS, isMotionTrack } from "../data/motion.ts";
import { tracks } from "../data/tracks.ts";
import { SIDE_FILL, symbolMarkup } from "../icons/symbols.ts";
import { toMapLng } from "../lib/longitude.ts";

const JAPAN = SIDE_FILL.japan;

interface MotionPath {
  points: ReturnType<typeof latLng>[];
  distances: number[];
  total: number;
}

function buildPath(coordinates: [number, number][]): MotionPath {
  const points = coordinates.map(([lat, lng]) => latLng(lat, toMapLng(lng)));
  const distances = [0];
  for (let index = 1; index < points.length; index += 1) {
    distances.push(distances[index - 1] + points[index - 1].distanceTo(points[index]));
  }
  return { points, distances, total: distances[distances.length - 1] || 1 };
}

function pointAt(path: MotionPath, progress: number) {
  const target = progress * path.total;
  let index = 1;
  while (index < path.distances.length && path.distances[index] < target) index += 1;
  const previous = index - 1;
  const span = path.distances[index] - path.distances[previous] || 1;
  const fraction = (target - path.distances[previous]) / span;
  const start = path.points[previous];
  const end = path.points[Math.min(index, path.points.length - 1)];
  return latLng(start.lat + (end.lat - start.lat) * fraction, start.lng + (end.lng - start.lng) * fraction);
}

function sliceAt(path: MotionPath, progress: number) {
  const head = pointAt(path, progress);
  const target = progress * path.total;
  const coords = [path.points[0]];
  let index = 1;
  while (index < path.distances.length && path.distances[index] < target) {
    coords.push(path.points[index]);
    index += 1;
  }
  coords.push(head);
  return coords;
}

export default function FleetMotion({ enabled }: { enabled: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (!enabled) return;
    if (!map.getPane("motion")) {
      const pane = map.createPane("motion");
      pane.style.zIndex = "360";
      pane.style.pointerEvents = "none";
    }

    const symbol = symbolMarkup("carrier", JAPAN);
    const icon = divIcon({
      className: "pin-icon",
      iconSize: [symbol.width, symbol.height],
      iconAnchor: [symbol.width / 2, symbol.height / 2],
      html: symbol.html,
    });

    const runners = tracks.filter((track) => isMotionTrack(track.id)).map((track) => {
      const path = buildPath(track.coordinates);
      const ghost = polyline(path.points, {
        pane: "motion",
        interactive: false,
        color: JAPAN,
        weight: 2,
        opacity: 0.28,
      }).addTo(map);
      const drawn = polyline([path.points[0], path.points[0]], {
        pane: "motion",
        interactive: false,
        color: JAPAN,
        weight: 2.5,
        opacity: 0.95,
      }).addTo(map);
      const ship = marker(path.points[0], {
        pane: "motion",
        icon,
        interactive: false,
        keyboard: false,
      }).addTo(map);
      return { path, ghost, drawn, ship };
    });

    let frame = 0;
    let start = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      const progress = ((now - start) % MOTION_MS) / MOTION_MS;
      for (const runner of runners) {
        runner.ship.setLatLng(pointAt(runner.path, progress));
        runner.drawn.setLatLngs(sliceAt(runner.path, progress));
      }
      frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        elapsed = (performance.now() - start) % MOTION_MS;
        return;
      }
      start = performance.now() - elapsed;
      frame = requestAnimationFrame(tick);
    };

    document.addEventListener("visibilitychange", onVisibility);
    if (!document.hidden) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const runner of runners) {
        runner.ghost.remove();
        runner.drawn.remove();
        runner.ship.remove();
      }
    };
  }, [enabled, map]);

  return null;
}
