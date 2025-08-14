import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import logo from "../../../images/icons/commonIcons/logo.png";
import humanProfile from "../../../images/icons/humanProfile.svg";
import RightSideBar from "./sidebars/RightSideBar";

import "./sidebars/sidebarStyles/style.css";
import AdminLeftSideBar from "../../AuthorizedAdmin/adminLeftSideBar/AdminLeftSideBar";
import axios from "axios";
import { API_URL } from "../../../constants/constatns";

const ProfileHeader = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getMoney = async () => {
      const res = await axios.get(`${API_URL}payments/get_user_balance/`);
      console.log(res);
    };
    getMoney();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: { md: "0 130px", xs: "0 16px" },
      }}
    >
      {/*<Box sx={{display: "flex", alignItems: "center"}}> */}
      <MenuIcon
        sx={{ mr: { md: 5, xs: 2 }, cursor: "pointer" }}
        onClick={() => setLeftSidebarOpen(true)}
      />
      <AdminLeftSideBar open={leftSidebarOpen} setOpen={setLeftSidebarOpen} />
      {/*</Box>*/}
      <Box
        component="img"
        alt="logo"
        src={logo}
        sx={{
          width: { xs: "50px", md: "80px" },
          m: "5px 10px",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: { md: "15%", xs: "fit-content" },
        }}
      >
        {/*<Box sx={{width: "70%", display: {lg: "block", xs: "none"}}}>
                     <MyButton
            options={{ background: "#E68B46", color: "white", mr: 1 }}
          >
            <Link to="/cash" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white" }}>Пополнить</Typography>
            </Link>
          </MyButton>
                </Box>*/}
        <Typography sx={{ display: { lg: "block", xs: "none" } }}>
          0₽
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
