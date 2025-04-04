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
  actionFields,
  DefenseRecord,
  FacilitiesRecord,
  priorityFields,
  PriorityRecord,
  SupportRecord,
} from "../types/records";

const PRIORITY_DATA_LOCAL_STORAGE_KEY =
  "actions-data-priority-regional-share-design";
const DEFENSE_DATA_LOCAL_STORAGE_KEY =
  "actions-data-defense-regional-share-design";
const SUPPORT_DATA_LOCAL_STORAGE_KEY =
  "actions-data-support-regional-share-design";
const FACILITIES_DATA_LOCAL_STORAGE_KEY =
  "actions-data-facilities-regional-share-design";

export interface useActionsDataProps {
  handleCsvUploadError: () => void;
  handleCsvUploadSuccess: () => void;
}

export const DEFAULT_LOCAL_DIRECTORY =
  "C:/repos/test-offline-app/offline-app/sample-data/";
export const FILE_NAME = "actions-data.csv";

export const useActionsData = (props: useActionsDataProps) => {
  // Four pieces of raw data
  const [prioritiesData, setPrioritiesData] = useState<PriorityRecord[]>([]);
  const [defenseData, setDefenseData] = useState<DefenseRecord[]>([]);
  const [supportData, setSupportData] = useState<SupportRecord[]>([]);
  const [facilitiesData, setFacilitiesData] = useState<FacilitiesRecord[]>([]);

  // console.log("prioritiesData", prioritiesData);
  // console.log("defenseData", defenseData);
  // console.log("supportData", supportData);
  // console.log("facilitiesData", facilitiesData);

  const hasData = useMemo(() => {
    return (
      prioritiesData?.length > 0 &&
      defenseData?.length > 0 &&
      supportData?.length > 0 &&
      facilitiesData?.length > 0
    );
  }, [prioritiesData, defenseData, supportData, facilitiesData]);

  // CSV Upload: populate rawData.current and produce table data
  const handleCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split("\n").map((line) => line.trim());

      // Line 1 to 2
      const prioritiesText = lines.slice(0, 2).join("\n");
      // Parse priorities data
      Papa.parse(prioritiesText, {
        header: true,
        complete: (results) => {
          const formatCorrect = priorityFields.every((field) =>
            results?.meta?.fields?.includes(field as string)
          );
          if (!formatCorrect) {
            props.handleCsvUploadError();
            return;
          }
          const parsedData = results.data.map((row: any, index) => {
            return { ...row, Id: index, Selected: 0 } as PriorityRecord;
          });
          setPrioritiesData(parsedData);
          localStorage.setItem(
            PRIORITY_DATA_LOCAL_STORAGE_KEY,
            JSON.stringify(parsedData)
          );
          props.handleCsvUploadSuccess();
        },
        error: (_: any, __: any) => {
          props.handleCsvUploadError();
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
            props.handleCsvUploadError();
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
          props.handleCsvUploadError();
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
            props.handleCsvUploadError();
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
          props.handleCsvUploadError();
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
            props.handleCsvUploadError();
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
          props.handleCsvUploadError();
        },
      });
    };

    reader.readAsText(file);
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  // CSV Download: download rawData.current as CSV file
  const handleCsvDownload = () => {
    return;
    // const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");

    // link.href = url;
    // link.setAttribute("download", FILE_NAME);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);
  };

  // Data update handlers
  const handlePriorityDataUpdate = (id: number, key: keyof PriorityRecord, value: any) => {
    setPrioritiesData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
    );
  }

  const handleDefenseDataUpdate = (id: number, key: keyof DefenseRecord, value: any) => {
    setDefenseData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
    );
  }

  const handleSupportDataUpdate = (id: number, key: keyof SupportRecord, value: any) => {
    setSupportData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
    );
  }

  const handleFacilitiesDataUpdate = (id: number, key: keyof FacilitiesRecord, value: any) => {
    setFacilitiesData((prevData) =>
      prevData.map((row) => (row.Id === id ? { ...row, [key]: value } : row))
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
    handleCsvUpload,
    handleCsvDownload,
  };
};
