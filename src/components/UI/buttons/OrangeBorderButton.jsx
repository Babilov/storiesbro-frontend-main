import { Button } from "@mui/material";
import React from "react";

const OrangeBorderButton = ({ children }) => {
  return (
    <Button
      fullWidth
      sx={{
        color: "#E37E31",
        border: "1px solid #E37E31",
        background: "white",
        ":hover": {
          filter: "brightness(120%)",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default OrangeBorderButton;
