import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import logo from "../../../images/icons/commonIcons/logo.png";
import humanProfile from "../../../images/icons/humanProfile.svg";
import RightSideBar from "./sidebars/RightSideBar";

import "./sidebars/sidebarStyles/style.css";
import AdminLeftSideBar from "../../AuthorizedAdmin/adminLeftSideBar/AdminLeftSideBar";
import { API_URL } from "../../../constants/constatns";
import { fetchWithAuth } from "../../../api/token";
import { useBalance } from "../../../context/BalancContext";

const ProfileHeader = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const { balance, setBalance } = useBalance();

  const navigate = useNavigate();

  useEffect(() => {
    const getMoney = async () => {
      const res = await fetchWithAuth(`${API_URL}payments/get_user_balance/`);
      setBalance(Math.floor(res.balance));
    };
    getMoney();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { md: "0 130px", xs: "0 16px" },
        height: "80px",
      }}
    >
      {/* Левый блок — меню */}
      <MenuIcon
        sx={{
          position: "absolute",
          left: { md: 130, xs: 16 },
          cursor: "pointer",
        }}
        onClick={() => setLeftSidebarOpen(true)}
      />
      <AdminLeftSideBar open={leftSidebarOpen} setOpen={setLeftSidebarOpen} />

      {/* Центр — логотип */}
      <Box
        component="img"
        alt="logo"
        src={logo}
        sx={{
          width: { xs: "50px", md: "80px" },
          cursor: "pointer",
        }}
        onClick={() =>
          navigate(
            localStorage.getItem("statusAccount") === "customer"
              ? "/customer-help"
              : "/admin-help"
          )
        }
      />

      {/* Правый блок — баланс и профиль */}
      <Box
        sx={{
          position: "absolute",
          right: { md: 130, xs: 16 },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography sx={{ display: { lg: "block", xs: "none" } }}>
          {balance}₽
        </Typography>
        <Box
          component="img"
          alt="profile"
          src={humanProfile}
          onClick={() => setRightSidebarOpen(true)}
          sx={{ cursor: "pointer" }}
        />
        <RightSideBar open={rightSidebarOpen} setOpen={setRightSidebarOpen} />
      </Box>
    </Box>
  );
};

export default ProfileHeader;
