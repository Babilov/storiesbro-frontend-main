import React from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";

const YellowCircle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: "#FFEB3B", // ярко-жёлтый
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default",
}));

const InfoTooltip = () => {
  const tooltipText =
    "Статистика с сообществ приходит в течении 24–72 часов после публикации историй. В даты, когда сообщество не монетизируется — статистика не отображается.";

  return (
    <Tooltip title={tooltipText} arrow placement="top">
      <YellowCircle>
        <InfoOutlinedIcon fontSize="small" sx={{ color: "#000" }} />
      </YellowCircle>
    </Tooltip>
  );
};

export default InfoTooltip;
