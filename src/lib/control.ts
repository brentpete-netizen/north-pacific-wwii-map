import { periods } from "../data/periods.ts";
import type { Halo, Location, PeriodFilter } from "../types.ts";

export function controlForPeriod(location: Location, period: PeriodFilter): Halo | null {
  const spans = location.control;
  if (!spans || spans.length === 0) return null;

  if (period === "all") {
    const kinds = new Set(spans.map((span) => span.control));
    return kinds.size > 1 ? "changed" : spans[0].control;
  }

  const window = periods.find((item) => item.id === period);
  if (!window) return null;
  const span = spans.find((item) => item.start <= window.end && window.end <= item.end);
  return span?.control ?? null;
}

export function controlLabel(halo: Halo | null): string | null {
  switch (halo) {
    case "allied":
      return "Allied control";
    case "japanese":
      return "Japanese occupied";
    case "other":
      return "Other";
    case "changed":
      return "Changed hands";
    default:
      return null;
  }
}
