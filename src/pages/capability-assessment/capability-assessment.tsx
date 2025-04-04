import { useState } from "react";
import { SidebarLayout } from "../../components/sidebar-layout";
import { Sidebar } from "./components/sidebar";
import { useCapacitiesData } from "./hooks/use-capacities-data";
import { DataViewArea } from "./components/data-view-area";
import {  capacityAssessmentTableDefinitions } from "./types/table";

export const CapabilityAssessment = () => {
  const [showCsvUploadError, setShowCsvUploadError] = useState(false);
  const [showCsvUploadSuccess, setShowCsvUploadSuccess] = useState(false);
  const handleCsvUploadError = () => {
    setShowCsvUploadError(true);
    setTimeout(() => {
      setShowCsvUploadError(false);
    }, 3000);
  };

  const handleCsvUploadSuccess = () => {
    setShowCsvUploadSuccess(true);
    setTimeout(() => {
      setShowCsvUploadSuccess(false);
    }, 3000);
  };
  const {
    hasData,
    dataLength,
    tableView,
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

    // Pagination states
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  } = useCapacitiesData({
    handleCsvUploadError,
    handleCsvUploadSuccess,
  });

  return (
    <SidebarLayout
      sidebarContent={
        <Sidebar
          hasData={hasData}
          handleCsvUpload={handleCsvUpload}
          handleCsvDownload={handleCsvDownload}
          selectedIncStatuses={selectedIncStatuses}
          setSelectedIncStatuses={setSelectedIncStatuses}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedDomains={selectedDomains}
          setSelectedDomains={setSelectedDomains}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          showCsvUploadError={showCsvUploadError}
          showCsvUploadSuccess={showCsvUploadSuccess}
        />
      }
      mainContent={
        <DataViewArea
          hasData={hasData}
          dataLength={dataLength}
          tableView={tableView}
          columnDefinitions={capacityAssessmentTableDefinitions}
          order={order}
          setOrder={setOrder}
          orderBy={orderByColId}
          setOrderBy={setOrderByColId}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      }
    />
  );
};
