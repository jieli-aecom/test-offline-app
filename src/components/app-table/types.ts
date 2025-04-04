export type TableColumnDefinition<T extends AppTableRow> = {
  id: keyof T;
  label: string;
  numeric: boolean;
  width: string;
  editable?: boolean; // Optional property to indicate if the column is editable
}

export interface AppTableRow {
  Id: number;
  Selected: number;
  [key: string]: any; // Allow any other key-value pairs
}