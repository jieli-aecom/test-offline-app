import { useState } from "react";
import { SidebarLayout } from "../../components/sidebar-layout";
import { Sidebar } from "./components/sidebar";
import { useActionsData } from "./hooks/use-actions-data";
import { MainView } from "./components/main-view";

export const PlannedActions = () => {
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
    prioritiesData,
    defenseData,
    supportData,
    facilitiesData,
    handlePriorityDataUpdate,
    handleDefenseDataUpdate,
    handleSupportDataUpdate,
    handleFacilitiesDataUpdate,
    handleCsvUpload,
    handleCsvDownload,
  } = useActionsData({
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
          showCsvUploadError={showCsvUploadError}
          showCsvUploadSuccess={showCsvUploadSuccess}
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
