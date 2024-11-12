import React from "react";
import { Box, Modal, Typography } from "@mui/material";

const MyModal = ({
  children,
  width = "30%",
  title,
  titleFont,
  isFormOpen,
  setIsFormOpen,
}) => {
  return (
    <Modal
      open={isFormOpen}
      onClose={setIsFormOpen}
      sx={{
        width: width,
        m: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "white",
          display: "flex",
          flexDirection: "column",
          p: "20px 40px",
          borderRadius: "20px",
          outline: "none",
        }}
      >
        {title && (
          <Typography
            sx={{
              mb: 3,
              mt: 2,
              textAlign: "center",
              fontWeight: 600,
              fontSize: titleFont ? titleFont : "38px",
            }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default MyModal;
