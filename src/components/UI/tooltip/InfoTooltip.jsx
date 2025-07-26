import React, { useState, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const YellowCircle = styled("div")(({ size }) => ({
  width: size,
  height: size,
  borderRadius: "50%",
  backgroundColor: "#ffc107",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: 16,
  color: "#fff",
  cursor: "pointer",
  lineHeight: 1,
  userSelect: "none",
}));

const InfoTooltip = ({ tooltipText, placement = "bottom", size }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const theme = useTheme();

  // Определяем брейкпоинты MUI
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

  // Определяем размер в зависимости от брейкпоинта или берем переданный
  const responsiveSize = size ?? (isXs ? 12 : isMd ? 15 : 19); // fallback

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <YellowCircle
          ref={anchorRef}
          size={responsiveSize}
          onClick={handleClick}
        >
          ?
        </YellowCircle>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement={placement}
          sx={{ opacity: 1, zIndex: theme.zIndex.tooltip }}
        >
          <div
            style={{
              padding: "8px 12px",
              background: "#333",
              color: "#fff",
              borderRadius: 4,
              maxWidth: 200,
              opacity: 1,
            }}
          >
            <Typography variant="body2">{tooltipText}</Typography>
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default InfoTooltip;
