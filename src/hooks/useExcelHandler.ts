import { useRef } from "react";
import { read, WorkBook, utils, writeFile } from "xlsx";

const WORKBOOK_LOCAL_STORAGE = "workbook-local-storage";
export interface DownloadReturn {
  success: boolean;
  message: string;
}

export default function useExcelHandler(focusSheetName: string) {
  const workbookRef = useRef<WorkBook>(null);

  const cacheWorkbook = (workbook: WorkBook) => {
    const cacheBySheetName: { [key: string]: string } = {};
    for (const shtName of workbook.SheetNames) {
      const sheet = workbook.Sheets[shtName];
      if (!sheet) continue;
      const csvString = utils.sheet_to_csv(sheet);
      cacheBySheetName[shtName] = csvString;
    }
    localStorage.setItem(
      WORKBOOK_LOCAL_STORAGE,
      JSON.stringify(cacheBySheetName)
    );
  };

  const csvStringToSheet = (csvString: string) => {
    const tempWorkbook = read(csvString, { type: "string" });
    const tempSheetName = tempWorkbook.SheetNames[0];
    const sheet = tempWorkbook.Sheets[tempSheetName];
    if (!sheet) {
      console.error("No sheet found in the CSV string");
      return null;
    }
    return sheet;
  };

  // Takes file-reading event, returns CSV string
  // while storing workbook in state
  const workbookToCsv = (event: ProgressEvent<FileReader>) => {
    if (!focusSheetName) {
      console.error("Sheet name is not provided");
      return;
    }

    if (!event.target || !(event.target.result instanceof ArrayBuffer)) {
      console.error("Invalid file data");
      return "";
    }

    const data = new Uint8Array(event.target.result);
    const workbook = read(data, { type: "array" });

    const sheets = workbook.SheetNames;
    if (!sheets || sheets?.length === 0) {
      console.error("No sheets found in the workbook");
      return;
    }

    workbookRef.current = workbook;
    cacheWorkbook(workbook);

    const csvString = utils.sheet_to_csv(workbook.Sheets[focusSheetName]);
    return csvString;
  };

  const csvToWorkbookDownload: (csvString: string) => DownloadReturn = (
    csvString: string
  ) => {
    if (!csvString) {
      return {
        success: false,
        message: "No data to download",
      };
    }
    const focusSheet = csvStringToSheet(csvString);
    if (!focusSheet) {
      return {
        success: false,
        message: "No data to download",
      };
    }

    if (!workbookRef.current) {
      // Initilize new workbook and add the focus sheet
      const newWorkbook = utils.book_new();
      utils.book_append_sheet(newWorkbook, focusSheet, focusSheetName);

      // Use local storage to fill the other sheets
      const workbookCacheString = localStorage.getItem(WORKBOOK_LOCAL_STORAGE);
      if (!workbookCacheString) {
        return {
          success: false,
          message: "Workbook was never initialized",
        };
      }
      const workbookCache = JSON.parse(workbookCacheString);
      for (const sheetName in workbookCache) {
        if (sheetName !== focusSheetName) {
          const otherSheet = csvStringToSheet(workbookCache[sheetName]);
          if (otherSheet) {
            utils.book_append_sheet(newWorkbook, otherSheet, sheetName);
          }
        }
      }
      workbookRef.current = newWorkbook;
      writeFile(newWorkbook, `${focusSheetName}.xlsx`);
    } else {
      // Modify the existing workbook
      workbookRef.current.Sheets[focusSheetName] = focusSheet;
      writeFile(workbookRef.current, `${focusSheetName}.xlsx`);
    }

    return {
      success: true,
      message: "File downloaded successfully",
    };
  };

  return { workbookToCsv, csvToWorkbookDownload };
}
