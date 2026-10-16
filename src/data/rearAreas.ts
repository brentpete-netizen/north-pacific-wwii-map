import type { ControlSpan, DateRange, Location } from "../types.ts";

const campaign: DateRange = { start: "1942-06-03", end: "1943-08-31" };
const fromJuly: DateRange = { start: "1942-07-01", end: "1943-08-31" };

function allied(start: string, end = campaign.end): ControlSpan[] {
  return [{ control: "allied", start, end }];
}

function other(start: string, end = campaign.end): ControlSpan[] {
  return [{ control: "other", start, end }];
}

const hubs: Location[] = [
  {
    id: "anchorage",
    name: "Anchorage / Elmendorf Field",
    lat: 61.25,
    lng: -149.81,
    region: "Cook Inlet, Alaska",
    summary:
      "Elmendorf Field, on the edge of Anchorage, was the main base of the Eleventh Air Force and the headquarters of the Alaska Defense Command under Maj. Gen. Simon B. Buckner. Buckner ran the defense of Alaska from here, and the Eleventh Air Force staged bombers and fighters through the field on their way west. After the Dutch Harbor raid the post became the rear hub for troops, fuel, and supplies bound for the Aleutians. The town grew quickly, from a small rail and port settlement into a wartime city built around the base. Anchorage was not attacked. It remained an Allied logistics center for the whole campaign.",
    facilities: "Elmendorf Field and the headquarters of the Alaska Defense Command.",
    dates: "An Allied rear base throughout 1942 and 1943.",
    kind: "base",
    side: "us",
    active: campaign,
    control: allied(campaign.start),
    omitFromFrame: true,
  },
  {
    id: "seattle",
    name: "Seattle",
    lat: 47.61,
    lng: -122.34,
    region: "Puget Sound, Washington",
    summary:
      "Seattle was the main Pacific Northwest port behind the Alaska theater. Troops, construction equipment, fuel, and crated aircraft left Puget Sound for Dutch Harbor, the new Aleutian airfields, and the stations along the Alaska Highway. The port tied the West Coast railroads to the ships that supplied Maj. Gen. Simon B. Buckner's command. It was a rear base, hundreds of miles from the fighting, and it was never a target of the Aleutian campaign. Seattle stayed in Allied hands throughout 1942 and 1943.",
    facilities: "The port of Seattle and the Puget Sound embarkation piers.",
    dates: "An Allied supply port throughout the campaign.",
    kind: "base",
    side: "us",
    active: campaign,
    control: allied(campaign.start),
    omitFromFrame: true,
  },
  {
    id: "san-francisco",
    name: "San Francisco / the Presidio",
    lat: 37.8,
    lng: -122.46,
    region: "San Francisco Bay, California",
    summary:
      "The Presidio of San Francisco was the headquarters of the Western Defense Command under Lt. Gen. John L. DeWitt. His command was responsible for the Pacific coast and shared in the defense of Alaska. Plans for the territory, orders moving troops north, and visits by senior officers passed through this headquarters. The port of San Francisco also fed men and cargo into the supply line that ran up the coast toward Puget Sound and Alaska. The Presidio was a command post and a logistics center, not a battlefield of the Aleutian campaign.",
    facilities: "Western Defense Command headquarters at the Presidio, and the port of San Francisco.",
    dates: "An Allied command center throughout the campaign.",
    kind: "base",
    side: "us",
    active: campaign,
    control: allied(campaign.start),
    omitFromFrame: true,
  },
];

const stops: Location[] = [
  {
    id: "ladd-field",
    name: "Ladd Field",
    lat: 64.84,
    lng: -147.61,
    region: "Fairbanks, Alaska",
    summary:
      "Ladd Field, at Fairbanks, was the main American transfer point on the Alaska–Siberia ferry route. U.S. pilots flew Lend-Lease aircraft up the Northwest Staging Route and handed them over here. Soviet crews then took the planes west. The field had heated hangars for the winter work, and it became one of the busiest Army air bases in Alaska. The transfer began in late 1942 and continued through the Aleutian campaign. Ladd was a rear-area ferry base, not a station in the fighting for Attu and Kiska.",
    facilities: "Ladd Field, the U.S. handoff point for Lend-Lease aircraft.",
    dates: "Ferry operations from late 1942 through the campaign.",
    kind: "base",
    side: "us",
    active: fromJuly,
    control: allied(fromJuly.start),
    omitFromFrame: true,
  },
  {
    id: "galena",
    name: "Galena",
    lat: 64.74,
    lng: -156.94,
    region: "Yukon River, Alaska",
    summary:
      "Galena was an Army airfield on the Yukon River, between Fairbanks and Nome. Ferry pilots used it as a fuel and weather stop on the way from Ladd Field to the Bering Sea. The strip sat in a long river valley that was often easier to find in poor weather than the coast. It had no role in the battles for the Aleutians. From late 1942 it was a link in the Alaska–Siberia delivery of Lend-Lease aircraft to Soviet crews.",
    facilities: "Galena Army Airfield, a fuel and weather stop on the Yukon.",
    dates: "In use on the ferry route from late 1942.",
    kind: "base",
    side: "us",
    active: fromJuly,
    control: allied(fromJuly.start),
    omitFromFrame: true,
  },
  {
    id: "marks-field",
    name: "Marks Field",
    lat: 64.51,
    lng: -165.45,
    region: "Nome, Alaska",
    summary:
      "Marks Field was the Army airfield at Nome, on the Seward Peninsula. It was the last major American stop before pilots crossed the Bering Strait. Aircraft that had come from Ladd Field by way of Galena refueled here, and many Soviet crews picked up planes at Nome as well as at Fairbanks. The field faced the weather of the strait and the short hop to Gambell and then to Uelkal. Nome was a ferry station for the wider war, not a base in the Aleutian fighting.",
    facilities: "Marks Field, the Nome airfield used for the Bering Strait crossing.",
    dates: "A ferry station from late 1942 through the campaign.",
    kind: "base",
    side: "us",
    active: fromJuly,
    control: allied(fromJuly.start),
    omitFromFrame: true,
  },
  {
    id: "gambell",
    name: "Gambell",
    lat: 63.78,
    lng: -171.73,
    region: "St. Lawrence Island, Alaska",
    summary:
      "Gambell, at the northwest tip of St. Lawrence Island, was a small American weather and emergency field on the Bering Strait crossing. Ferry aircraft stopped here, when the weather allowed, between Marks Field at Nome and the first Soviet field at Uelkal. The island sits in the middle of the strait, so a plane in trouble had one more place to land before Siberia. Gambell was a waypoint on the Lend-Lease ferry, not a combat base of the Aleutian campaign.",
    facilities: "A small weather and emergency field at Gambell.",
    dates: "Used on the ferry crossing from late 1942.",
    kind: "base",
    side: "us",
    active: fromJuly,
    control: allied(fromJuly.start),
    omitFromFrame: true,
  },
  {
    id: "uelkal",
    name: "Uelkal",
    lat: 65.53,
    lng: -179.28,
    region: "Chukotka, Siberia",
    summary:
      "Uelkal was the first Soviet airfield on the Alaska–Siberia route, on the Chukotka coast across the Bering Strait from Gambell. American pilots usually ended their delivery at Ladd Field or Nome. Soviet pilots flew the aircraft west from Alaska and landed at Uelkal to clear Soviet control. Crews often waited there for a break in the weather. From there the planes went on across Siberia. Uelkal was a Soviet ferry field, not part of the fighting for the Aleutian Islands.",
    facilities: "The Soviet ferry field at Uelkal, the first landing west of the strait.",
    dates: "The first Soviet stop on the ferry from late 1942.",
    kind: "base",
    side: "us",
    active: fromJuly,
    control: other(fromJuly.start),
    omitFromFrame: true,
  },
  {
    id: "seymchan",
    name: "Seymchan",
    lat: 62.93,
    lng: 152.39,
    region: "Kolyma, Siberia",
    summary:
      "Seymchan was a Soviet airfield in the Kolyma region, inland from the Chukotka coast. After Uelkal, ferry crews followed the route west through fields such as Seymchan on the way toward Yakutsk and Krasnoyarsk. The stop mattered because the distance across Siberia was too long for a single flight, and winter weather forced crews down at prepared strips. Seymchan was one of those Soviet way fields on the long run farther west. It had no part in the Aleutian campaign.",
    facilities: "A Soviet way field in the Kolyma region.",
    dates: "A ferry stop inland from Uelkal, from late 1942.",
    kind: "base",
    side: "us",
    active: fromJuly,
    control: other(fromJuly.start),
    omitFromFrame: true,
  },
  {
    id: "krasnoyarsk",
    name: "Krasnoyarsk",
    lat: 56.02,
    lng: 92.89,
    region: "Yenisey River, Siberia",
    summary:
      "Krasnoyarsk was the main Soviet terminus of the Alaska–Siberia ferry. Aircraft that had passed Ladd Field, Nome, Uelkal, and Seymchan, with Yakutsk and other fields in between, were received here and sent on into the Soviet air forces. The city lies on the Yenisey, thousands of miles from the Aleutians. The route existed to deliver Lend-Lease planes without a sea voyage through contested waters. Krasnoyarsk was the end of that ferry, not a base in the fighting for Attu and Kiska.",
    facilities: "The Soviet reception fields at Krasnoyarsk, the ferry terminus.",
    dates: "The main Soviet end of the route from late 1942 into 1945.",
    kind: "base",
    side: "us",
    active: fromJuly,
    control: other(fromJuly.start),
    omitFromFrame: true,
  },
];

export const alsibStopIds: ReadonlySet<string> = new Set(stops.map((stop) => stop.id));

export const rearAreas: Location[] = [...hubs, ...stops];
