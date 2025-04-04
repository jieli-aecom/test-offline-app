import { Alert, Button, IconButton, styled, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DEFAULT_LOCAL_DIRECTORY } from "../hooks/use-actions-data";
import { ContentCopy } from "@mui/icons-material";

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

export interface SidebarProps {
  hasData: boolean;
  handleCsvUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCsvDownload: () => void;
  showCsvUploadError: boolean;
  showCsvUploadSuccess: boolean;
}

export function Sidebar(props: SidebarProps) {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [localPath, setLocalPath] = useState<string>(DEFAULT_LOCAL_DIRECTORY);

  const [showCopied, setShowCopied] = useState(false);

  const handleUploadClick = () => {
    // Reset the input value to allow re-uploading the same file
    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText(localPath).then(() => {
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 3000);
    });
  };
  return (
    <div className="p-4 py-8 w-full h-full flex flex-col gap-4">
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
          LOAD DATA
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={props.handleCsvUpload}
            ref={uploadInputRef}
          />
        </Button>
      </div>

      {/* Alerts */}
      <div className="fixed top-0 left-0 right-0 flex justify-center z-1000 p-4">
        {showCopied && (
          <Alert severity="success">Local file directory copied.</Alert>
        )}
        {props.showCsvUploadSuccess && (
          <Alert severity="success">Data upload successful.</Alert>
        )}
        {props.showCsvUploadError && (
          <Alert severity="error">
            The uploaded file does not have the correct format.
          </Alert>
        )}
      </div>

      <div className="grow"></div>

      {/* Download data */}
      <div className="w-full flex flex-col gap-2">
        {/* Default path */}
        <div className="w-full flex gap-2 items-center">
          <TextField
            id="default-local-file-path-repeat"
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
        <Button
          component="label"
          role={undefined}
          variant="contained"
          startIcon={<CloudDownloadIcon />}
          className="w-full"
          onClick={props.handleCsvDownload}
          disabled={!props.hasData}
        >
          Dump Data
        </Button>
      </div>
    </div>
  );
}
