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
import useExcelHandler from "../../../hooks/useExcelHandler";
import { LOCAL_STORAGE_VERSION } from "../../../consts/local-storage-version";

const LOCAL_STORAGE_KEY =
  "capacities-data-regional-share-design" + "-" + LOCAL_STORAGE_VERSION;
const SHEET_NAME = "capacities-data";

export const DEFAULT_LOCAL_DIRECTORY = "C:/app-example/";
export const FILE_NAME = "capacities-data.csv";

export const useCapacitiesData = () => {
  // Data
  const rawData = useRef<CapacityAssessmentRecord[]>([]);

  // Excel handler
  const { workbookToCsv, csvToWorkbookDownload } = useExcelHandler(SHEET_NAME);

  // Messages state
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleUploadError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 1500);
  };

  const handleUploadSuccess = () => {
    setSuccessMessage("File uploaded successfully");
    setTimeout(() => {
      setSuccessMessage("");
    }, 1500);
  };

  const handleDownloadError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 1500);
  };

  const handleDownloadSuccess = () => {
    setSuccessMessage("File downloaded successfully");
    setTimeout(() => {
      setSuccessMessage("");
    }, 1500);
  };

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
      }
      {
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
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] =
    useState<keyof CapacityAssessmentRecord>("Domain");

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

  // Load rawData from local storage
  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) {
      const parsed = JSON.parse(localData) as CapacityAssessmentRecord[];
      rawData.current = parsed;
      produceTableData();
    }
  }, []);

  // CSV Upload: populate rawData.current and produce table data
  const handleCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = workbookToCsv(event);
      if (!text) {
        handleUploadError("No file selected or file is empty");
      }
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
            handleUploadError("Invalid file format");
            return;
          }
          const parsedData = results.data.map(
            (row: any, index) =>
              ({ ...row, Id: index } as CapacityAssessmentRecord) // Id field, same as index
          );
          rawData.current = parsedData;

          // Save to local storage
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedData));

          // Produce table data (of type CapacityAssessmentTableRow[])
          produceTableData();
          handleUploadSuccess();
        },
        error: (_: any, __: any) => {
          handleUploadError("Error parsing CSV file");
        },
      });
    };

    reader.readAsArrayBuffer(file);
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  // CSV Download: download rawData.current as CSV file
  const handleCsvDownload = () => {
    if (rawData?.current?.length === 0) return;
    const csv: string = Papa.unparse(rawData?.current, {
      delimiter: ",",
      header: true,
      columns: CAPACITY_ASSESSMENT_KEYS,
    });
    const { success, message } = csvToWorkbookDownload(csv);
    if (success) {
      handleDownloadSuccess();
    } else {
      handleDownloadError(message);
    }
  };

  const handleUpdateTableAttribute = (
    id: number,
    colId: keyof CapacityAssessmentTableRow,
    value: any
  ) => {
    // First update ref
    // Note id should be the same as the array indesx of `rawData.current`
    // Mutate the raw data

    // Translate column name to record key
    const recordKey = tableKeyToRecordKey(colId);

    // Mutate raw data
    rawData.current[id] = {
      ...rawData.current[id],
      [recordKey]: value,
    };

    // Update local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rawData.current));

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
  };

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

    // Messages
    successMessage,
    errorMessage,
  };
};
