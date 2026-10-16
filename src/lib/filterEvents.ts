import { periods } from "../data/periods.ts";
import type { CampaignEvent, Location, MarkerGroup, PeriodFilter } from "../types.ts";

export function eventsInPeriod(
  events: CampaignEvent[],
  period: PeriodFilter,
): CampaignEvent[] {
  if (period === "all") return events;
  return events.filter((event) => event.periodId === period);
}

export function locationsInPeriod(locations: Location[], period: PeriodFilter): Location[] {
  if (period === "all") return locations;
  const window = periods.find((item) => item.id === period);
  if (!window) return [];
  return locations.filter(
    (location) => location.active.start <= window.end && location.active.end >= window.start,
  );
}

export function groupByLocation(
  events: CampaignEvent[],
  locations: Location[],
): MarkerGroup[] {
  const byLocation = new Map<string, CampaignEvent[]>();
  for (const event of events) {
    const list = byLocation.get(event.locationId) ?? [];
    list.push(event);
    byLocation.set(event.locationId, list);
  }

  const groups: MarkerGroup[] = [];
  for (const location of locations) {
    const list = byLocation.get(location.id) ?? [];
    list.sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
    groups.push({ location, events: list });
  }
  return groups;
}
