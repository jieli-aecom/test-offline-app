import Papa from "papaparse";
import { ChangeEvent, useState } from "react";
import {
  CapacityAssessmentRecord,
  CAPACITY_ASSESSMENT_KEYS,
} from "../types/CapacityAssessementRecord";
import { LOCATIONS, Location } from "../consts/locations";
import { Domain } from "../consts/domains";
import { Category } from "../consts/categories";

export interface UseCapacitiesDataProps {
  handleCsvUploadError: () => void;
  handleCsvUploadSuccess: () => void;
}

export const DEFAULT_LOCAL_DIRECTORY =
  "C:/repos/test-offline-app/offline-app/sample-data/";
export const FILE_NAME = "capacities-data.csv";

export const useCapacitiesData = (props: UseCapacitiesDataProps) => {
  // Data
  const [data, setData] = useState<CapacityAssessmentRecord[]>([]);

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    LOCATIONS[0]
  );
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

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
              ({ ...row, Id: index } as CapacityAssessmentRecord)
          );
          setData(parsedData);
          console.log(
            Array.from(
              parsedData.reduce((acc, ent) => {
                const category = ent.Category;
                acc.add(category);
                return acc;
              }, new Set<string>())
            )
          );
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
    const csv: string = Papa.unparse(data, {
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

  return {
    data,
    handleCsvUpload,
    handleCsvDownload,
    selectedLocation,
    setSelectedLocation,
    selectedDomains,
    setSelectedDomains,
    selectedCategories,
    setSelectedCategories,
  };
};
