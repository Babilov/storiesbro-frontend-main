import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Box, ClickAwayListener, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

import exit from "../images/exit.svg";
import settings from "../images/settings.svg";

const handleExit = () => {
  localStorage.clear();
};

const ExitMenu = ({ open, setOpen }) => {
  return (
    <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <>
          <PersonIcon
            onClick={() => setOpen(!open)}
            sx={{ cursor: "pointer" }}
          />

          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "120%",
              zIndex: 1,
              background: "white",
              border: "1px solid rgba(217, 217, 217, 1)",
              borderRadius: "10px",
              width: "200px",
              display: open ? "block" : "none",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                height: "50px",
              }}
            >
              <Box
                component="img"
                alt="settings"
                src={settings}
                sx={{ mr: 1, ml: 1 }}
              />
              <NavLink to="/profile" className="linkItem">
                Настройки
              </NavLink>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center", height: "50px" }}>
              <Box
                component="img"
                alt="exit"
                src={exit}
                sx={{ mr: 1, ml: 1 }}
              />
              <NavLink to="/" onClick={handleExit} className="linkItem">
                Выйти
              </NavLink>
            </Box>
          </Box>
        </>
      </ClickAwayListener>
    </>
  );
};

export default ExitMenu;
