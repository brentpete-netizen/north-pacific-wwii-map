export const MOTION_TRACK_IDS = ["kakuta-approach", "nagumo-approach"] as const;

export const MOTION_MS = 12_000;

export function isMotionTrack(id: string): boolean {
  return (MOTION_TRACK_IDS as readonly string[]).includes(id);
}
