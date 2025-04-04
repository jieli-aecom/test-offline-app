import { useState, MouseEvent, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { EnhancedTableHead } from "./enhanced-table-head";
import {
  CapacityAssessmentTableRow as AppTableRow,
  Order,
  TableColumnDefinition,
} from "../types/table";
import { TablePagination } from "@mui/material";

export interface DataViewArea {
  hasData: boolean;
  dataLength: number;
  tableView: AppTableRow[];
  columnDefinitions: TableColumnDefinition[]; // Corresponding to each column
  order: Order;
  orderBy: string; // Should be `id` field of one of `columnDefinitions`
  setOrder: (order: Order) => void;
  setOrderBy: (orderBy: string) => void; // Arg should be `id` field of one of `columnDefinitions`
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
}

export const DataViewArea = (props: DataViewArea) => {
  const [selected, setSelected] = useState<readonly number[]>([]);

  const handleChangePage = (_: unknown, newPage: number) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    props.setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  const handleRequestSort = (_: MouseEvent<unknown>, property: string) => {
    const isAsc = props.orderBy === property && props.order === "asc";
    props.setOrder(isAsc ? "desc" : "asc");
    props.setOrderBy(property);
  };

  const handleClick = (_: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[90%] overflow-y-auto overflow-x-auto">
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              order={props.order}
              orderBy={props.orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {!!props.tableView &&
                props.tableView.map((row) => {
                  const isItemSelected = selected.includes(row.Id);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          sx={{ width: "2rem" }}
                        />
                      </TableCell>
                      {props?.columnDefinitions?.map((def) => {
                        const align = def.numeric ? "right" : "left";
                        return (
                          <TableCell
                            width={def.width}
                            key={def.id}
                            align={align}
                            sx={{ padding: "0.4rem", minWidth: def.width }}
                          >
                            {row[def.id as keyof AppTableRow]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="w-full h-[2rem]">
        {props.dataLength > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 40]}
            component="div"
            count={props.dataLength}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
    </div>
  );
};
