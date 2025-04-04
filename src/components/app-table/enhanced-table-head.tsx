import { MouseEvent } from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { Order } from "../../pages/capability-assessment/types/table";
import { AppTableRow, TableColumnDefinition } from "./types";

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface EnhancedTableHeadProps<T extends AppTableRow> {
  onRequestSort?: (event: MouseEvent<unknown>, property: string) => void;
  order?: Order;
  orderBy?: keyof T;
  columnDefinitions: TableColumnDefinition<T>[];
  disableSelect?: boolean; // Optional property to disable the select checkbox
}

export function EnhancedTableHead<T extends AppTableRow>(
  props: EnhancedTableHeadProps<T>
) {
  const createSortHandler =
    (property: string) => (event: MouseEvent<unknown>) => {
      if (!props.onRequestSort) return;
      props.onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {!props?.disableSelect === true && (
          <TableCell padding="checkbox" sx={{ width: "2rem" }}></TableCell>
        )}
        {props.columnDefinitions.map((column) => (
          <TableCell
            key={column.id as string}
            width={column.width}
            align={"left"}
            padding="none"
            sortDirection={props.orderBy === column.id ? props.order : false}
            sx={{ padding: "0.4rem", minWidth: column.width }}
          >
            {
              <TableSortLabel
                active={
                  props?.order !== undefined &&
                  props?.orderBy !== undefined &&
                  props.orderBy === column.id
                }
                direction={props.orderBy === column.id ? props.order : "asc"}
                onClick={createSortHandler(column.id as keyof Data)}
              >
                <span className="font-semibold">{column.label}</span>
                {props?.orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {props.order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
