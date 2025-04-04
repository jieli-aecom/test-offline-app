import { MouseEvent, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { EnhancedTableHead } from "./enhanced-table-head";
import { Order } from "../../pages/capability-assessment/types/table";
import { TablePagination } from "@mui/material";
import { TableColumnDefinition, AppTableRow } from "./types";
import { EnhancedTableRow } from "./enhanced-table-row";

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
  handleUpdateTableAttribute: (rowId: number, key: string, value: any) => void; // rowId is the `Id` field of the row, `key` is the key to update
}

export const DataViewArea = (props: DataViewArea) => {
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

  const handleSelect = (
    rowId: number, // rowId is the `Id` field of the row
    currentSelected: number // 0 or 1, 0 means not selected, 1 means selected
  ) => {
    const newSelected = currentSelected === 1 ? 0 : 1;
    props.handleUpdateTableAttribute(rowId, "Selected", newSelected);
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
              columnDefinitions={props.columnDefinitions}
            />
            <TableBody>
              {!!props.tableView &&
                props.tableView.map((row) => (
                  <EnhancedTableRow
                    key={row.Id}
                    row={row}
                    columnDefinitions={props.columnDefinitions}
                    handleSelect={(currentSelected: number) =>
                      handleSelect(row.Id, currentSelected)
                    }
                    handleUpdateTableAttribute={(key: string, value: any) =>
                      props.handleUpdateTableAttribute(row.Id, key, value)
                    }
                  />
                ))}
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
