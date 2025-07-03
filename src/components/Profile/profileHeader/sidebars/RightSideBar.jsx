import React from "react";
import { Box, Divider, Modal } from "@mui/material";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";

import cross from "./sidebarIcons/cross.svg";
import exit from "./images/exit.svg";

const RightSideBar = ({ open, setOpen }) => {
  const handleExit = () => {
    localStorage.clear();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          width: "240px",
          height: "100vh",
          background: "white",
          right: 0,
          p: 5,
          outline: "none",
        }}
      >
        <Box
          component="img"
          alt="cross"
          src={cross}
          sx={{ position: "absolute", top: 15, left: 15, cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />
        <NavLink
          className="navLink menuItem"
          to="/profile"
          onClick={() => setOpen(false)}
        >
          <PersonIcon className="menuIcon" sx={{ mr: 1 }} />
          Данные пользователя
        </NavLink>
        <Divider />
        <NavLink
          className="navLink menuItem"
          to="/cash"
          onClick={() => setOpen(false)}
        >
          <PaymentsIcon className="menuIcon" sx={{ mr: 1 }} />
          Вывод
        </NavLink>
        <Divider />

        <NavLink
          className="navLink menuItem"
          to="/password"
          onClick={() => setOpen(false)}
        >
          <LockIcon className="menuIcon" sx={{ mr: 1 }} />
          Изменение пароля
        </NavLink>
        <Divider />
        {/* 
        <NavLink
          className="navLink menuItem"
          to="/alerts"
          onClick={() => setOpen(false)}
        >
          <SettingsIcon className="menuIcon" sx={{ mr: 1 }} />
          Настройка уведомлений
        </NavLink>
        <Divider />
        
        <NavLink
          className="navLink menuItem"
          to="/history"
          onClick={() => setOpen(false)}
        >
          <NotificationsIcon className="menuIcon" sx={{ mr: 1 }} />
          История уведомлений
        </NavLink>
        <Divider />
        */}
        <NavLink className="navLink menuItem" to="/" onClick={handleExit}>
          <Box component="img" alt="exit" src={exit} sx={{ mr: 1, ml: 1 }} />
          Выйти
        </NavLink>
      </Box>
    </Modal>
  );
};

export default RightSideBar;
