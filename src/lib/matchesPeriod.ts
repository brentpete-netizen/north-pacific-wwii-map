import type { PeriodFilter, PeriodId } from "../types.ts";

export function matchesPeriod(periodIds: readonly PeriodId[], period: PeriodFilter): boolean {
  return period === "all" || periodIds.includes(period);
}
