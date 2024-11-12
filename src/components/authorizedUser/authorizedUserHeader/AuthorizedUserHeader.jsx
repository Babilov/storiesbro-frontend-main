import React, {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

import logo from "./images/logo.png";
import menu from "./images/menu.svg";
import AdminLeftSideBar from "../../AuthorizedAdmin/adminLeftSideBar/AdminLeftSideBar";
import ExitMenu from "./exitMenu/ExitMenu";
import AuthorizedCustomerLeftSidebar
    from "../../AuthorizedCustomer/authorizedCustomerLeftSidebar/AuthorizedCustomerLeftSidebar";

const AuthorizedUserHeader = ({ismainpage = false, isCustomer}) => {
    const [open, setOpen] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const accountStatus = localStorage.getItem('statusAccount');
    const navigateToHelp = () => navigate(accountStatus === 'customer' ? "/customer-help" : "/admin-help");

    return (
        <Grid container sx={{alignItems: "center", justifyContent: "space-between", mb: 3}}>
            {/* Логотип */}
            <Grid
                item
                lg={1}
                sm={5}
                order={{xs: 2, lg: 1}}
                sx={{display: "flex", justifyContent: "center"}}
            >
                <Box component="img" alt="logo" src={logo} sx={{
                    width: {xs: "50px", md: "80px"}, m: "5px 10px",
                    cursor: "pointer",
                }}
                     onClick={navigateToHelp}/>
            </Grid>

            {/* Иконка меню */}
            <Grid
                item
                xs={2}
                sx={{
                    height: {xs: "20px"},
                    display: {
                        xs: "block",
                        lg: "none",
                    },
                    cursor: "pointer",
                }}
                component="img"
                alt="menu"
                src={menu}
                order={{xs: 1}}
                onClick={() => setLeftSidebarOpen(true)}
            />

            {/* Средняя часть (например, для Switcher) */}
            {/* <Grid
        item
        lg={8}
        xs={12}
        order={{ xs: 3, lg: 2 }}
        sx={{
          background: {
            xs: "white",
            lg: "white",
          },
          height: { xs: "50px", sm: "auto" },
          display: ismainpage ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Switcher ismainpage={ismainpage} /> 
      </Grid> */}

            {/* Правая часть (выход и баланс) */}
            <Grid
                item
                lg={ismainpage ? 2 : 10}
                xs={2}
                order={{xs: 4, lg: 3}}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: ismainpage ? "70%" : "14%",
                        display: {xs: "none", lg: "block"},
                    }}
                >
                    {/* <MyButton options={{ background: "#E37E31", color: "white" }}>
            <Link to="/cash" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white" }}>Пополнить</Typography>
            </Link>
          </MyButton> */}
                </Box>
                <Typography sx={{display: {xs: "none", lg: "block"}}}>
                    0₽
                </Typography>
                <ExitMenu open={open} setOpen={setOpen}/>
            </Grid>

            {/* Боковые меню */}
            <AdminLeftSideBar
                open={!isCustomer && leftSidebarOpen}
                setOpen={setLeftSidebarOpen}
            />
            <AuthorizedCustomerLeftSidebar
                open={isCustomer && leftSidebarOpen}
                setOpen={setLeftSidebarOpen}
            />
        </Grid>
    );
};

export default AuthorizedUserHeader;
