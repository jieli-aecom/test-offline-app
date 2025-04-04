import { Category } from "../consts/categories";
import { Domain } from "../consts/domains";

export type TableColumnDefinition = {
  id: string;
  label: string;
  numeric: boolean;
  width: string;
}

export interface AppTableRow {
  Id: number;
  Selected: number;
}

export interface CapacityAssessmentTableRow extends AppTableRow {
  Id: number; // Same as `CapacityAssessmentRecord.Id`, as tracking
  Selected: number;
  Domain: Domain;
  Category: Category;
  Metric: string;
  Measure: string;
  Units: string;
  Current: number | null;
  CapSteady: number | null;
  CapContingency: number | null;
}

export const capacityAssessmentTableColumns: (keyof CapacityAssessmentTableRow)[] = [
  "Domain",
  "Category",
  "Metric",
  "Measure",
  "Units",
  "Current",
  "CapSteady",
  "CapContingency",
];

export const capacityAssessmentTableDefinitions: TableColumnDefinition[] = [
  {
    id: "Domain",
    label: "Domain",
    numeric: false,
    width: "8rem",
  },
  {
    id: "Category",
    label: "Category",
    numeric: false,
    width: "8rem",
  },
  {
    id: "Metric",
    label: "Metric",
    numeric: false,
    width: "12rem",
  },
  {
    id: "Measure",
    label: "Measure",
    numeric: false,
    width: "8rem",
  },
  {
    id: "Units",
    label: "Units",
    numeric: false,
    width: "5rem",
  },
  {
    id: "Current",
    label: "Current",
    numeric: true,
    width: "6rem",
  },
  {
    id: "CapSteady",
    label: "Cap-Steady",
    numeric: true,
    width: "5rem",
  },
  {
    id: "CapContingency",
    label: "Cap-Contingency",
    numeric: true,
    width: "5rem",
  }
]

export type Order = "asc" | "desc";

