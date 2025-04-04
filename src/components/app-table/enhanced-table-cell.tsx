import TableCell from "@mui/material/TableCell";
import { TableColumnDefinition } from "./types";
import { useEffect, useState } from "react";
import { Popover, TextField } from "@mui/material";

export interface EnhancedTableCellProps {
  def: TableColumnDefinition; // Column definition for the cell
  align: "left" | "right"; // Alignment of the cell content
  value: any; // Value to be displayed in the cell
  handleUpdate?: (value: any) => void; // Function to handle value update
}

export const EnhancedTableCell = (props: EnhancedTableCellProps) => {
  const { def, align, value, handleUpdate } = props;

  // Popover (container for editor)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (def?.editable) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? "edit-popover" : undefined;

  const [newValue, setNewValue] = useState<number | string>(value);

  useEffect(() => {
    setNewValue(value as number | string);
  }, [value]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    handleUpdate?.(newValue); // Call the update function with the new value
    if (def.numeric) {
      const numberValue = parseFloat(newValue);
      if (!isNaN(numberValue)) {
        setNewValue(numberValue);
      }
    } else {
      setNewValue(newValue);
    }
  };

  return (
    <>
      <TableCell
        width={def.width}
        key={def.id}
        align={align}
        sx={{ padding: "0.4rem", minWidth: def.width }}
      >
        {def?.editable ? (
          <button className="h-6 flex items-center justify-center" onClick={handlePopover}>
            {value}
          </button>
        ) : (
          <span>{value}</span>
        )}
      </TableCell>
      {def?.editable && (
        <Popover
          id={popoverId}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ padding: "0.5rem", height: "10rem"}}
        >
          <TextField
            id="edit-value"
            label={def.label}
            size="small"
            sx={{ fontSize: "0.9rem", width: "10rem", margin: "0.5rem" }}
            value={newValue}
            onChange={handleValueChange}
            autoFocus
            variant="outlined"
          />
        </Popover>
      )}
    </>
  );
};
