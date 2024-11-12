import { Typography } from "@mui/material";
import React from "react";

const ErrorMessage = ({ error, errorMessage }) => {
  return (
    error && (
      <Typography
        sx={{
          color: "#D25D48",
          fontSize: "16px",
          fontWeight: 400,
          mb: 2,
          mt: 1,
        }}
      >
        {errorMessage}
      </Typography>
    )
  );
};
export default ErrorMessage;
