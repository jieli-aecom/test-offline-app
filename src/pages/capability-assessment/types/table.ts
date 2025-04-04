import { AppTableRow, TableColumnDefinition } from "../../../components/app-table/types";
import { Category } from "../consts/categories";
import { Domain } from "../consts/domains";

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
    editable: false,
  },
  {
    id: "Category",
    label: "Category",
    numeric: false,
    width: "8rem",
    editable: false,
  },
  {
    id: "Metric",
    label: "Metric",
    numeric: false,
    width: "12rem",
    editable: false,
  },
  {
    id: "Measure",
    label: "Measure",
    numeric: false,
    width: "8rem",
    editable: false,
  },
  {
    id: "Units",
    label: "Units",
    numeric: false,
    width: "5rem",
    editable: false,
  },
  {
    id: "Current",
    label: "Current",
    numeric: true,
    width: "6rem",
    editable: true,
  },
  {
    id: "CapSteady",
    label: "Cap-Steady",
    numeric: true,
    width: "5rem",
    editable: true,
  },
  {
    id: "CapContingency",
    label: "Cap-Contingency",
    numeric: true,
    width: "5rem",
    editable: true,
  }
]

export type Order = "asc" | "desc";

