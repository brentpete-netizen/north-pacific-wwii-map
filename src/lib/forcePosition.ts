import type { ForcePosition, ForceUnit, PeriodFilter } from "../types.ts";
import { matchesPeriod } from "./matchesPeriod.ts";

export function forcePosition(unit: ForceUnit, period: PeriodFilter): ForcePosition | null {
  if (!matchesPeriod(unit.periodIds, period)) return null;
  if (period === "all") return unit.positions[0] ?? null;
  return unit.positions.find((item) => item.periodIds.includes(period)) ?? null;
}
