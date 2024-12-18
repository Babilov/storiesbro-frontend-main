import { styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React from "react";

const CustomToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: "-4px",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    fontSize: "16px",
    padding: "12px 16px",
    borderRadius: "8px",
    marginTop: "-10px",
    transformOrigin: "center top",
  },
}));

export default CustomToolTip;
