import { useState } from "react";
import { SidebarLayout } from "../../components/sidebar-layout";
import { Sidebar } from "./components/sidebar";
import { useActionsData } from "./hooks/use-actions-data";

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

  const { handleCsvUpload, handleCsvDownload } = useActionsData({
    handleCsvUploadError,
    handleCsvUploadSuccess,
  });
  return (
    <SidebarLayout
      sidebarContent={
        <Sidebar
          hasData={false}
          handleCsvUpload={handleCsvUpload}
          handleCsvDownload={handleCsvDownload}
          showCsvUploadError={showCsvUploadError}
          showCsvUploadSuccess={showCsvUploadSuccess}
        />
      }
      mainContent={<div>Main Content</div>}
    ></SidebarLayout>
  );
};
