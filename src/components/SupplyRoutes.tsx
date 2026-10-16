import { Fragment, useEffect, useState, type ReactNode } from "react";
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

export default function SupplyRoutes({
  routes,
  onSelect,
}: {
  routes: SupplyRoute[];
  onSelect: (id: SupplyRouteId) => void;
}) {
  return (
    <SupplyPane>
      {routes.map((route) => {
        const positions = route.coordinates.map(([lat, lng]) => [lat, toMapLng(lng)] as [number, number]);
        return (
          <Fragment key={route.id}>
            <Polyline
              positions={positions}
              pane="supply"
              interactive={false}
              pathOptions={{
                color: STYLE[route.id].color,
                weight: 2,
                opacity: 0.75,
                dashArray: STYLE[route.id].dashArray,
              }}
            />
            <Polyline
              positions={positions}
              pane="supply"
              interactive
              eventHandlers={{
                add: (event) => {
                  const element = event.target.getElement();
                  if (!element) return;
                  element.style.pointerEvents = "stroke";
                  element.style.cursor = "pointer";
                },
                click: () => onSelect(route.id),
              }}
              pathOptions={{
                color: STYLE[route.id].color,
                weight: 14,
                opacity: 0,
              }}
            />
          </Fragment>
        );
      })}
    </SupplyPane>
  );
}
