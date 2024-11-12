import React, {useContext} from "react";
import {Box, Grid, Typography} from "@mui/material";

import "../../../styles/font.css";
import "../../../styles/colors.css";
import logo from "../../../images/icons/commonIcons/logo.png";
import blackLogo from "../../../images/icons/commonIcons/blackLogo.svg";
import enter from "../../../images/icons/landingIcons/enter.svg";
import {Context} from "../../../context/Context";
import Switcher from "../../UI/switcher/Switcher";
import {useNavigate} from "react-router-dom";

const Header = ({setIsLoginFormOpen, ismainpage}) => {
    const [isCustomer, _] = useContext(Context);
    const navigate = useNavigate();
    return (
        <Grid
            container
            sx={{
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "none",
                background: isCustomer ? "#161616" : "white",
            }}
        >
            <Grid
                item
                component="img"
                alt="logo"
                src={isCustomer ? blackLogo : logo}
                sx={{
                    width: {xs: "50px", md: "80px"}, m: "10px",
                }}
                order={{xs: 2, sm: 1}}
            />
            <Grid
                item
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    justifyContent: "center",
                    height: {xs: "50px", sm: "auto"},
                    background: {
                        xs: isCustomer ? "#292929" : "white",
                        sm: isCustomer ? "#161616" : "white",
                    },
                }}
                order={{xs: 1, sm: 2}}
                xs={12}
                sm={8}
            >
                {/* <Switcher ismainpage={ismainpage} /> */}
            </Grid>
            <Grid
                item
                sx={{display: "flex", alignItems: "center", cursor: "pointer"}}
                onClick={() => setIsLoginFormOpen(true)}
                order={{xs: 3, sm: 3}}
            >
                <Typography
                    className="orange"
                    sx={{fontSize: {sm: "22px", xs: "15px"}, fontWeight: 500, mr: 1}}
                >
                    Войти
                </Typography>
                <Box
                    component="img"
                    alt="enter"
                    src={enter}
                    sx={{
                        width: {xs: "15px", sm: "35px"},
                        height: {xs: "15px", sm: "36px"},
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Header;
