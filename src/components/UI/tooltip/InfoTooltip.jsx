import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const YellowCircle = styled("div")(({ size }) => ({
  width: { size },
  height: { size },
  borderRadius: "50%",
  backgroundColor: "#FFEB3B", // Ярко-жёлтый фон
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: 16,
  color: "#fff", // Белый цвет вопроса
  cursor: "default",
  lineHeight: 1,
}));

const InfoTooltip = ({ tooltipText, placement, size = 24 }) => {
  return (
    <Tooltip title={tooltipText} arrow placement={placement}>
      <YellowCircle size={size}>?</YellowCircle>
    </Tooltip>
  );
};

export default InfoTooltip;
