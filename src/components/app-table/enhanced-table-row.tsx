import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { TableColumnDefinition, AppTableRow } from "./types";
import { EnhancedTableCell } from "./enhanced-table-cell";

export interface EnhancedTableRowProps<T extends AppTableRow> {
  row: AppTableRow;
  columnDefinitions: TableColumnDefinition<T>[];
  handleSelect: (currentSelected: number) => void; 
  handleUpdateTableAttribute: (key: keyof T, value: number | string) => void;
}

export function EnhancedTableRow<T extends AppTableRow> (props: EnhancedTableRowProps<T>) {
  const { row, handleSelect, columnDefinitions, handleUpdateTableAttribute } =
    props;
  return (
    <TableRow
      hover
      onClick={(_) => handleSelect(row.Selected)}
      role="checkbox"
      aria-checked={row.Selected === 1}
      tabIndex={-1}
      key={row.Id}
      selected={row.Selected === 1}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={row.Selected === 1}
          sx={{ width: "2rem" }}
        />
      </TableCell>
      {columnDefinitions?.map((def) => (
        <EnhancedTableCell
          key={def.id as string}
          def={def}
          align={"left"}
          value={row[def.id as keyof AppTableRow]}
          handleUpdate={(value) => {
            handleUpdateTableAttribute(def.id, value);
          }}
        />
      ))}
    </TableRow>
  );
};
