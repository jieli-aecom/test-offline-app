import { SidebarLayout } from "../../components/sidebar-layout";
import { Sidebar } from "./components/sidebar";
import { useCapacitiesData } from "./hooks/use-capacities-data";
import { capacityAssessmentTableDefinitions } from "./types/table";
import { MainView } from "./components/main-view";

export const CapabilityAssessment = () => {
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

    // Table attribute update handler
    updateTableAttribute,

    // Messages
    successMessage,
    errorMessage,
  } = useCapacitiesData();

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
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      }
      mainContent={
        <MainView
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
          handleUpdateTableAttribute={updateTableAttribute}
        />
      }
    />
  );
};
