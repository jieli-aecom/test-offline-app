import { MouseEvent } from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { capacityAssessmentTableDefinitions, Order } from "../types/table";

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface EnhancedTableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
}

export function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: string) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"  sx={{width: '2rem'}}>
        </TableCell>
        {capacityAssessmentTableDefinitions.map((column) => (
          <TableCell
            key={column.id}
            width={column.width}
            align={column.numeric ? "right" : "left"}
            padding="none"
            sortDirection={orderBy === column.id ? order : false}
            sx={{padding: '0.4rem', minWidth: column.width}}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id as keyof Data)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
