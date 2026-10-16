import type { MovementWindow, Track } from "../types.ts";

export function tracksInWindow(
  source: Track[],
  window: MovementWindow,
  hiddenIds: readonly string[],
): Track[] {
  if (window === "off") return [];
  return source.filter((track) => {
    if (window !== "all" && track.window !== window) return false;
    return !hiddenIds.includes(track.id);
  });
}

export function tracksForWindow(source: Track[], window: MovementWindow): Track[] {
  if (window === "off") return [];
  if (window === "all") return source;
  return source.filter((track) => track.window === window);
}
