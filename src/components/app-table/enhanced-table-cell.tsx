import TableCell from "@mui/material/TableCell";
import { AppTableRow, TableColumnDefinition } from "./types";
import { useEffect, useRef, useState } from "react";
import { IconButton, Popover, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { DropdownSelectBox } from "../dropdown-select-box";

export interface EnhancedTableCellProps<T extends AppTableRow> {
  def: TableColumnDefinition<T>;
  align: "left" | "right";
  value: any;
  handleUpdate?: (value: any) => void;
  color?: (value: any) => string;
}

export function EnhancedTableCell<T extends AppTableRow>(
  props: EnhancedTableCellProps<T>
) {
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

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (def.numeric) {
      let numberValue = parseFloat(newValue);
      if (!isNaN(numberValue)) {
        //
      } else {
        numberValue = value; // Revert
      }
      setNewValue(numberValue);
      handleUpdate?.(numberValue);
    } else {
      setNewValue(newValue);
      handleUpdate?.(newValue);
    }
  };

  const handleNewSelectedValue = (newSelected: string) => {
    setNewValue(newSelected);
    handleUpdate?.(newSelected);
  };

  const color = props.color?.(props.value) ?? "rgba(0, 0, 0, 0)";

  return (
    <>
      <TableCell
        width={def.width}
        key={def.id as string}
        align={align}
        sx={{ padding: "0.4rem", minWidth: def.width }}
      >
        {def?.editable ? (
          <button
            style={{ backgroundColor: color }}
            className="min-h-6 flex items-center justify-left text-left !px-2 !py-0 min-w-[1.5rem]"
            onClick={handlePopover}
          >
            {value}
          </button>
        ) : (
          <span className="px-1" style={{ backgroundColor: color }}>
            {value}
          </span>
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
          sx={{ padding: "1rem", height: "10rem" }}
        >
          {!def?.dropdown && (
            <div className="flex gap-2 items-center p-2">
              <TextField
                id="edit-value"
                label={def.label}
                size="small"
                inputRef={inputRef}
                sx={{ fontSize: "0.9rem", width: def.width, margin: "0.5rem" }}
                value={newValue}
                onChange={handleInputValue}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                variant="outlined"
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePopoverClose();
                }}
                size="small"
              >
                <CheckIcon />
              </IconButton>
            </div>
          )}
          {def?.dropdown && (def?.dropdownOptions ?? []).length > 0 && (
            <div className="flex gap-2 items-end p-2">
              <DropdownSelectBox
                title={def.label}
                values={def.dropdownOptions ?? []}
                selectedValue={newValue as string}
                onChange={handleNewSelectedValue}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePopoverClose();
                }}
                size="small"
              >
                <CheckIcon />
              </IconButton>
            </div>
          )}
        </Popover>
      )}
    </>
  );
}
