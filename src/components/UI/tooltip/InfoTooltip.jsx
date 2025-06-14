import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";

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
}));

const InfoTooltip = ({ tooltipText, placement, size = 24 }) => {
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function getResponsiveSize() {
    const width = window.innerWidth;
    if (width < 400) return 12;
    if (width < 768) return 15;
    return 19;
  }

  useEffect(() => {
    const handleResize = () => {
      setCircleSize(getResponsiveSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [circleSize, setCircleSize] = useState(getResponsiveSize());

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <YellowCircle ref={anchorRef} size={circleSize} onClick={handleClick}>
          ?
        </YellowCircle>
        <Popper open={open} anchorEl={anchorRef.current} placement={placement}>
          <div
            style={{
              padding: "8px 12px",
              background: "#333",
              color: "#fff",
              borderRadius: 4,
              maxWidth: 300,
              p: "10px, 20px",
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
