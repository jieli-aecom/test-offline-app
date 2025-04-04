import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { TableColumnDefinition, AppTableRow } from "./types";
import { EnhancedTableCell } from "./enhanced-table-cell";

export interface EnhancedTableRowProps {
  row: AppTableRow;
  columnDefinitions: TableColumnDefinition[]; // Corresponding to each column
  handleSelect: (currentSelected: number) => void; // currentSelected is 0 or 1, 0 means not selected, 1 means selected
  // function will reverse the currentSelected value
  handleUpdateTableAttribute: (key: string, value: any) => void; // `key` is the key to update, update in main table
}

export const EnhancedTableRow = (props: EnhancedTableRowProps) => {
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
          key={def.id}
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
