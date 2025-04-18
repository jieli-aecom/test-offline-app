import Papa from "papaparse";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  actionFields,
  DefenseRecord,
  FacilitiesRecord,
  priorityFields,
  PriorityRecord,
  SupportRecord,
} from "../types/records";
import { CSV_FIELDS } from "../types/csv-fields";
import useExcelHandler from "../../../hooks/useExcelHandler";
import { LOCAL_STORAGE_VERSION } from "../../../consts/local-storage-version";

const PRIORITY_DATA_LOCAL_STORAGE_KEY =
  `actions-data-priority-regional-share-design-${LOCAL_STORAGE_VERSION}`;
const DEFENSE_DATA_LOCAL_STORAGE_KEY =
  `actions-data-defense-regional-share-design-${LOCAL_STORAGE_VERSION}`;
const SUPPORT_DATA_LOCAL_STORAGE_KEY =
  `actions-data-support-regional-share-design-${LOCAL_STORAGE_VERSION}`;
const FACILITIES_DATA_LOCAL_STORAGE_KEY =
  `actions-data-facilities-regional-share-design-${LOCAL_STORAGE_VERSION}`;

export interface useActionsDataProps {
  handleCsvUploadError: () => void;
  handleCsvUploadSuccess: () => void;
}

export const DEFAULT_LOCAL_DIRECTORY =
  "C:/app-example/";
const SHEET_NAME = "actions-data";

export const useActionsData = () => {
  // Four pieces of raw data
  const [prioritiesData, setPrioritiesData] = useState<PriorityRecord[]>([]);
  const [defenseData, setDefenseData] = useState<DefenseRecord[]>([]);
  const [supportData, setSupportData] = useState<SupportRecord[]>([]);
  const [facilitiesData, setFacilitiesData] = useState<FacilitiesRecord[]>([]);

  // Excel handler used by this hook
  const {
    workbookToCsv,
    csvToWorkbookDownload,
  } = useExcelHandler(SHEET_NAME);

  // Success or error messages
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleUploadError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 1500)
  }

  const handleUploadSuccess = () => {
    setSuccessMessage("File uploaded successfully");
    setTimeout(() => {
      setSuccessMessage("");
    }, 1500)
  }

  const handleDownloadError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 1500)
  }

  const handleDownloadSuccess = () => {
    setSuccessMessage("File downloaded successfully");
    setTimeout(() => {
      setSuccessMessage("");
    }, 1500)
  }

  // Check local storage
  useEffect(() => {
    const storedPrioritiesData = localStorage.getItem(
      PRIORITY_DATA_LOCAL_STORAGE_KEY
    );
    const storedDefenseData = localStorage.getItem(
      DEFENSE_DATA_LOCAL_STORAGE_KEY
    );
    const storedSupportData = localStorage.getItem(
      SUPPORT_DATA_LOCAL_STORAGE_KEY
    );
    const storedFacilitiesData = localStorage.getItem(
      FACILITIES_DATA_LOCAL_STORAGE_KEY
    );

    if (storedPrioritiesData) {
      setPrioritiesData(JSON.parse(storedPrioritiesData));
    }
    if (storedDefenseData) {
      setDefenseData(JSON.parse(storedDefenseData));
    }
    if (storedSupportData) {
      setSupportData(JSON.parse(storedSupportData));
    }
    if (storedFacilitiesData) {
      setFacilitiesData(JSON.parse(storedFacilitiesData));
    }
  }, []);

  const hasData = useMemo(() => {
    return (
      prioritiesData?.length > 0 &&
      defenseData?.length > 0 &&
      supportData?.length > 0 &&
      facilitiesData?.length > 0
    );
  }, [prioritiesData, defenseData, supportData, facilitiesData]);

  // Excel Upload: populate rawData.current and produce table data
  const handleExcelWorkbookUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      handleUploadError("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = workbookToCsv(event);

      if (!text) {
        handleUploadError("No data to parse");
        return;
      }

      handleUploadSuccess();

      const lines = text.split("\n").map((line) => line.trim());

      // Line 1 to 2
      const prioritiesText = lines.slice(0, 2).join("\n");
      // Parse priorities data
      Papa.parse(prioritiesText, {
        header: true,
        complete: (results) => {
          const inputCsvFields = results?.meta?.fields ?? [];
          const formatCorrect = priorityFields.every((field) =>
            inputCsvFields?.includes(field as string)
          );
          if (!formatCorrect) {
            handleUploadError("Error parsing lines 1 to 2");
            return;
          }

          // Set csv fields for use in dumping

          const parsedData = results.data.map((row: any, index) => {
            return { ...row, Id: index, Selected: 0 } as PriorityRecord;
          });
          setPrioritiesData(parsedData);
          localStorage.setItem(
            PRIORITY_DATA_LOCAL_STORAGE_KEY,
            JSON.stringify(parsedData)
          );
        },
        error: (_: any, __: any) => {
          handleUploadError("Error parsing lines 1 to 2");
        },
      });

      // Line 3 to 12
      const defenseText = lines.slice(2, 12).join("\n");
      // Parse defense data
      Papa.parse(defenseText, {
        header: true,
        complete: (results) => {
          const formatCorrect = actionFields.every((field) =>
            results.meta.fields?.includes(field as string)
          );
          if (!formatCorrect) {
            handleUploadError("Error parsing lines 3 to 12");
            return;
          }
          const parsedData = results.data.map((row: any, index) => {
            return { ...row, Id: index, Selected: 0 } as DefenseRecord;
          });
          setDefenseData(parsedData);
          localStorage.setItem(
            DEFENSE_DATA_LOCAL_STORAGE_KEY,
            JSON.stringify(parsedData)
          );
        },
        error: (_: any, __: any) => {
          handleUploadError("Error parsing lines 3 to 12");
        },
      });

      // Line 13 to 25
      const supportText = lines.slice(12, 25).join("\n");
      Papa.parse(supportText, {
        header: true,
        complete: (results) => {
          const formatCorrect = actionFields.every((field) =>
            results.meta.fields?.includes(field as string)
          );
          if (!formatCorrect) {
            handleUploadError("Error parsing lines 13 to 25");
            return;
          }
          const parsedData = results.data.map((row: any, index) => {
            return { ...row, Id: index, Selected: 0 } as SupportRecord;
          });
          setSupportData(parsedData);
          localStorage.setItem(
            SUPPORT_DATA_LOCAL_STORAGE_KEY,
            JSON.stringify(parsedData)
          );
        },
        error: (_: any, __: any) => {
          handleUploadError("Error parsing lines 13 to 25");
        },
      });

      // Remaining lines
      const facilitiesText = lines.slice(25).join("\n");
      Papa.parse(facilitiesText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const formatCorrect = actionFields.every((field) =>
            results.meta.fields?.includes(field as string)
          );
          if (!formatCorrect) {
            handleUploadError("Error parsing lines 25 to end");
            return;
          }
          const parsedData = results.data.map((row: any, index) => {
            return { ...row, Id: index, Selected: 0 } as FacilitiesRecord;
          });
          setFacilitiesData(parsedData);
          localStorage.setItem(
            FACILITIES_DATA_LOCAL_STORAGE_KEY,
            JSON.stringify(parsedData)
          );
        },
        error: (_: any, __: any) => {
          handleUploadError("Error parsing lines 25 to end");
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
    if (!hasData) return;

    const csv1 = Papa.unparse(prioritiesData, {
      delimiter: ",",
      columns: CSV_FIELDS,
      header: true,
    })

    const csv2 = Papa.unparse(defenseData, {
      delimiter: ",",
      columns: CSV_FIELDS,
      header: true,
    });

    const csv3 = Papa.unparse(supportData, {
      delimiter: ",",
      columns: CSV_FIELDS,
      header: true,
    });

    const csv4 = Papa.unparse(facilitiesData, {
      delimiter: ",",
      columns: CSV_FIELDS,
      header: true,
    });

    const csv = `${csv1}\n${csv2}\n${csv3}\n${csv4}`;
    const { success, message } = csvToWorkbookDownload(csv);
    if (success) {
      handleDownloadSuccess();
    } else {
      handleDownloadError(message);
    }
  };

  // Data update handlers
  const handlePriorityDataUpdate = (id: number, key: keyof PriorityRecord, value: any) => {
    setPrioritiesData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
    );
    // Write to local storage
    localStorage.setItem(
      PRIORITY_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify(prioritiesData)
    );
  }

  const handleDefenseDataUpdate = (id: number, key: keyof DefenseRecord, value: any) => {
    setDefenseData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
    );
    // Write to local storage
    localStorage.setItem(
      DEFENSE_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify(defenseData)
    );
  }

  const handleSupportDataUpdate = (id: number, key: keyof SupportRecord, value: any) => {
    setSupportData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
    );
    // Write to local storage
    localStorage.setItem(
      SUPPORT_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify(supportData)
    );
  }

  const handleFacilitiesDataUpdate = (id: number, key: keyof FacilitiesRecord, value: any) => {
    setFacilitiesData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
    );
    // Write to local storage
    localStorage.setItem(
      FACILITIES_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify(facilitiesData)
    );
  }

  return {
    // Data status
    hasData,

    // Data
    prioritiesData,
    defenseData,
    supportData,
    facilitiesData,

    // Data update handlers
    handlePriorityDataUpdate,
    handleDefenseDataUpdate,
    handleSupportDataUpdate,
    handleFacilitiesDataUpdate,

    // Handlers for CSV upload/download result
    handleExcelWorkbookUpload,
    handleCsvDownload,

    // Messages currently active
    successMessage,
    errorMessage,
  };
};
