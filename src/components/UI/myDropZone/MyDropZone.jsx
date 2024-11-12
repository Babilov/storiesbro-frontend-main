import React from "react";
import { DropzoneArea } from "mui-file-dropzone";
import { Box } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import "./styles/style.css";

const MyDropZone = ({ isHidden, onFileChange }) => {
  const handleDropzoneChange = (files) => {
    // Передайте только путь к файлу
    if (files.length > 0) {
      const file = files[0];
    // Используйте свойство `path` или `name` в зависимости от вашего случая
    // const filePath = file.path || file.name;
    onFileChange(file);
    }
  };
  
  return (
    <Box
      sx={{ width: { md: "20%", xs: "100%" }, height: "75%" }}
      className="uploadBLock"
    >
      <DropzoneArea
        filesLimit={1}
        dropzoneClass={`dropZoneArea ${isHidden && "hidden"}`}
        dropzoneText={"загрузите фото/видео"}
        onChange={handleDropzoneChange}
        Icon={FileDownloadOutlinedIcon}
        maxFileSize={10485760}
        acceptedFiles={['image/*', 'video/*']}
      />
    </Box>
  );
};

export default MyDropZone;
