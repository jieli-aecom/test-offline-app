import TableCell from "@mui/material/TableCell";
import { AppTableRow, TableColumnDefinition } from "./types";
import { useEffect, useRef, useState } from "react";
import { Popover, TextField } from "@mui/material";

export interface EnhancedTableCellProps<T extends AppTableRow> {
  def: TableColumnDefinition<T>;
  align: "left" | "right";
  value: any; 
  handleUpdate?: (value: any) => void; 
}

export function EnhancedTableCell<T extends AppTableRow> (props: EnhancedTableCellProps<T>) {
  const { def, align, value, handleUpdate } = props;

  // Popover (container for editor)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (def.numeric) {
      let numberValue = parseFloat(newValue);
      if (!isNaN(numberValue)) {
        setNewValue(numberValue);
        handleUpdate?.(numberValue); 
      } else {
        setNewValue(value); // Reset to original value if invalid
        handleUpdate?.(value);
      }
    } else {
      setNewValue(newValue);
      handleUpdate?.(newValue);
    }
  };

  return (
    <>
      <TableCell
        width={def.width}
        key={def.id as string}
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
            inputRef={inputRef}
            sx={{ fontSize: "0.9rem", width: "10rem", margin: "0.5rem" }}
            value={newValue}
            onChange={handleValueChange}
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            variant="outlined"
          />
        </Popover>
      )}
    </>
  );
};
