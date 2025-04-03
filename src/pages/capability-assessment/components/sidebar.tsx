import { useRef, useState } from "react";
import { ButtonFilterBox } from "../../../components/button-filter-box";
import { Button, IconButton, TextField, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { styled } from "@mui/material/styles";
import { ContentCopy } from "@mui/icons-material";
import {
  DEFAULT_LOCAL_DIRECTORY,
  useCapacitiesData,
} from "../hooks/use-capacities-data";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Sidebar = () => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [localPath, setLocalPath] = useState<string>(DEFAULT_LOCAL_DIRECTORY);

  const [showCopied, setShowCopied] = useState(false);
  const [showCsvUploadError, setShowCsvUploadError] = useState(false);
  const [showCsvUploadSuccess, setShowCsvUploadSuccess] = useState(false);

  // Filter states
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleUploadClick = () => {
    // Reset the input value to allow re-uploading the same file
    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  };

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

  const handleCopyPath = () => {
    navigator.clipboard.writeText(localPath).then(() => {
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 3000);
    });
  };

  const { data, handleCsvUpload, handleCsvDownload } = useCapacitiesData({
    handleCsvUploadError,
    handleCsvUploadSuccess,
  });

  const hasData = data?.length > 0;

  return (
    <div className="p-4 py-8 w-full flex flex-col gap-10">
      {/* File upload section */}
      <div className="w-full flex flex-col gap-2">
        {/* Default path */}
        <div className="w-full flex gap-2 items-center">
          <TextField
            id="default-local-file-path"
            label="Local File Directory"
            size="small"
            sx={{ fontSize: "0.9rem" }}
            value={localPath}
            onChange={(e) => setLocalPath(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <IconButton
            sx={{ width: "2rem", height: "2rem" }}
            area-label="copy path"
            title="Copy path"
            onClick={handleCopyPath}
          >
            <ContentCopy color="primary" sx={{ fontSize: 18 }} />
          </IconButton>
        </div>

        {/* Upload button */}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          className="w-full"
          onClick={handleUploadClick}
        >
          Upload File
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            ref={uploadInputRef}
          />
        </Button>
      </div>

      <div className="fixed top-0 left-0 right-0 flex justify-center z-1000 p-4">
        {showCopied && (
          <Alert severity="success">Local file directory copied.</Alert>
        )}
        {showCsvUploadSuccess && (
          <Alert severity="success">Data upload successful.</Alert>
        )}
        {showCsvUploadError && (
          <Alert severity="error">
            The uploaded file does not have the correct format.
          </Alert>
        )}
      </div>

      <ButtonFilterBox
        title="Filter"
        values={["aaa", "bbb", "ccc"]}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
      />

      {/* Download data */}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        startIcon={<CloudDownloadIcon />}
        className="w-full"
        onClick={handleCsvDownload}
        disabled={!hasData}
      >
        Dump Data
      </Button>
    </div>
  );
};
