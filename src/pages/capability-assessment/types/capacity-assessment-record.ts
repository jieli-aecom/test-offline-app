import { Location } from "../consts/locations";

export type CapacityAssessmentRecord = {
  Id: number; // Added
  Inc: number;
  Domain: string;
  Category: string;
  Metric: string;
  Measure: string;
  Units: string;
  L01_Current: number | null;
  "L01_Cap-Steady": number | null;
  "L01_Cap-Contingency": number | null;
  L02_Current: number | null;
  "L02_Cap-Steady": number | null;
  "L02_Cap-Contingency": number | null;
  L03_Current: number | null;
  "L03_Cap-Steady": number | null;
  "L03_Cap-Contingency": number | null;
  L04_Current: number | null;
  "L04_Cap-Steady": number | null;
  "L04_Cap-Contingency": number | null;
  L05_Current: number | null;
  "L05_Cap-Steady": number | null;
  "L05_Cap-Contingency": number | null;
  L06_Current: number | null;
  "L06_Cap-Steady": number | null;
  "L06_Cap-Contingency": number | null;
  L07_Current: number | null;
  "L07_Cap-Steady": number | null;
  "L07_Cap-Contingency": number | null;
  L08_Current: number | null;
  "L08_Cap-Steady": number | null;
  "L08_Cap-Contingency": number | null;
  L09_Current: number | null;
  "L09_Cap-Steady": number | null;
  "L09_Cap-Contingency": number | null;
  L10_Current: number | null;
  "L10_Cap-Steady": number | null;
  "L10_Cap-Contingency": number | null;
  L11_Current: number | null;
  "L11_Cap-Steady": number | null;
  "L11_Cap-Contingency": number | null;
  L12_Current: number | null;
  "L12_Cap-Steady": number | null;
  "L12_Cap-Contingency": number | null;
  L13_Current: number | null;
  "L13_Cap-Steady": number | null;
  "L13_Cap-Contingency": number | null;
  L14_Current: number | null;
  "L14_Cap-Steady": number | null;
  "L14_Cap-Contingency": number | null;
  L15_Current: number | null;
  "L15_Cap-Steady": number | null;
  "L15_Cap-Contingency": number | null;
  L16_Current: number | null;
  "L16_Cap-Steady": number | null;
  "L16_Cap-Contingency": number | null;
  L17_Current: number | null;
  "L17_Cap-Steady": number | null;
  "L17_Cap-Contingency": number | null;
  L18_Current: number | null;
  "L18_Cap-Steady": number | null;
  "L18_Cap-Contingency": number | null;
  L19_Current: number | null;
  "L19_Cap-Steady": number | null;
  "L19_Cap-Contingency": number | null;
  L20_Current: number | null;
  "L20_Cap-Steady": number | null;
  "L20_Cap-Contingency": number | null;
  L21_Current: number | null;
  "L21_Cap-Steady": number | null;
  "L21_Cap-Contingency": number | null;
  L22_Current: number | null;
  "L22_Cap-Steady": number | null;
  "L22_Cap-Contingency": number | null;
  L23_Current: number | null;
  "L23_Cap-Steady": number | null;
  "L23_Cap-Contingency": number | null;
  L24_Current: number | null;
  "L24_Cap-Steady": number | null;
  "L24_Cap-Contingency": number | null;
  L25_Current: number | null;
  "L25_Cap-Steady": number | null;
  "L25_Cap-Contingency": number | null;
};

export const CAPACITY_ASSESSMENT_KEYS: (keyof CapacityAssessmentRecord)[] =
  [
    "Inc",
    "Domain",
    "Category",
    "Metric",
    "Measure",
    "Units",
    "L01_Current",
    "L01_Cap-Steady",
    "L01_Cap-Contingency",
    "L02_Current",
    "L02_Cap-Steady",
    "L02_Cap-Contingency",
    "L03_Current",
    "L03_Cap-Steady",
    "L03_Cap-Contingency",
    "L04_Current",
    "L04_Cap-Steady",
    "L04_Cap-Contingency",
    "L05_Current",
    "L05_Cap-Steady",
    "L05_Cap-Contingency",
    "L06_Current",
    "L06_Cap-Steady",
    "L06_Cap-Contingency",
    "L07_Current",
    "L07_Cap-Steady",
    "L07_Cap-Contingency",
    "L08_Current",
    "L08_Cap-Steady",
    "L08_Cap-Contingency",
    "L09_Current",
    "L09_Cap-Steady",
    "L09_Cap-Contingency",
    "L10_Current",
    "L10_Cap-Steady",
    "L10_Cap-Contingency",
    "L11_Current",
    "L11_Cap-Steady",
    "L11_Cap-Contingency",
    "L12_Current",
    "L12_Cap-Steady",
    "L12_Cap-Contingency",
    "L13_Current",
    "L13_Cap-Steady",
    "L13_Cap-Contingency",
    "L14_Current",
    "L14_Cap-Steady",
    "L14_Cap-Contingency",
    "L15_Current",
    "L15_Cap-Steady",
    "L15_Cap-Contingency",
    "L16_Current",
    "L16_Cap-Steady",
    "L16_Cap-Contingency",
    "L17_Current",
    "L17_Cap-Steady",
    "L17_Cap-Contingency",
    "L18_Current",
    "L18_Cap-Steady",
    "L18_Cap-Contingency",
    "L19_Current",
    "L19_Cap-Steady",
    "L19_Cap-Contingency",
    "L20_Current",
    "L20_Cap-Steady",
    "L20_Cap-Contingency",
    "L21_Current",
    "L21_Cap-Steady",
    "L21_Cap-Contingency",
    "L22_Current",
    "L22_Cap-Steady",
    "L22_Cap-Contingency",
    "L23_Current",
    "L23_Cap-Steady",
    "L23_Cap-Contingency",
    "L24_Current",
    "L24_Cap-Steady",
    "L24_Cap-Contingency",
    "L25_Current",
    "L25_Cap-Steady",
    "L25_Cap-Contingency",
  ];

export const CAPACITY_ASSESSMENT_COMMON_KEYS: (keyof CapacityAssessmentRecord)[] =
  ["Domain", "Category", "Metric", "Measure", "Units"];

export const PREFIX_BY_LOCATION: Record<Location, string> = {
  [Location.NSRota]: "L01",
  [Location.NSANaples]: "L02",
  [Location.NASSigonella]: "L03",
  [Location.NSASoudaBay]: "L04",
  [Location.NSFDeveselu]: "L05",
  [Location.NSFRedzikowo]: "L06",
  [Location.Lossiemouth]: "L07",
  [Location.Crombie]: "L08",
  [Location.Keflavik]: "L09",
  [Location.Grindavik]: "L10",
  [Location.Evenes]: "L11",
  [Location.Ramsund]: "L12",
  [Location.USNSELisbon]: "L13",
  [Location.USNSEMadrid]: "L14",
  [Location.USNSEValencia]: "L15",
  [Location.CampLDijbouti]: "L16",
  [Location.AfricanCSLs]: "L17",
  [Location.AfricanCL]: "L18",
  [Location.NSABahrain]: "L19",
  [Location.IsaAB]: "L20",
  [Location.SaaAlNakhl]: "L21",
  [Location.JebAllPort]: "L22",
  [Location.FujairahPort]: "L23",
  [Location.DuqumPort]: "L24",
  [Location.MinhadAB]: "L25",
}

export const CAPACITY_ASSESSMENT_KEYS_BY_LOCATION: Record<
  Location,
  (keyof CapacityAssessmentRecord)[]
> = {
  [Location.NSRota]: ["L01_Current", "L01_Cap-Steady", "L01_Cap-Contingency"],
  [Location.NSANaples]: [
    "L02_Current",
    "L02_Cap-Steady",
    "L02_Cap-Contingency",
  ],
  [Location.NASSigonella]: [
    "L03_Current",
    "L03_Cap-Steady",
    "L03_Cap-Contingency",
  ],
  [Location.NSASoudaBay]: [
    "L04_Current",
    "L04_Cap-Steady",
    "L04_Cap-Contingency",
  ],
  [Location.NSFDeveselu]: [
    "L05_Current",
    "L05_Cap-Steady",
    "L05_Cap-Contingency",
  ],
  [Location.NSFRedzikowo]: [
    "L06_Current",
    "L06_Cap-Steady",
    "L06_Cap-Contingency",
  ],
  [Location.Lossiemouth]: [
    "L07_Current",
    "L07_Cap-Steady",
    "L07_Cap-Contingency",
  ],
  [Location.Crombie]: ["L08_Current", "L08_Cap-Steady", "L08_Cap-Contingency"],
  [Location.Keflavik]: ["L09_Current", "L09_Cap-Steady", "L09_Cap-Contingency"],
  [Location.Grindavik]: [
    "L10_Current",
    "L10_Cap-Steady",
    "L10_Cap-Contingency",
  ],
  [Location.Evenes]: ["L11_Current", "L11_Cap-Steady", "L11_Cap-Contingency"],
  [Location.Ramsund]: ["L12_Current", "L12_Cap-Steady", "L12_Cap-Contingency"],
  [Location.USNSELisbon]: [
    "L13_Current",
    "L13_Cap-Steady",
    "L13_Cap-Contingency",
  ],
  [Location.USNSEMadrid]: [
    "L14_Current",
    "L14_Cap-Steady",
    "L14_Cap-Contingency",
  ],
  [Location.USNSEValencia]: [
    "L15_Current",
    "L15_Cap-Steady",
    "L15_Cap-Contingency",
  ],
  [Location.CampLDijbouti]: [
    "L16_Current",
    "L16_Cap-Steady",
    "L16_Cap-Contingency",
  ],
  [Location.AfricanCSLs]: [
    "L17_Current",
    "L17_Cap-Steady",
    "L17_Cap-Contingency",
  ],
  [Location.AfricanCL]: [
    "L18_Current",
    "L18_Cap-Steady",
    "L18_Cap-Contingency",
  ],
  [Location.NSABahrain]: [
    "L19_Current",
    "L19_Cap-Steady",
    "L19_Cap-Contingency",
  ],
  [Location.IsaAB]: ["L20_Current", "L20_Cap-Steady", "L20_Cap-Contingency"],
  [Location.SaaAlNakhl]: [
    "L21_Current",
    "L21_Cap-Steady",
    "L21_Cap-Contingency",
  ],
  [Location.JebAllPort]: [
    "L22_Current",
    "L22_Cap-Steady",
    "L22_Cap-Contingency",
  ],
  [Location.FujairahPort]: [
    "L23_Current",
    "L23_Cap-Steady",
    "L23_Cap-Contingency",
  ],
  [Location.DuqumPort]: [
    "L24_Current",
    "L24_Cap-Steady",
    "L24_Cap-Contingency",
  ],
  [Location.MinhadAB]: ["L25_Current", "L25_Cap-Steady", "L25_Cap-Contingency"],
};
