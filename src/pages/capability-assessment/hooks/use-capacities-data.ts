import Papa from "papaparse";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CapacityAssessmentRecord,
  CAPACITY_ASSESSMENT_KEYS,
  PREFIX_BY_LOCATION,
} from "../types/capacity-assessment-record";
import { LOCATIONS, Location } from "../consts/locations";
import { Domain } from "../consts/domains";
import { Category } from "../consts/categories";
import { CapacityAssessmentTableRow, Order } from "../types/table";

export interface UseCapacitiesDataProps {
  handleCsvUploadError: () => void;
  handleCsvUploadSuccess: () => void;
}

export const DEFAULT_LOCAL_DIRECTORY =
  "C:/repos/test-offline-app/offline-app/sample-data/";
export const FILE_NAME = "capacities-data.csv";

export const useCapacitiesData = (props: UseCapacitiesDataProps) => {
  // Data
  const rawData = useRef<CapacityAssessmentRecord[]>([]);

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    LOCATIONS[0]
  );
  const [selectedIncStatuses, setSelectedIncStatuses] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // Data Derived states
  const dataLength = rawData?.current?.length ?? 0;
  const hasData = rawData?.current?.length > 0;
  const locationPrefix = PREFIX_BY_LOCATION[selectedLocation];

  // Given location prefix, we need to translate between the field
  // of `CapacityAssessmentRecord` and `CapacityAssessmentTableRow`
  const tableKeyToRecordKey = useCallback(
    (key: keyof CapacityAssessmentTableRow) => {
      if (key === "Current") {
        return `${locationPrefix}_Current` as keyof CapacityAssessmentRecord;
      } else if (key === "CapSteady") {
        return `${locationPrefix}_Cap-Steady` as keyof CapacityAssessmentRecord;
      } else if (key === "CapContingency") {
        return `${locationPrefix}_Cap-Contingency` as keyof CapacityAssessmentRecord;
      } else if (key === "Selected") {
        return "Inc" as keyof CapacityAssessmentRecord;
      } {
        return key as keyof CapacityAssessmentRecord;
      }
    },
    [locationPrefix]
  );

  const recordKeyToTableKey = useCallback(
    (key: keyof CapacityAssessmentRecord) => {
      if (key === `${locationPrefix}_Current`) {
        return "Current" as keyof CapacityAssessmentTableRow;
      } else if (key === `${locationPrefix}_Cap-Steady`) {
        return "CapSteady" as keyof CapacityAssessmentTableRow;
      } else if (key === `${locationPrefix}_Cap-Contingency`) {
        return "CapContingency" as keyof CapacityAssessmentTableRow;
      } else if (key === "Inc") {
        return "Selected" as keyof CapacityAssessmentTableRow;
      } else {
        return key as keyof CapacityAssessmentTableRow;
      }
    },
    [locationPrefix]
  );

  // Order states
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] =
    useState<keyof CapacityAssessmentRecord>("Category");

  const setOrderByColId = (id: keyof CapacityAssessmentTableRow) => {
    // This method is exposed to the table
    // The id here should be key of CapacityAssessmentTableRow
    // But we need to convert it to key of CapacityAssessmentRecord
    // to progress with the sorting
    setOrderBy(tableKeyToRecordKey(id));
  };
  const orderByColId = useMemo(() => {
    return recordKeyToTableKey(orderBy);
  }, [orderBy, locationPrefix]);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Table data: unpaginated
  const [tableData, setTableData] = useState<CapacityAssessmentTableRow[]>([]);

  // From raw data to table data, filtered, sorted, but not paginated
  const produceTableData = useCallback(() => {
    if (rawData?.current?.length === 0) return;
    const filtered: CapacityAssessmentRecord[] = rawData.current.filter(
      (record) => {
        if (selectedIncStatuses?.length > 0 && record.Inc !== 1) {
          return false;
        }
        if (
          selectedDomains?.length > 0 &&
          !selectedDomains?.includes(record.Domain as Domain)
        ) {
          return false;
        }
        if (
          selectedCategories?.length > 0 &&
          !selectedCategories?.includes(record.Category as Category)
        ) {
          return false;
        }
        return true;
      }
    );

    const ordered = filtered.sort((a, b) => {
      if (order === "desc") {
        return (b[orderBy] ?? "") < (a[orderBy] ?? "") ? -1 : 1;
      } else {
        return (a[orderBy] ?? "") < (b[orderBy] ?? "") ? -1 : 1;
      }
    });

    const tableViewData: CapacityAssessmentTableRow[] = ordered.map((entry) => {
      return {
        Id: entry.Id,
        Selected: entry.Inc,
        Domain: entry.Domain as Domain,
        Category: entry.Category as Category,
        Metric: entry.Metric,
        Measure: entry.Measure,
        Units: entry.Units,
        Current:
          (entry[
            `${locationPrefix}_Current` as keyof CapacityAssessmentRecord
          ] as number) ?? null,
        CapSteady:
          (entry[
            `${locationPrefix}_Cap-Steady` as keyof CapacityAssessmentRecord
          ] as number) ?? null,
        CapContingency:
          (entry[
            `${locationPrefix}_Cap-Contingency` as keyof CapacityAssessmentRecord
          ] as number) ?? null,
      } as CapacityAssessmentTableRow;
    });
    setTableData(tableViewData);
    // Reset pagination
    setPage(0);
  }, [
    locationPrefix,
    selectedIncStatuses,
    selectedDomains,
    selectedCategories,
    orderBy,
    order,
    setPage,
  ]);
  useEffect(() => {
    produceTableData();
  }, [
    selectedLocation,
    selectedIncStatuses,
    selectedDomains,
    selectedCategories,
    orderBy,
    order,
  ]);

  const tableView = useMemo(() => {
    return tableData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [tableData, page, rowsPerPage]);

  // CSV Upload/Download Handlers
  const handleCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          const fields = results.meta.fields || [];
          const formatCorrect = fields.every((field) =>
            (CAPACITY_ASSESSMENT_KEYS as string[]).includes(field)
          );
          if (!formatCorrect) {
            props.handleCsvUploadError();
            return;
          }
          const parsedData = results.data.map(
            (row: any, index) =>
              ({ ...row, Id: index } as CapacityAssessmentRecord) // Id field, same as index
          );
          rawData.current = parsedData;
          produceTableData();
          props.handleCsvUploadSuccess();
        },
        error: (_: any, __: any) => {
          props.handleCsvUploadError();
        },
      });
    };

    reader.readAsText(file);
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  const handleCsvDownload = () => {
    if (rawData?.current?.length === 0) return;
    const csv: string = Papa.unparse(rawData?.current, {
      delimiter: ",",
      header: true,
      columns: CAPACITY_ASSESSMENT_KEYS,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", FILE_NAME);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpdateTableAttribute = (id: number, colId: string, value: any) => {
    // First update ref
    // Note id should be the same as the array indesx of `rawData.current`
    // Mutate the raw data
    
    // Translate column name to record key
    const recordKey = tableKeyToRecordKey(colId);

    // Mutate raw data
    rawData.current[id] = {
      ...rawData.current[id],
      [recordKey]: value,
    }
    
    // Then, update the table data (view)
    const tableDataCopy = [...tableData];
    const tableRowIndex = tableDataCopy.findIndex((row) => row.Id === id);
    if (tableRowIndex !== -1) {
      tableDataCopy[tableRowIndex] = {
        ...tableDataCopy[tableRowIndex],
        [colId]: value,
      };
      setTableData(tableDataCopy);
    }

    // Then, `tableView` will be updated automatically
    // because it is derived from `tableData` and `page` and `rowsPerPage`
  }

  return {
    // Has Data?
    hasData,
    dataLength,

    // Table View
    tableView,

    // Handlers for CSV upload/download result
    handleCsvUpload,
    handleCsvDownload,

    // Filter states
    selectedIncStatuses,
    setSelectedIncStatuses,
    selectedLocation,
    setSelectedLocation,
    selectedDomains,
    setSelectedDomains,
    selectedCategories,
    setSelectedCategories,

    // Ordering
    order,
    setOrder,
    orderByColId,
    setOrderByColId,

    // Pagination
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,

    // Handler to update table attribute
    updateTableAttribute: handleUpdateTableAttribute,
  };
};
