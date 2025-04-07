import { EnhancedTable } from "../../../components/app-table/enhanced-table";
import { TableColumnDefinition } from "../../../components/app-table/types";
import { CapacityAssessmentTableRow, Order } from "../types/table";

export interface MainViewProps {
  hasData: boolean;
  dataLength: number;
  tableView: CapacityAssessmentTableRow[];
  columnDefinitions: TableColumnDefinition<CapacityAssessmentTableRow>[];
  order: Order;
  setOrder: (order: Order) => void;
  orderBy: keyof CapacityAssessmentTableRow;
  setOrderBy: (orderBy: keyof CapacityAssessmentTableRow) => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  handleUpdateTableAttribute: (
    rowId: number,
    key: keyof CapacityAssessmentTableRow,
    value: number | string
  ) => void; // rowId is the `Id` field of the row, `key` is the key to update
}

export function MainView(props: MainViewProps) {
  if (!props.hasData === true) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        Data not loaded
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center">
      <EnhancedTable
        hasData={props.hasData}
        dataLength={props.dataLength}
        tableView={props.tableView}
        columnDefinitions={props.columnDefinitions}
        order={props.order}
        setOrder={props.setOrder}
        orderBy={props.orderBy}
        setOrderBy={props.setOrderBy}
        page={props.page}
        setPage={props.setPage}
        rowsPerPage={props.rowsPerPage}
        setRowsPerPage={props.setRowsPerPage}
        handleUpdateTableAttribute={props.handleUpdateTableAttribute}
        hideFooter={false}
        disableSelect={false}
      />
    </div>
  );
}
