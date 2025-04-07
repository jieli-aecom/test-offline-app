import { SidebarLayout } from "../../components/sidebar-layout";
import { Sidebar } from "./components/sidebar";
import { useActionsData } from "./hooks/use-actions-data";
import { MainView } from "./components/main-view";

export const PlannedActions = () => {
  const {
    hasData,
    prioritiesData,
    defenseData,
    supportData,
    facilitiesData,
    handlePriorityDataUpdate,
    handleDefenseDataUpdate,
    handleSupportDataUpdate,
    handleFacilitiesDataUpdate,
    handleExcelWorkbookUpload,
    handleCsvDownload,
    successMessage,
    errorMessage
  } = useActionsData();
  return (
    <SidebarLayout
      sidebarContent={
        <Sidebar
          hasData={hasData}
          handleExcelWorkbookUpload={handleExcelWorkbookUpload}
          handleCsvDownload={handleCsvDownload}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      }
      mainContent={
        <MainView
          hasData={hasData}
          priorityData={prioritiesData}
          defenseData={defenseData}
          supportData={supportData}
          facilitiesData={facilitiesData}
          handleUpdatePriorityData={handlePriorityDataUpdate}
          handleUpdateDefenseData={handleDefenseDataUpdate}
          handleUpdateSupportData={handleSupportDataUpdate}
          handleUpdateFacilitiesData={handleFacilitiesDataUpdate}
        />
      }
    ></SidebarLayout>
  );
};
