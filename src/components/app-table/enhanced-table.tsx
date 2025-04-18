import { MouseEvent, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { EnhancedTableHead } from "./enhanced-table-head";
import { Order } from "../../pages/capability-assessment/types/table";
import { TablePagination } from "@mui/material";
import { TableColumnDefinition, AppTableRow } from "./types";
import { EnhancedTableRow } from "./enhanced-table-row";

export interface EnhancedTableProps<T extends AppTableRow> {
  hasData: boolean;
  dataLength: number;
  tableView: T[];
  columnDefinitions: TableColumnDefinition<T>[];
  handleUpdateTableAttribute: (
    rowId: number,
    key: keyof T,
    value: number | string
  ) => void; // rowId is the `Id` field of the row, `key` is the key to update
  order?: Order;
  orderBy?: keyof T;
  setOrder?: (order: Order) => void;
  setOrderBy?: (orderBy: keyof T) => void;
  page?: number;
  setPage?: (page: number) => void;
  rowsPerPage?: number;
  setRowsPerPage?: (rowsPerPage: number) => void;
  hideFooter?: boolean; // Optional property to hide the footer
  disableSelect?: boolean; // Optional property to disable the select checkbox
}

export function EnhancedTable<T extends AppTableRow>(
  props: EnhancedTableProps<T>
) {
  const handleChangePage = (_: unknown, newPage: number) => {
    if (!props.setPage) return;
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!props.setRowsPerPage || !props.setPage) return;
    props.setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  const handleRequestSort = (_: MouseEvent<unknown>, property: string) => {
    if (!props.setOrder || !props.setOrderBy) return;
    const isAsc = props.orderBy === property && props.order === "asc";
    props.setOrder(isAsc ? "desc" : "asc");
    props.setOrderBy(property);
  };

  const handleSelect = (
    rowId: number, // rowId is the `Id` field of the row
    currentSelected: number // 0 or 1, 0 means not selected, 1 means selected
  ) => {
    if (props.disableSelect) return;
    const newSelected = currentSelected === 1 ? 0 : 1;
    props.handleUpdateTableAttribute(rowId, "Selected", newSelected);
  };

  const tableHeightClass = props.hideFooter ? "!h-full" : "h-[90%]";

  return (
    <div className="w-full h-full">
      <div
        className={`w-full ${tableHeightClass} overflow-y-auto overflow-x-auto`}
      >
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
              disableSelect={props?.disableSelect ?? false}
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
                    handleUpdateTableAttribute={(key: keyof T, value: any) =>
                      props.handleUpdateTableAttribute(row.Id, key, value)
                    }
                    disableSelect={props?.disableSelect ?? false}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="w-full h-[2rem]">
        {!props.hideFooter === true &&
          props.page !== undefined &&
          props.rowsPerPage !== undefined &&
          props?.dataLength > 0 && (
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
}
