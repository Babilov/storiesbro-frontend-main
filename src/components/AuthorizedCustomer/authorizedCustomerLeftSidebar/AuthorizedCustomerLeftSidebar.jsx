import { Box, Divider, Modal, Typography } from "@mui/material";
import React from "react";
import { NavLink, Link } from "react-router-dom";

import clipboardText from "./images/clipboardText.svg";
import flashCircle from "./images/flashCircle.svg";
import lock from "./images/lock.svg";
import messageQuestion from "./images/messageQuestion.svg";
import moneys from "./images/moneys.svg";
import tagUser from "./images/tagUser.svg";
import logo from "./images/logo.svg";
import cross from "./images/cross.svg";
import MyButton from "../../UI/buttons/MyButton";

const AuthorizedCustomerLeftSidebar = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: "240px",
        height: "100vh",
        background: "white",
      }}
    >
      <Box sx={{ background: "white", outline: "none" }}>
        <Box
          sx={{
            width: "100%",
            display: { xs: "flex", lg: "none" },
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            alt="cross"
            src={cross}
            onClick={() => setOpen(false)}
            sx={{ cursor: "pointer", mr: 2, ml: 1 }}
          />
          <Box component="img" alt="logo" src={logo} />
        </Box>
        <Divider sx={{ display: { xs: "flex", lg: "none" } }} />
        <Box
          sx={{
            mt: 2,
            ml: 2,
            display: { xs: "flex", flexDirection: "column", lg: "none" },
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", fontWeight: 400 }}
          >
            0
            <Typography component="span" sx={{ fontWeight: 600 }}>
              ₽
            </Typography>
          </Typography>
          <Box sx={{ width: "75%" }}>
            <MyButton options={{ background: "#E37E31", color: "white" }}>
              <Link to="/cash" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "white" }}>Пополнить</Typography>
              </Link>
            </MyButton>
          </Box>
        </Box>
        <Box
          sx={{
            background: "white",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            pt: { xs: 2, lg: 20 },
            pl: 2,
            outline: "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              alt="flashCircle"
              src={flashCircle}
              sx={{ mr: 1 }}
            />
            <NavLink
              to="/creatives"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Креативы
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box component="img" alt="lock" src={lock} sx={{ mr: 1 }} />
            <NavLink
              to="/reservations"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Брони
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              alt="clipboardText"
              src={clipboardText}
              sx={{ mr: 1 }}
            />
            <NavLink
              to="/customer-publics"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Список сообществ
            </NavLink>
          </Box>

          {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box component="img" alt="moneys" src={moneys} sx={{ mr: 1 }} />
            <NavLink
              to="/customer-referal"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Реф. система
            </NavLink>
          </Box> */}

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              alt="messageQuestion"
              src={messageQuestion}
              sx={{ mr: 1 }}
            />
            <NavLink
              to="/customer-help"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Помощь
            </NavLink>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box component="img" alt="tagUser" src={tagUser} sx={{ mr: 1 }} />
            <NavLink
              to="/customer-support"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Тех. поддержка
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthorizedCustomerLeftSidebar;
