import type { PeriodId, SupplyRoute } from "../types.ts";

const campaign: PeriodId[] = ["june1942", "late1942", "early1943", "summer1943"];
const fromLate1942: PeriodId[] = ["late1942", "early1943", "summer1943"];

export const supplyRoutes: SupplyRoute[] = [
  {
    id: "alaska-highway",
    title: "Alaska Highway",
    periodIds: campaign,
    summary:
      "The Alaska Highway was authorized early in 1942 and construction began that spring, running from Dawson Creek, British Columbia, toward Delta Junction, Alaska. Crews pushed the pioneer road through Fort St. John, Fort Nelson, Watson Lake, and Whitehorse. Army engineers and civilian contractors worked from both ends. The Dutch Harbor raid in June hurried the work, and by late October 1942 a rough road linked the Northwest Staging Route airfields and gave the Alaska theater an overland supply line. This was a supporting effort for the wider war, not part of the Aleutian fighting.",
    coordinates: [
      [55.759, -120.235],
      [56.252, -120.847],
      [58.805, -122.697],
      [60.063, -128.706],
      [60.721, -135.057],
      [64.038, -145.732],
    ],
  },
  {
    id: "alsib",
    title: "Alaska–Siberia route",
    periodIds: fromLate1942,
    summary:
      "From late 1942, American pilots ferried Lend-Lease aircraft north along the Northwest Staging Route to Ladd Field at Fairbanks. Soviet pilots took the planes over in Alaska and flew them west through Galena, Marks Field at Nome, and Gambell, then to Uelkal, Seymchan, and on past Yakutsk to Krasnoyarsk. About 7,900 or more combat and transport aircraft went to the Soviet Union this way, mostly from 1942 into 1945. The route moved aircraft without sending them by sea through contested waters. This was a supporting effort for the wider war, not part of the Aleutian fighting.",
    coordinates: [
      [56.602, -120.847],
      [59.155, -122.697],
      [60.413, -128.706],
      [61.071, -135.057],
      [64.84, -147.61],
      [64.74, -156.94],
      [64.51, -165.45],
      [63.78, -171.73],
      [65.53, -179.28],
      [62.93, 152.39],
      [62.03, 129.73],
      [56.02, 92.89],
    ],
  },
];
