/**
 * Published longitudes west of the date line are negative, and Attu, Kiska,
 * and Amchitka are positive (east longitude). Leaflet would draw those on
 * the far edge of the world. For this theater only, shift eastern-hemisphere
 * longitudes west of −180 so the Aleutians stay one continuous chain.
 */
export function toMapLng(lng: number): number {
  return lng > 0 ? lng - 360 : lng;
}
