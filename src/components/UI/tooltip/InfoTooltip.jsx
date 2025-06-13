import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const YellowCircle = styled("div")(() => ({
  width: 24,
  height: 24,
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

const InfoTooltip = () => {
  const tooltipText =
    "Статистика с сообществ приходит в течении 24–72 часов после публикации историй. В даты, когда сообщество не монетизируется — статистика не отображается.";

  return (
    <Tooltip title={tooltipText} arrow placement="top">
      <YellowCircle>?</YellowCircle>
    </Tooltip>
  );
};

export default InfoTooltip;
