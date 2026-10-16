import { useEffect } from "react";
import { locations } from "../data/locations.ts";
import { periods } from "../data/periods.ts";
import { controlForPeriod, controlLabel } from "../lib/control.ts";
import { formatRange } from "../lib/dates.ts";
import { unitImageSrc } from "../lib/unitImage.ts";
import type {
  CampaignEvent,
  ForceCategory,
  ForceUnit,
  PeriodFilter,
  SupplyRoute,
  WeatherNote,
} from "../types.ts";

interface SidePanelProps {
  period: PeriodFilter;
  locationId: string | null;
  event: CampaignEvent | null;
  activeEvents: CampaignEvent[];
  weatherNote: WeatherNote | null;
  airSummary: string | null;
  referenceOpen: boolean;
  forces: ForceUnit[];
  selectedForceId: string | null;
  onSelectEvent: (eventId: string) => void;
  onSelectForce: (id: string) => void;
  onClose: () => void;
  supplyRoute: SupplyRoute | null;
}

const SIDES = [
  { id: "japan", label: "Japan" },
  { id: "us", label: "United States" },
] as const;

const CATEGORIES: { id: ForceCategory; label: string; singular: string }[] = [
  { id: "carrier", label: "Carriers", singular: "Carrier" },
  { id: "ship", label: "Other ships", singular: "Other ship" },
  { id: "aircraft", label: "Aircraft", singular: "Aircraft" },
  { id: "commander", label: "Commanders", singular: "Commander" },
];

function sideLabel(side: ForceUnit["side"]): string {
  return side === "japan" ? "Japanese" : "United States";
}

function ForceReference({
  forces,
  selectedForceId,
  onSelectForce,
  onClose,
}: {
  forces: ForceUnit[];
  selectedForceId: string | null;
  onSelectForce: (id: string) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!selectedForceId) return;
    document.getElementById(`force-${selectedForceId}`)?.scrollIntoView({ block: "nearest" });
  }, [selectedForceId]);

  return (
    <article>
      <button type="button" className="panel-close" onClick={onClose}>
        Close
      </button>
      <p className="panel-kicker">Reference</p>
      <h2>Forces</h2>
      {forces.length === 0 ? (
        <p className="panel-summary">Turn on Forces or Leadership to list ships, aircraft, and commanders.</p>
      ) : (
        SIDES.map((side) => {
          const sideUnits = forces.filter((unit) => unit.side === side.id);
          if (sideUnits.length === 0) return null;
          return (
            <section key={side.id} className="force-side">
              <h3>{side.label}</h3>
              {CATEGORIES.map((category) => {
                const items = sideUnits.filter((unit) => unit.category === category.id);
                if (items.length === 0) return null;
                return (
                  <div key={category.id} className="force-group">
                    <h4>{category.label}</h4>
                    {items.map((unit) => (
                      <div
                        key={unit.id}
                        id={`force-${unit.id}`}
                        className={
                          unit.id === selectedForceId ? "force-entry force-entry-selected" : "force-entry"
                        }
                      >
                        <button type="button" onClick={() => onSelectForce(unit.id)}>
                          <span className="force-entry-name">{unit.name}</span>
                          <span className="force-entry-meta">
                            {category.singular} · {sideLabel(unit.side)}
                          </span>
                        </button>
                        {unit.image ? (
                          <img
                            className="unit-thumb"
                            src={unitImageSrc(unit.image)}
                            alt={unit.name}
                            width={168}
                            height={126}
                            decoding="async"
                            loading="lazy"
                          />
                        ) : null}
                        <p className="force-role">{unit.role}</p>
                        <p className="panel-summary">{unit.summary}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </section>
          );
        })
      )}
    </article>
  );
}

function emptyMessage(period: PeriodFilter): string {
  if (period === "june1942") return "Select a place. June 1942 is shown.";
  if (period === "all") return "Select a place. The full campaign is shown.";
  const label = periods.find((item) => item.id === period)?.label ?? "This period";
  return `Select a place. ${label} is shown.`;
}

export default function SidePanel({
  period,
  locationId,
  event,
  activeEvents,
  weatherNote,
  airSummary,
  referenceOpen,
  forces,
  selectedForceId,
  onSelectEvent,
  onSelectForce,
  onClose,
  supplyRoute,
}: SidePanelProps) {
  const location = locationId ? locations.find((item) => item.id === locationId) : undefined;
  const others =
    location === undefined
      ? []
      : activeEvents
          .filter((item) => item.locationId === location.id && item.id !== event?.id)
          .sort((a, b) => a.start.localeCompare(b.start));
  const halo = location ? controlForPeriod(location, period) : null;
  const status = controlLabel(halo);

  return (
    <aside className="panel" aria-live="polite">
      {supplyRoute ? (
        <article>
          <button type="button" className="panel-close" onClick={onClose}>
            Close
          </button>
          <p className="panel-kicker">Supply route</p>
          <h2>{supplyRoute.title}</h2>
          <p className="panel-summary">{supplyRoute.summary}</p>
        </article>
      ) : referenceOpen ? (
        <ForceReference
          forces={forces}
          selectedForceId={selectedForceId}
          onSelectForce={onSelectForce}
          onClose={onClose}
        />
      ) : weatherNote ? (
        <article>
          <button type="button" className="panel-close" onClick={onClose}>
            Close
          </button>
          <p className="panel-kicker">Weather</p>
          <h2>{weatherNote.title}</h2>
          <p className="panel-summary">{weatherNote.summary}</p>
        </article>
      ) : location ? (
        <article>
          <button type="button" className="panel-close" onClick={onClose}>
            Close
          </button>
          <p className="panel-kicker">{location.region}</p>
          <h2>{location.name}</h2>
          {status ? <p className={`control-line control-${halo}`}>{status}</p> : null}
          <p className="panel-summary">{location.summary}</p>
          <dl className="facts">
            <div>
              <dt>Facilities</dt>
              <dd>{location.facilities}</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd>{location.dates}</dd>
            </div>
          </dl>
          {airSummary ? (
            <div className="air-note">
              <h3>Air</h3>
              <p className="panel-summary">{airSummary}</p>
            </div>
          ) : null}
          {event ? (
            <div className="period-event">
              <h3>{event.title}</h3>
              <p className="panel-date">{formatRange(event.start, event.end)}</p>
              <p className="panel-summary">{event.summary}</p>
              <dl className="facts">
                {event.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          {others.length > 0 ? (
            <div className="also">
              <h4>Also at this place</h4>
              <ul>
                {others.map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => onSelectEvent(item.id)}>
                      <span>{item.title}</span>
                      <span className="also-date">{formatRange(item.start, item.end)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      ) : (
        <p className="panel-empty">{emptyMessage(period)}</p>
      )}
    </aside>
  );
}
