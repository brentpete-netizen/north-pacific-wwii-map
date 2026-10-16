export type Side = "japan" | "us" | "both";
export type Kind = "battle" | "base" | "intelligence";
export type PeriodId = "june1942" | "late1942" | "early1943" | "summer1943";
export type PeriodFilter = PeriodId | "all";
export type ViewMode = "theater" | "aleutians";
export type ControlId = "allied" | "japanese" | "other";
export type Halo = ControlId | "changed";
export type LayerKind = "movement" | "weather" | "units" | "leadership";

export interface ControlSpan {
  control: ControlId;
  start: string;
  end: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  summary: string;
  facilities: string;
  dates: string;
  kind: Kind;
  side: Side;
  active: DateRange;
  control?: ControlSpan[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface CampaignEvent {
  id: string;
  locationId: string;
  title: string;
  start: string;
  end: string;
  periodId: PeriodId;
  side: Side;
  kind: Kind;
  summary: string;
  facts: Fact[];
  sources: string;
}

export interface Period {
  id: PeriodId;
  label: string;
  range: string;
  start: string;
  end: string;
}

export interface MarkerGroup {
  location: Location;
  events: CampaignEvent[];
}

/** Unused. Units and leadership are not rendered. */
export interface CampaignLayer {
  id: string;
  kind: LayerKind;
  title: string;
  periodIds: PeriodId[];
}

export type TrackKind = "fleet" | "air";
export type TrackWindowId = "approach" | "raids" | "landings";
export type MovementWindow = TrackWindowId | "off" | "all";

export interface Track {
  id: string;
  title: string;
  side: "japan" | "us";
  kind: TrackKind;
  window: TrackWindowId;
  start: string;
  end: string;
  summary: string;
  coordinates: [number, number][];
}

export interface WeatherNote {
  id: string;
  title: string;
  lat: number;
  lng: number;
  periodIds: PeriodId[];
  summary: string;
}

export interface AirNote {
  locationId: string;
  periodIds: PeriodId[];
  summary: string;
}

export interface AirRoute {
  id: string;
  title: string;
  side: "japan" | "us";
  periodIds: PeriodId[];
  summary: string;
  coordinates: [number, number][];
}

export type ForceCategory = "carrier" | "ship" | "aircraft" | "commander";

export interface ForcePosition {
  periodIds: PeriodId[];
  lat: number;
  lng: number;
}

export interface ForceUnit {
  id: string;
  name: string;
  side: "japan" | "us";
  category: ForceCategory;
  periodIds: PeriodId[];
  positions: ForcePosition[];
  role: string;
  summary: string;
}

export type SupplyRouteId = "alaska-highway" | "alsib";

export interface SupplyRoute {
  id: SupplyRouteId;
  title: string;
  periodIds: PeriodId[];
  summary: string;
  coordinates: [number, number][];
}
