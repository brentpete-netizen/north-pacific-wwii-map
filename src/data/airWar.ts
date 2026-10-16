import type { AirNote, AirRoute } from "../types.ts";

const campaign = ["june1942", "late1942", "early1943", "summer1943"] as const;
const fromAdak = ["late1942", "early1943", "summer1943"] as const;
const fromAmchitka = ["early1943", "summer1943"] as const;

export const airNotes: AirNote[] = [
  {
    locationId: "dutch-harbor",
    periodIds: [...campaign],
    summary:
      "Dutch Harbor and Fort Mears were the naval section base the 3 and 4 June 1942 strikes were sent to hit. The harbor, oil tanks, and station ship were the targets. Turn on Raids under Movements to see the two Japanese paths and the fighter responses from Umnak and Cold Bay.",
  },
  {
    locationId: "umnak",
    periodIds: [...campaign],
    summary:
      "Fort Glenn at Otter Point was the secret fighter field just west of Unalaska. P-40s of the 11th Fighter Squadron flew from here against the 4 June raid. The field stayed a staging point as the air effort moved west. Turn on Raids under Movements to see that fighter path.",
  },
  {
    locationId: "cold-bay",
    periodIds: [...campaign],
    summary:
      "Fort Randall, on the Alaska Peninsula, was the other fighter field covering the Dutch Harbor raids. Its aircraft shared the 4 June interception with Umnak. The peninsula field also staged planes westward as new Aleutian strips opened. Turn on Raids under Movements to see that path.",
  },
  {
    locationId: "kiska",
    periodIds: [...campaign],
    summary:
      "Kiska harbor held a Japanese seaplane base for most of the occupation. Floatplane fighters and reconnaissance aircraft patrolled the chain from the water, and the base was a regular target once American bombers could reach it from Adak and then Amchitka. The planes were gone with the garrison at the end of July 1943.",
  },
  {
    locationId: "paramushiro",
    periodIds: [...campaign],
    summary:
      "Paramushiro, in the northern Kurils, was a Japanese land-plane base, not an Aleutian landing. Bombers and patrol aircraft staged there for the western Aleutians and for the supply of Attu and Kiska. The field stayed in Japanese hands for the whole campaign.",
  },
  {
    locationId: "adak",
    periodIds: [...fromAdak],
    summary:
      "Adak’s airfield opened at the end of August 1942 and gave the Eleventh Air Force its first field close enough for a sustained bombing campaign against Kiska. From September, bombers flew that run whenever fog and williwaws allowed. The field was the step west from Umnak and Cold Bay.",
  },
  {
    locationId: "amchitka",
    periodIds: [...fromAmchitka],
    summary:
      "Amchitka’s field, operating from January 1943, put American fighters and bombers a short flight from Kiska. The run was much shorter than the one from Adak, and it carried the main air attack on the island through the summer evacuation. Weather still cancelled as many missions as the enemy did.",
  },
];

export const airRoutes: AirRoute[] = [
  {
    id: "adak-kiska",
    title: "Adak strikes on Kiska",
    side: "us",
    periodIds: [...fromAdak],
    summary: "Eleventh Air Force bombers from Adak against Kiska, from September 1942.",
    coordinates: [
      [51.878, -176.645],
      [51.964, 177.545],
    ],
  },
  {
    id: "amchitka-kiska",
    title: "Amchitka strikes on Kiska",
    side: "us",
    periodIds: [...fromAmchitka],
    summary: "Fighters and bombers from Amchitka against Kiska, from January 1943.",
    coordinates: [
      [51.458, 179.258],
      [51.964, 177.545],
    ],
  },
  {
    id: "kiska-patrol",
    title: "Kiska floatplane patrol",
    side: "japan",
    periodIds: [...campaign],
    summary: "Japanese floatplanes from Kiska harbor, patrols over the chain during the occupation.",
    coordinates: [
      [51.964, 177.545],
      [54.2, 178.5],
    ],
  },
  {
    id: "paramushiro-patrol",
    title: "Paramushiro patrol",
    side: "japan",
    periodIds: [...campaign],
    summary: "Japanese land-based bombers and patrol planes from Paramushiro toward the western Aleutians.",
    coordinates: [
      [50.37, 155.95],
      [51.5, 165],
      [52.5, 172],
    ],
  },
];
