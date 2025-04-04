import { AppTableRow, TableColumnDefinition } from "../../../components/app-table/types";
import { CATEGORIES, Category } from "../consts/categories";
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

export const capacityAssessmentTableDefinitions: TableColumnDefinition<CapacityAssessmentTableRow>[] = [
  {
    id: "Domain" as keyof CapacityAssessmentTableRow,
    label: "Domain",
    numeric: false,
    width: "5rem",
    editable: false,
  },
  {
    id: "Category" as keyof CapacityAssessmentTableRow,
    label: "Category",
    numeric: false,
    width: "6rem",
    editable: true,
    dropdown: true,
    dropdownOptions: CATEGORIES,
  },
  {
    id: "Metric" as keyof CapacityAssessmentTableRow,
    label: "Metric",
    numeric: false,
    width: "12rem",
    editable: false,
  },
  {
    id: "Measure" as keyof CapacityAssessmentTableRow,
    label: "Measure",
    numeric: false,
    width: "15rem",
    editable: true,
  },
  {
    id: "Units" as keyof CapacityAssessmentTableRow,
    label: "Units",
    numeric: false,
    width: "8rem",
    editable: true,
  },
  {
    id: "Current" as keyof CapacityAssessmentTableRow,
    label: "Current",
    numeric: true,
    width: "6rem",
    editable: true,
  },
  {
    id: "CapSteady" as keyof CapacityAssessmentTableRow,
    label: "Cap-Steady",
    numeric: true,
    width: "5rem",
    editable: true,
  },
  {
    id: "CapContingency" as keyof CapacityAssessmentTableRow,
    label: "Cap-Contingency",
    numeric: true,
    width: "5rem",
    editable: true,
  }
]

export type Order = "asc" | "desc";

