import type { CampaignEvent } from "../types.ts";

const morisonAleutians =
  "Samuel Eliot Morison, History of United States Naval Operations in World War II, Vol. VII: Aleutians, Gilberts and Marshalls.";
const morisonMidway =
  "Samuel Eliot Morison, History of United States Naval Operations in World War II, Vol. IV: Coral Sea, Midway and Submarine Actions.";
const army =
  "Stetson Conn, Rose C. Engelman, and Byron Fairchild, Guarding the United States and Its Outposts (United States Army in World War II: The Western Hemisphere).";
const nhc = "Naval History and Heritage Command, Aleutian Islands campaign narratives.";

export const events: CampaignEvent[] = [
  {
    id: "dutch-harbor",
    locationId: "dutch-harbor",
    title: "Raid on Dutch Harbor",
    start: "1942-06-03",
    end: "1942-06-04",
    periodId: "june1942",
    side: "japan",
    kind: "battle",
    summary:
      "On 3 and 4 June 1942, carrier aircraft struck the American base at Dutch Harbor, on Unalaska Island in the eastern Aleutians. The raid opened Japan’s northern operation, timed to run with the attack on Midway. Rear Admiral Kakuji Kakuta led the Second Carrier Striking Force, the carriers Ryūjō and Jun’yō, under Vice Admiral Boshirō Hosogaya’s Northern Force. On 3 June bombs hit Fort Mears, the radio station, and fuel tanks. The next day the station ship Northwestern was set afire and burned out at the pier. About forty-three Americans were killed. The base was damaged and stayed in service. Army fighters from a secret field at Fort Glenn, on Umnak Island, met the second raid. Japan had not known that field existed. Kakuta then turned west to cover the landings on Kiska and Attu. Dutch Harbor remained an American base for the rest of the Aleutian campaign.",
    facts: [
      { label: "Dates", value: "3–4 June 1942" },
      {
        label: "Commanders",
        value: "Rear Adm. Kakuji Kakuta; Vice Adm. Boshirō Hosogaya",
      },
      {
        label: "Ships / units",
        value:
          "Carriers Ryūjō and Jun’yō; U.S. Navy and Army installations at Dutch Harbor; P-40 fighters from Fort Glenn, Umnak",
      },
      {
        label: "Outcome",
        value:
          "Base damaged and about 43 Americans killed. Dutch Harbor stayed in American hands and in service.",
      },
    ],
    sources: `${morisonAleutians} ${nhc}`,
  },
  {
    id: "midway",
    locationId: "midway",
    title: "Battle of Midway",
    start: "1942-06-04",
    end: "1942-06-07",
    periodId: "june1942",
    side: "both",
    kind: "battle",
    summary:
      "From 4 to 7 June 1942 the decisive carrier battle of the Pacific war was fought in the waters northwest of Midway Atoll. The marker on this map sits on the atoll. The ships fought at sea, to the northwest. Admiral Isoroku Yamamoto commanded the Japanese operation. Vice Admiral Chūichi Nagumo led its carrier striking force: Akagi, Kaga, Sōryū, and Hiryū. All four carriers were sunk. Admiral Chester W. Nimitz directed the American defense. Rear Admiral Frank Jack Fletcher, in Yorktown, and Rear Admiral Raymond A. Spruance, with Enterprise and Hornet, fought the action. On 7 June the submarine I-168 sank Yorktown, and the destroyer Hammann was lost with her. Japan’s move into the Aleutians went forward at the same time, a northern operation alongside Midway, and it did not change the result. The loss of the four carriers stopped Japanese expansion across the central Pacific.",
    facts: [
      { label: "Dates", value: "4–7 June 1942" },
      {
        label: "Commanders",
        value:
          "Adm. Isoroku Yamamoto; Vice Adm. Chūichi Nagumo; Adm. Chester W. Nimitz; Rear Adm. Frank Jack Fletcher; Rear Adm. Raymond A. Spruance",
      },
      {
        label: "Ships / units",
        value:
          "Japanese carriers Akagi, Kaga, Sōryū, and Hiryū; U.S. carriers Yorktown, Enterprise, and Hornet; destroyer Hammann",
      },
      {
        label: "Outcome",
        value:
          "All four Japanese carriers sunk. Yorktown and Hammann lost. Midway remained in American hands.",
      },
    ],
    sources: `${morisonMidway} ${nhc}`,
  },
  {
    id: "kiska-occupation",
    locationId: "kiska",
    title: "Occupation of Kiska",
    start: "1942-06-06",
    end: "1942-06-07",
    periodId: "june1942",
    side: "japan",
    kind: "battle",
    summary:
      "On 6 and 7 June 1942 a Japanese Special Naval Landing Force of about five hundred men came ashore on Kiska, near the western end of the Aleutian chain. No American combat unit held the island. The only garrison was a Navy weather detachment of ten men, and they were captured. The landing belonged to the same northern operation that had just struck Dutch Harbor. Japan meant to take the outer Aleutians while the main carrier battle was fought at Midway. Kiska offered a harbor, and the occupation turned it into a garrison and a seaplane base on American territory. Through the following winter the Japanese held the island under fog, wind, and infrequent supply runs. American bombers would spend the next year attacking it from fields built steadily closer, at Adak and then at Amchitka. The garrison’s war ended in July 1943, when the men were taken off by sea.",
    facts: [
      { label: "Dates", value: "6–7 June 1942" },
      { label: "Commanders", value: "Japanese Special Naval Landing Force" },
      {
        label: "Ships / units",
        value:
          "Special Naval Landing Force, about 500 men; U.S. Navy weather detachment of 10 men",
      },
      {
        label: "Outcome",
        value: "Kiska occupied. The weather detachment was captured. No landing battle was fought.",
      },
    ],
    sources: `${morisonAleutians} ${army}`,
  },
  {
    id: "attu-occupation",
    locationId: "attu",
    title: "Occupation of Attu",
    start: "1942-06-07",
    end: "1942-06-07",
    periodId: "june1942",
    side: "japan",
    kind: "battle",
    summary:
      "Japanese troops landed at Holtz Bay on Attu on 7 June 1942, a day after the landing on Kiska. Major Matsutoshi Hozumi’s North Sea Detachment, an Army force of about 1,140 men built around the 301st Independent Infantry Battalion, came ashore without a fight. A small American weather crew was captured. Attu is the westernmost island of the Aleutians, and with Kiska it marked the farthest Japanese occupation of American territory in the war. The Unangax̂ residents of Attu village were later removed to Japan. Forty-two people were taken to Hokkaido. Many died in captivity before the survivors came home after the war. Through the winter of 1942–43 the garrison held the island in deep cold, supplied by sea when weather and American naval patrols allowed it. In May 1943 the United States sent a division to take the island back, ridge by ridge.",
    facts: [
      { label: "Dates", value: "7 June 1942" },
      { label: "Commanders", value: "Maj. Matsutoshi Hozumi" },
      {
        label: "Ships / units",
        value:
          "North Sea Detachment, about 1,140 men; 301st Independent Infantry Battalion",
      },
      {
        label: "Outcome",
        value:
          "Attu occupied and the weather crew captured. The village’s Unangax̂ residents were later removed to Japan.",
      },
    ],
    sources: `${morisonAleutians} ${army} National Park Service, Aleutian World War II.`,
  },
  {
    id: "akutan-zero",
    locationId: "akutan",
    title: "The Akutan Zero",
    start: "1942-06-04",
    end: "1942-07-15",
    periodId: "late1942",
    side: "us",
    kind: "intelligence",
    summary:
      "During the second raid on Dutch Harbor, on 4 June 1942, a Mitsubishi A6M2 Zero flown by Petty Officer Tadayoshi Koga was hit and left the fight. Koga tried to land on Akutan Island, just east of Unalaska, on ground that looked firm from the air. It was muskeg. The wheels dug in, the fighter flipped onto its back, and Koga was killed. The aircraft stayed in the bog, largely intact, until a U.S. Navy patrol plane sighted it on 10 July. Salvage crews recovered the Zero later that month and the Navy shipped it south, restored it, and flew it that autumn. American pilots learned how the fighter handled: very dangerous in a slow turning fight, and much less so when forced into a high-speed roll. The Akutan Zero was the first flyable example of the type to reach American hands. It came out of the Dutch Harbor raid, and the recovery is why this entry sits with the late summer of 1942.",
    facts: [
      { label: "Dates", value: "Crash 4 June 1942; recovered 10–15 July 1942" },
      { label: "Commanders", value: "Petty Officer Tadayoshi Koga" },
      {
        label: "Ships / units",
        value: "Mitsubishi A6M2 Zero from the carrier Ryūjō; recovered by the U.S. Navy",
      },
      {
        label: "Outcome",
        value:
          "Koga was killed. The Navy restored the aircraft and flew it, the first flyable Zero in American hands.",
      },
    ],
    sources: `${morisonAleutians} ${nhc}`,
  },
  {
    id: "adak-airfield",
    locationId: "adak",
    title: "Adak Airfield",
    start: "1942-08-30",
    end: "1942-09-15",
    periodId: "late1942",
    side: "us",
    kind: "base",
    summary:
      "American forces occupied Adak on 30 August 1942, in the Andreanof Islands, west of Dutch Harbor and within bomber range of Kiska. Brigadier General Eugene M. Landrum’s troops found no Japanese garrison. Engineers went to work at once on a fighter strip across a tidal flat, laying steel matting in rain and wind. Fighters were using the field by the middle of September. That short runway changed the campaign. Until Adak, strikes on the occupied islands had to fly from the eastern Aleutians, a long haul in Aleutian weather, with little time over the target. From Adak, Army bombers could attack Kiska on a regular schedule, and the Japanese occupation was within reach of land-based air power. The landing itself was not a battle. Adak was the first of two empty islands the United States took so that it could fight for the islands Japan actually held.",
    facts: [
      { label: "Dates", value: "Occupied 30 August 1942; fighters flying by mid-September" },
      { label: "Commanders", value: "Brig. Gen. Eugene M. Landrum" },
      {
        label: "Ships / units",
        value: "U.S. Army occupation force and engineers, Alaska Defense Command",
      },
      {
        label: "Outcome",
        value: "Airfield in operation. Kiska came under repeated land-based air attack.",
      },
    ],
    sources: `${army} ${morisonAleutians}`,
  },
  {
    id: "amchitka-airfield",
    locationId: "amchitka",
    title: "Amchitka Airfield",
    start: "1943-01-12",
    end: "1943-02-16",
    periodId: "early1943",
    side: "us",
    kind: "base",
    summary:
      "On 12 January 1943 American troops landed on Amchitka, in the Rat Islands, some sixty miles east of Kiska. No Japanese garrison held the island. The point of the landing was an airfield closer to the occupied islands than Adak. Building it was a fight with the place. Williwaws, the violent local winds, and deep mud slowed the work, and the men lived in tents through the worst of an Aleutian winter. A runway took aircraft in February 1943. Fighters could then reach Kiska, which had been a long flight even from Adak, and bombers could strike Attu as well. Amchitka became a principal base for the air war against both garrisons and for the invasions that followed in the spring and summer. Like Adak, it was occupied without a landing fight. It mattered because of where it sat on the chain.",
    facts: [
      { label: "Dates", value: "Occupied 12 January 1943; runway in use in February 1943" },
      { label: "Commanders", value: "U.S. Army occupation force" },
      { label: "Ships / units", value: "U.S. Army troops and aviation engineers" },
      {
        label: "Outcome",
        value: "Fighter airfield within range of Kiska. The island became a main base for the 1943 offensives.",
      },
    ],
    sources: `${army} ${morisonAleutians}`,
  },
  {
    id: "komandorski",
    locationId: "komandorski",
    title: "Battle of the Komandorski Islands",
    start: "1943-03-26",
    end: "1943-03-26",
    periodId: "early1943",
    side: "both",
    kind: "battle",
    summary:
      "On 26 March 1943 a Japanese convoy bound for Attu met an American cruiser force south of the Soviet Komandorski Islands. The battle was fought at sea. Japan did not land on Soviet territory, and the islands were not the object of the fight. Vice Admiral Boshirō Hosogaya, still commanding the Fifth Fleet, had the heavy cruisers Nachi and Maya, lighter cruisers, destroyers, and two transports loaded for the Attu garrison. Rear Admiral Charles H. McMorris, with the heavy cruiser Salt Lake City, the light cruiser Richmond, and the destroyers Bailey, Coghlan, Dale, and Monaghan, stood between that convoy and the island. The gunnery action ran for several hours in daylight. Neither side had carrier aircraft in the fight. Salt Lake City was badly damaged and at one point lost power. A destroyer charge, with Bailey in the lead, helped cover her. Hosogaya had the stronger force, broke off, and took the convoy home. Attu was not resupplied. Hosogaya was relieved of command. It was the last large daylight gunnery battle of the Pacific war fought without aircraft.",
    facts: [
      { label: "Dates", value: "26 March 1943" },
      {
        label: "Commanders",
        value: "Rear Adm. Charles H. McMorris; Vice Adm. Boshirō Hosogaya",
      },
      {
        label: "Ships / units",
        value:
          "USS Richmond, USS Salt Lake City, and destroyers Bailey, Coghlan, Dale, and Monaghan; Japanese cruisers Nachi and Maya, escorts, and a convoy for Attu",
      },
      {
        label: "Outcome",
        value:
          "Fought at sea, south of the Soviet islands. Salt Lake City badly damaged; no ship sunk. The Attu convoy turned back, and Hosogaya was relieved.",
      },
    ],
    sources: `${morisonAleutians} ${nhc}`,
  },
  {
    id: "attu-battle",
    locationId: "attu",
    title: "Battle of Attu",
    start: "1943-05-11",
    end: "1943-05-30",
    periodId: "summer1943",
    side: "both",
    kind: "battle",
    summary:
      "On 11 May 1943 the 7th Infantry Division landed on Attu to retake the island Japan had held since the previous June. The operation was named Landcrab. It was the only ground battle of the war fought on United States territory. Colonel Yasuyo Yamasaki commanded a garrison of about 2,500 men. American troops came ashore at Holtz Bay in the north and Massacre Bay in the south, then had to cross ridges buried in fog, snow, and mud. Major General Albert E. Brown was relieved during the fighting, and Major General Eugene M. Landrum took the division. The Japanese line gave way slowly until 29 May, when Yamasaki led a final attack into the American rear near Engineer Hill. He was killed, and organized resistance ended the next day. About 549 American soldiers were killed in action. Nearly the entire Japanese garrison died. Twenty-eight men were taken prisoner. Cold and the terrain put as many men out of action as the fighting did. Trench foot, exposure, and exhaustion filled the aid stations alongside the wounded.",
    facts: [
      { label: "Dates", value: "11–30 May 1943" },
      {
        label: "Commanders",
        value:
          "Maj. Gen. Albert E. Brown, then Maj. Gen. Eugene M. Landrum; Col. Yasuyo Yamasaki",
      },
      {
        label: "Ships / units",
        value: "U.S. 7th Infantry Division; Japanese garrison of about 2,500",
      },
      {
        label: "Outcome",
        value:
          "Attu retaken. About 549 American dead. Nearly the whole garrison killed; 28 prisoners. Heavy losses to cold and terrain.",
      },
    ],
    sources: `${army} ${morisonAleutians}`,
  },
  {
    id: "kiska-evacuation",
    locationId: "kiska",
    title: "Evacuation of Kiska",
    start: "1943-07-28",
    end: "1943-07-29",
    periodId: "summer1943",
    side: "japan",
    kind: "battle",
    summary:
      "On the night of 28–29 July 1943 the Japanese garrison left Kiska. About 5,200 men were taken off by light cruisers and destroyers under Rear Admiral Masatomi Kimura, in dense fog, and the Allies did not detect the withdrawal. Vice Admiral Shirō Kawase, who had replaced Hosogaya after the Komandorski battle, commanded the Fifth Fleet that ordered the evacuation. The ships entered the harbor, embarked the troops, and were clear before daylight. American commanders still believed the island was held. Radio silence and a lack of anti-aircraft fire raised questions in the days that followed, but the working assumption remained that a large garrison was waiting in the fog. The evacuation was the real end of the Japanese occupation of the Aleutians. The landing that came in August found abandoned positions, mines, and booby traps, and no one left to defend them.",
    facts: [
      { label: "Dates", value: "Night of 28–29 July 1943" },
      {
        label: "Commanders",
        value: "Vice Adm. Shirō Kawase; Rear Adm. Masatomi Kimura",
      },
      {
        label: "Ships / units",
        value: "Light cruisers and destroyers; about 5,200 Japanese troops",
      },
      {
        label: "Outcome",
        value: "Garrison removed under fog. The Allies did not detect the evacuation.",
      },
    ],
    sources: `${morisonAleutians} ${army}`,
  },
  {
    id: "operation-cottage",
    locationId: "kiska",
    title: "Operation Cottage",
    start: "1943-08-15",
    end: "1943-08-15",
    periodId: "summer1943",
    side: "us",
    kind: "battle",
    summary:
      "On 15 August 1943 a large American and Canadian force landed on Kiska. The operation was named Cottage. The Canadian 13th Infantry Brigade came ashore with United States troops under Major General Charles H. Corlett. They expected a battle on the scale of Attu. The island was empty. The garrison had been withdrawn more than two weeks earlier, and the landing force did not know it. In the fog, soldiers fired on one another. Men were also killed and wounded by mines and booby traps the departing garrison had left behind. No Japanese defenders were on Kiska that day. The casualties were real, and they came from the empty battlefield rather than from a fight with the garrison. The landing closed the Aleutian campaign. Japan had seized Attu and Kiska in June 1942, in the same week as Midway, and fourteen months later both islands were back in Allied hands: Attu by assault, Kiska by an evacuation the invaders missed.",
    facts: [
      { label: "Dates", value: "15 August 1943" },
      {
        label: "Commanders",
        value: "Maj. Gen. Charles H. Corlett; Canadian 13th Infantry Brigade",
      },
      {
        label: "Ships / units",
        value: "U.S. landing force and the Canadian 13th Infantry Brigade",
      },
      {
        label: "Outcome",
        value:
          "The island was empty. Allied losses came from mines, booby traps, and friendly fire. No Japanese defenders were present.",
      },
    ],
    sources: `${morisonAleutians} ${army}`,
  },
];
