import { periods } from "../data/periods.ts";
import type { PeriodFilter } from "../types.ts";

interface TimelineProps {
  period: PeriodFilter;
  onChange: (period: PeriodFilter) => void;
}

export default function Timeline({ period, onChange }: TimelineProps) {
  return (
    <div className="timeline" role="toolbar" aria-label="Campaign period">
      {periods.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === "june1942" ? "chip chip-primary" : "chip"}
          aria-pressed={period === item.id}
          aria-label={`${item.label}, ${item.range}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
      <button
        type="button"
        className="chip"
        aria-pressed={period === "all"}
        aria-label="All, June 1942 through August 1943"
        onClick={() => onChange("all")}
      >
        All
      </button>
    </div>
  );
}
