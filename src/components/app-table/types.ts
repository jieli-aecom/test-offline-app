export type TableColumnDefinition<T extends AppTableRow> = {
  id: keyof T;
  label: string;
  numeric: boolean;
  width: string;

  // About editing
  editable?: boolean; // Optional property to indicate if the column is editable
  dropdown?: boolean; // Optional property to indicate if the column is a dropdown editor
  dropdownOptions?: string[]; // Optional property to specify the options for the dropdown editor
}

export interface AppTableRow {
  Id: number;
  Selected: number;
  [key: string]: any; // Allow any other key-value pairs
}