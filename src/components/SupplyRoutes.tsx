import { useEffect, useState, type ReactNode } from "react";
import { Polyline, useMap } from "react-leaflet";
import { toMapLng } from "../lib/longitude.ts";
import type { SupplyRoute, SupplyRouteId } from "../types.ts";

const STYLE: Record<SupplyRouteId, { color: string; dashArray?: string }> = {
  "alaska-highway": { color: "#8a7348" },
  alsib: { color: "#3d6b78", dashArray: "8 6" },
};

function SupplyPane({ children }: { children: ReactNode }) {
  const map = useMap();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!map.getPane("supply")) {
      const pane = map.createPane("supply");
      pane.style.zIndex = "330";
      pane.style.pointerEvents = "none";
    }
    setReady(true);
  }, [map]);

  if (!ready) return null;
  return children;
}

export default function SupplyRoutes({ routes }: { routes: SupplyRoute[] }) {
  return (
    <SupplyPane>
      {routes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.coordinates.map(([lat, lng]) => [lat, toMapLng(lng)] as [number, number])}
          pane="supply"
          interactive={false}
          pathOptions={{
            color: STYLE[route.id].color,
            weight: 2,
            opacity: 0.75,
            dashArray: STYLE[route.id].dashArray,
          }}
        />
      ))}
    </SupplyPane>
  );
}
