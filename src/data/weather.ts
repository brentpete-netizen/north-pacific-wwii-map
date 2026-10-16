import type { WeatherNote } from "../types.ts";

/** Bering Sea band north of the Aleutian pins. Geographic [lat, lng], shifted only when drawn. */
export const weatherBand: [number, number][] = [
  [54.2, 172],
  [55.2, 180],
  [56.4, -175],
  [56.2, -164],
  [58.8, -164],
  [59, -175],
  [59.2, 180],
  [59, 172],
];

export const weatherNotes: WeatherNote[] = [
  {
    id: "dutch-harbor-weather",
    title: "Fog and the Dutch Harbor raids",
    lat: 56.5,
    lng: -166.5,
    periodIds: ["june1942"],
    summary:
      "Fog and low cloud covered the Bering Sea and the Aleutian passes in the first days of June 1942. On 3 June much of Kakuta’s strike from Ryūjō and Jun’yō turned back before it reached Dutch Harbor. The next day the weather opened enough for a fuller strike, and P-40s from the secret field on Umnak rose to meet it. The carriers themselves stayed in the fog south of the chain, hidden from American search.",
  },
  {
    id: "aleutian-flying-weather",
    title: "Williwaws and the Aleutian fields",
    lat: 55.8,
    lng: -176.6,
    periodIds: ["late1942", "early1943", "summer1943"],
    summary:
      "Williwaws, the sudden violent winds of Aleutian harbors and passes, and the summer fog grounded aircraft as often as any Japanese defense. Adak’s bombers flew against Kiska from September 1942, and Amchitka’s from early 1943, in the gaps between storms. The same weather covered the March 1943 fight south of the Komandorski Islands, where the ships lost sight of one another in snow and fog.",
  },
  {
    id: "kiska-fog",
    title: "Fog over the Kiska evacuation",
    lat: 54.6,
    lng: 177.5,
    periodIds: ["summer1943"],
    summary:
      "On 28 July 1943 fog lay over Kiska while the Japanese garrison left by sea. American aircraft and ships did not see the evacuation. When the landing force came ashore on 15 August, the island was empty and no battle was fought on the beaches. The same Bering Sea fog that had hidden the carriers in June now hid the end of the occupation.",
  },
];
