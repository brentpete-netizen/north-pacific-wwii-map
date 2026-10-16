import type { ForceCategory, Kind, Side } from "../types.ts";

export type SymbolId =
  | "carrier"
  | "cruiser"
  | "destroyer"
  | "submarine"
  | "fighter"
  | "bomber"
  | "flyingboat"
  | "airfield"
  | "battle"
  | "intelligence"
  | "weather"
  | "flag";

export const PAPER = "#f3efe6";

export const SIDE_FILL: Record<Side, string> = {
  japan: "#7a332c",
  us: "#1e3a5f",
  both: "#1c1915",
};

const FIGHTERS = new Set(["a6m-zero", "a6m2n-rufe", "p-40"]);
const FLYING_BOATS = new Set(["pby"]);

interface SymbolSpec {
  w: number;
  h: number;
  body: (fill: string, stroke: string) => string;
}

function burst(fill: string, stroke: string): string {
  const cx = 14;
  const cy = 14;
  const outer = 11.4;
  const inner = 5.6;
  const points: string[] = [];
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI * i) / 8 - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return `<polygon points="${points.join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round"/>`;
}

const SPECS: Record<SymbolId, SymbolSpec> = {
  carrier: {
    w: 36,
    h: 22,
    body: (fill, stroke) =>
      `<path d="M2 13.2 L7.2 18.4 L30.2 18.4 L34.8 13.2 L32.2 11 L26.5 11 L26.5 6 L21.2 6 L21.2 11 L5.2 11 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round"/>`,
  },
  cruiser: {
    w: 36,
    h: 22,
    body: (fill, stroke) =>
      `<path d="M1.6 13.2 L6.6 18.6 L30.4 18.6 L35.2 12.4 L32.2 10.2 L24.8 10.2 L24.8 5 L21.2 5 L21.2 10.2 L16.8 10.2 L16.8 6.3 L13.4 6.3 L13.4 10.2 L5 10.2 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round"/>`,
  },
  destroyer: {
    w: 32,
    h: 16,
    body: (fill, stroke) =>
      `<path d="M1.4 9.4 L5.4 13.4 L27 13.4 L31 9 L28.4 7.4 L17.6 7.4 L17.6 3.8 L14.4 3.8 L14.4 7.4 L4 7.4 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round"/>`,
  },
  submarine: {
    w: 32,
    h: 14,
    body: (fill, stroke) =>
      `<path d="M2 8.4 L7.2 11.6 L26.2 11.6 L30.4 8.2 L27.4 7 L18.2 7 L18.2 3.6 L14 3.6 L14 7 L5.2 7 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round"/>`,
  },
  fighter: {
    w: 28,
    h: 28,
    body: (fill, stroke) =>
      `<path d="M14 1.2 L15.6 1.2 L16.4 9.6 L26.2 13.8 L26.2 16.6 L16.6 15.2 L17 21 L22.2 24 L22.2 26.2 L15.2 23.4 L14 22.6 L12.8 23.4 L5.8 26.2 L5.8 24 L11 21 L11.4 15.2 L1.8 16.6 L1.8 13.8 L11.6 9.6 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round"/>`,
  },
  bomber: {
    w: 28,
    h: 28,
    body: (fill, stroke) =>
      `<path d="M14 0.8 L15.8 0.8 L16.8 8 L27 11.8 L27 15 L16.8 13.4 L17.2 19.2 L23.2 21.4 L23.2 23.8 L16.6 21.8 L15.6 26.2 L12.4 26.2 L11.4 21.8 L4.8 23.8 L4.8 21.4 L10.8 19.2 L11.2 13.4 L1 15 L1 11.8 L11.2 8 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round"/>`,
  },
  flyingboat: {
    w: 28,
    h: 28,
    body: (fill, stroke) =>
      `<path d="M13.2 3 L14.8 3 L15.8 8.2 L26.4 10.4 L26.4 13.2 L16.2 12 L17.2 16.2 L21.4 18 L21.4 20 L16.4 18.4 L15.6 23.2 C15.2 25.6 12.8 25.6 12.4 23.2 L11.6 18.4 L6.6 20 L6.6 18 L10.8 16.2 L11.8 12 L1.6 13.2 L1.6 10.4 L12.2 8.2 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round"/>`,
  },
  airfield: {
    w: 28,
    h: 28,
    body: (fill, stroke) =>
      `<circle cx="14" cy="14" r="10.4" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/><rect x="5.2" y="12.35" width="17.6" height="3.3" fill="${stroke}"/>`,
  },
  battle: {
    w: 28,
    h: 28,
    body: burst,
  },
  intelligence: {
    w: 28,
    h: 28,
    body: (fill, stroke) =>
      `<polygon points="14,2.2 25.8,14 14,25.8 2.2,14" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/>`,
  },
  weather: {
    w: 22,
    h: 22,
    body: (fill, stroke) =>
      `<path d="M6.4 16.2 C4.1 16.2 2.8 14.6 2.8 12.8 C2.8 11 4.4 9.6 6.2 9.6 C6.5 7.1 8.6 5.4 11.1 5.4 C13.2 5.4 14.9 6.5 15.7 8.2 C16.2 8 16.8 7.9 17.4 7.9 C19.6 7.9 21.2 9.6 21.2 11.6 C21.2 13.7 19.4 15.4 17.2 15.6 L7.2 16.2 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round"/>`,
  },
  flag: {
    w: 22,
    h: 22,
    body: (fill, stroke) =>
      `<path d="M6.2 2 L8.4 2 L8.4 3.4 L19.4 7.6 L8.4 11.6 L8.4 20 L6.2 20 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round"/>`,
  },
};

export function symbolMarkup(
  id: SymbolId,
  fill: string,
  options?: { stroke?: string; scale?: number },
): { html: string; width: number; height: number } {
  const spec = SPECS[id];
  const scale = options?.scale ?? 1;
  const width = Math.round(spec.w * scale);
  const height = Math.round(spec.h * scale);
  const stroke = options?.stroke ?? PAPER;
  const html = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${spec.w} ${spec.h}" aria-hidden="true">${spec.body(fill, stroke)}</svg>`;
  return { html, width, height };
}

export function symbolForForce(unit: { id: string; category: ForceCategory; role: string }): SymbolId {
  if (unit.category === "commander") return "flag";
  if (unit.category === "carrier") return "carrier";
  if (unit.category === "ship") {
    const role = unit.role.toLowerCase();
    if (role.includes("destroyer")) return "destroyer";
    if (role.includes("submarine")) return "submarine";
    return "cruiser";
  }
  if (FLYING_BOATS.has(unit.id)) return "flyingboat";
  if (FIGHTERS.has(unit.id)) return "fighter";
  return "bomber";
}

export function symbolForKind(kind: Kind): SymbolId {
  if (kind === "base") return "airfield";
  if (kind === "intelligence") return "intelligence";
  return "battle";
}
