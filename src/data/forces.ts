import type { ForceUnit, PeriodId } from "../types.ts";

const june: PeriodId[] = ["june1942"];
const campaign: PeriodId[] = ["june1942", "late1942", "early1943", "summer1943"];
const fromAdak: PeriodId[] = ["late1942", "early1943", "summer1943"];

export const forces: ForceUnit[] = [
  {
    id: "ryujo",
    name: "Ryūjō",
    side: "japan",
    category: "carrier",
    periodIds: june,
    positions: [{ periodIds: june, lat: 51.2, lng: -168.8 }],
    role: "Light carrier, Second Mobile Force",
    summary:
      "Ryūjō flew Kakuta’s strike aircraft against Dutch Harbor on 3 and 4 June 1942. Fog turned much of the first strike back. The ship stayed south of the islands, hidden in the same weather, and did not close the harbor.",
  },
  {
    id: "junyo",
    name: "Jun’yō",
    side: "japan",
    category: "carrier",
    periodIds: june,
    positions: [{ periodIds: june, lat: 51.0, lng: -170.6 }],
    role: "Carrier, Second Mobile Force",
    summary:
      "Jun’yō sailed with Ryūjō in Kakuta’s carrier pair. Her aircraft joined the Dutch Harbor strikes on 3 and 4 June 1942. The two ships kept to the fog south of the chain and left after the second day’s attack.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    side: "us",
    category: "carrier",
    periodIds: june,
    positions: [{ periodIds: june, lat: 33.2, lng: -175.5 }],
    role: "Carrier, Task Force 16",
    summary:
      "Enterprise left Pearl Harbor on 28 May 1942 with Hornet under Spruance. The two carriers met Yorktown near Point Luck, north of Midway, before the 4 June battle. They were the American carrier reply to Nagumo, not a Dutch Harbor force.",
  },
  {
    id: "hornet",
    name: "Hornet",
    side: "us",
    category: "carrier",
    periodIds: june,
    positions: [{ periodIds: june, lat: 30.8, lng: -176.2 }],
    role: "Carrier, Task Force 16",
    summary:
      "Hornet sailed from Pearl Harbor with Enterprise on 28 May 1942. Her air group flew in the 4 June strike on Nagumo’s carriers from the rendezvous north of Midway. She had no role in the Aleutian raids.",
  },
  {
    id: "yorktown",
    name: "Yorktown",
    side: "us",
    category: "carrier",
    periodIds: june,
    positions: [{ periodIds: june, lat: 33.0, lng: -171.2 }],
    role: "Carrier, Task Force 17",
    summary:
      "Yorktown left Pearl Harbor on 30 May 1942 under Fletcher and joined Task Force 16 near Point Luck. Her aircraft struck Nagumo’s force on 4 June. Damage from that battle sank her two days later, far from the Aleutians.",
  },
  {
    id: "nachi",
    name: "Nachi",
    side: "japan",
    category: "ship",
    periodIds: ["june1942", "early1943"],
    positions: [
      { periodIds: june, lat: 49.5, lng: 168 },
      { periodIds: ["early1943"], lat: 55.1, lng: 165.5 },
    ],
    role: "Heavy cruiser, Fifth Fleet flagship",
    summary:
      "Nachi was Hosogaya’s flagship for the northern operation. In June 1942 she covered the move toward the western Aleutians. On 26 March 1943 she led the Komandorski fight against an American cruiser force and was the Japanese ship most heavily hit.",
  },
  {
    id: "abukuma",
    name: "Abukuma",
    side: "japan",
    category: "ship",
    periodIds: june,
    positions: [{ periodIds: june, lat: 50.4, lng: 174.2 }],
    role: "Light cruiser, Kiska invasion screen",
    summary:
      "Abukuma screened the transports that put Japanese troops ashore at Kiska on 6 June 1942. She was part of the invasion force’s close support, not one of Kakuta’s carriers. After the landing she did not stay as a harbor ship.",
  },
  {
    id: "salt-lake-city",
    name: "Salt Lake City",
    side: "us",
    category: "ship",
    periodIds: ["early1943"],
    positions: [{ periodIds: ["early1943"], lat: 51.2, lng: 171.2 }],
    role: "Heavy cruiser, Komandorski",
    summary:
      "Salt Lake City was the largest American ship in the 26 March 1943 fight south of the Komandorski Islands. She took hits that slowed her and nearly silenced her guns. The cruiser action still turned Hosogaya’s reinforcement convoy back from Attu.",
  },
  {
    id: "richmond",
    name: "Richmond",
    side: "us",
    category: "ship",
    periodIds: ["early1943"],
    positions: [{ periodIds: ["early1943"], lat: 51.5, lng: 166.8 }],
    role: "Light cruiser, Komandorski",
    summary:
      "Richmond fought beside Salt Lake City on 26 March 1943. The smaller cruiser and the destroyers kept firing after Salt Lake City was damaged. Together they blocked the Japanese convoy that was trying to reach the Attu garrison.",
  },
  {
    id: "a6m-zero",
    name: "A6M Zero",
    side: "japan",
    category: "aircraft",
    periodIds: june,
    positions: [{ periodIds: june, lat: 50.6, lng: -167.6 }],
    role: "Carrier fighter, Dutch Harbor strike",
    summary:
      "A6M Zeros flew escort for Kakuta’s 3 and 4 June 1942 strikes on Dutch Harbor. Most of the first wave turned back in fog. A Zero from Ryūjō later crash-landed at Akutan, and the recovered fighter became an American test aircraft.",
  },
  {
    id: "d3a-val",
    name: "D3A Val",
    side: "japan",
    category: "aircraft",
    periodIds: june,
    positions: [{ periodIds: june, lat: 50.4, lng: -169.4 }],
    role: "Carrier dive bomber, Dutch Harbor strike",
    summary:
      "D3A Vals were the dive bombers in Kakuta’s strikes on Dutch Harbor. On 4 June, when the weather opened, they hit the harbor, radio station, and fuel tanks. They flew from Ryūjō and Jun’yō and returned to the carriers in the fog.",
  },
  {
    id: "b5n-kate",
    name: "B5N Kate",
    side: "japan",
    category: "aircraft",
    periodIds: june,
    positions: [{ periodIds: june, lat: 50.8, lng: -171.4 }],
    role: "Carrier attack plane, Dutch Harbor strike",
    summary:
      "B5N Kates flew as level bombers and torpedo aircraft from Ryūjō and Jun’yō. On 3 and 4 June 1942 they were part of the Dutch Harbor strike, alongside the Vals. Fog cut the first attack short before many of them reached the harbor.",
  },
  {
    id: "a6m2n-rufe",
    name: "A6M2-N Rufe",
    side: "japan",
    category: "aircraft",
    periodIds: campaign,
    positions: [{ periodIds: campaign, lat: 54.2, lng: 179.5 }],
    role: "Floatplane fighter, Kiska harbor",
    summary:
      "A6M2-N Rufes flew from the seaplane base in Kiska harbor during the occupation. They patrolled the western Aleutians and met American bombers once Adak, then Amchitka, could reach the island. The floatplanes left with the garrison at the end of July 1943.",
  },
  {
    id: "g3m-nell",
    name: "G3M Nell",
    side: "japan",
    category: "aircraft",
    periodIds: campaign,
    positions: [{ periodIds: campaign, lat: 52.2, lng: 158.8 }],
    role: "Land-based bomber, Paramushiro",
    summary:
      "G3M Nells flew from Paramushiro, the northern Kuril base, through the whole campaign. They patrolled toward the western Aleutians and supported the garrisons at Attu and Kiska. Paramushiro was a land-plane field, not an island the Japanese took in the Aleutians.",
  },
  {
    id: "p-40",
    name: "P-40 Warhawk",
    side: "us",
    category: "aircraft",
    periodIds: june,
    positions: [{ periodIds: june, lat: 51.5, lng: -166.6 }],
    role: "Army fighter, Fort Glenn",
    summary:
      "P-40s of the Eleventh Air Force were based at the secret field on Umnak, Fort Glenn. On 4 June 1942 they met Kakuta’s second strike as it left Dutch Harbor. The Japanese carriers had not known the fighters were there.",
  },
  {
    id: "pby",
    name: "PBY Catalina",
    side: "us",
    category: "aircraft",
    periodIds: june,
    positions: [{ periodIds: june, lat: 55.2, lng: -169.8 }],
    role: "Patrol bomber, Dutch Harbor and the search",
    summary:
      "PBY Catalinas flew the long patrols from Dutch Harbor and from Midway. In the first days of June 1942 they searched for both Kakuta’s carriers and Nagumo’s force. A Midway Catalina also sighted the Japanese occupation transports on 3 June.",
  },
  {
    id: "b-17",
    name: "B-17 Flying Fortress",
    side: "us",
    category: "aircraft",
    periodIds: june,
    positions: [{ periodIds: june, lat: 57.0, lng: -160.5 }],
    role: "Army bomber, Cold Bay",
    summary:
      "B-17s of the Eleventh Air Force operated from Cold Bay and Umnak during the June 1942 raids. They searched for Kakuta’s ships and bombed when weather allowed. Fog and range kept most of those attacks from hitting the carriers.",
  },
  {
    id: "b-24",
    name: "B-24 Liberator",
    side: "us",
    category: "aircraft",
    periodIds: fromAdak,
    positions: [{ periodIds: fromAdak, lat: 53.7, lng: -174.5 }],
    role: "Army bomber, Adak",
    summary:
      "B-24s of the Eleventh Air Force flew against Kiska from Adak beginning in September 1942. Amchitka later shortened the trip. Williwaws and fog cancelled as many missions as Japanese fire did. The bombers kept at the island until the garrison left.",
  },
  {
    id: "kakuta",
    name: "Kakuji Kakuta",
    side: "japan",
    category: "commander",
    periodIds: june,
    positions: [{ periodIds: june, lat: 51.7, lng: -170.0 }],
    role: "Second Mobile Force",
    summary:
      "Rear Admiral Kakuji Kakuta commanded Ryūjō and Jun’yō for the Dutch Harbor raids. He launched on 3 June into fog that turned much of the strike back, then launched again on 4 June when the weather let the attack through. His carriers stayed hidden offshore.",
  },
  {
    id: "hosogaya",
    name: "Boshirō Hosogaya",
    side: "japan",
    category: "commander",
    periodIds: ["june1942", "early1943"],
    positions: [
      { periodIds: june, lat: 49.0, lng: 170.2 },
      { periodIds: ["early1943"], lat: 55.4, lng: 169.8 },
    ],
    role: "Fifth Fleet",
    summary:
      "Vice Admiral Boshirō Hosogaya commanded the Fifth Fleet, the Japanese northern force. In June 1942 his ships covered the landings at Kiska and Attu. On 26 March 1943 he met the American cruisers off the Komandorskis, broke off, and was relieved of the command.",
  },
  {
    id: "theobald",
    name: "Robert A. Theobald",
    side: "us",
    category: "commander",
    periodIds: ["june1942", "late1942"],
    positions: [{ periodIds: ["june1942", "late1942"], lat: 56.3, lng: -167.6 }],
    role: "North Pacific Force",
    summary:
      "Rear Admiral Robert A. Theobald commanded the North Pacific Force, Task Force 8, when the Dutch Harbor raid hit. His ships and the Eleventh Air Force did not catch Kakuta’s carriers in the fog. He kept the command until Kinkaid relieved him in January 1943.",
  },
  {
    id: "buckner",
    name: "Simon Bolivar Buckner Jr.",
    side: "us",
    category: "commander",
    periodIds: campaign,
    positions: [{ periodIds: campaign, lat: 59.6, lng: -149.8 }],
    role: "Alaska Defense Command",
    summary:
      "Major General Simon Bolivar Buckner Jr. commanded the Army in Alaska, including the Eleventh Air Force’s bases. He pushed the airfields at Adak and Amchitka that made the bombing of Kiska possible. He remained the Army commander in the theater through the Kiska landing.",
  },
  {
    id: "kinkaid",
    name: "Thomas C. Kinkaid",
    side: "us",
    category: "commander",
    periodIds: ["early1943", "summer1943"],
    positions: [{ periodIds: ["early1943", "summer1943"], lat: 53.9, lng: -177.9 }],
    role: "North Pacific Force",
    summary:
      "Rear Admiral Thomas C. Kinkaid took command of the North Pacific Force from Theobald in January 1943. He directed the naval side of the Attu landing in May and the unopposed landing on Kiska in August. Adak was his advanced base for those operations.",
  },
  {
    id: "yamasaki",
    name: "Yasuyo Yamasaki",
    side: "japan",
    category: "commander",
    periodIds: fromAdak,
    positions: [{ periodIds: fromAdak, lat: 55.0, lng: 171.0 }],
    role: "Attu garrison",
    summary:
      "Colonel Yasuyo Yamasaki commanded the Japanese army garrison on Attu. His troops held the island from the June 1942 landing until the American assault in May 1943. He was killed in the last counterattack, and the garrison was destroyed.",
  },
  {
    id: "kawase",
    name: "Shirō Kawase",
    side: "japan",
    category: "commander",
    periodIds: ["summer1943"],
    positions: [{ periodIds: ["summer1943"], lat: 54.1, lng: 176.6 }],
    role: "Fifth Fleet, Kiska evacuation",
    summary:
      "Vice Admiral Shirō Kawase succeeded Hosogaya in command of the Fifth Fleet after Komandorski. In late July 1943 he sent the evacuation force into Kiska under fog. The garrison was gone before the American landing on 15 August.",
  },
];
