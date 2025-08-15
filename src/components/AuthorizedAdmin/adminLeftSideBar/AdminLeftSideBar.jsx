import { Box, Divider, Modal, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import list from "./images/list.svg";
import question from "./images/question.svg";
import tagUser from "./images/tagUser.svg";
import logo from "./images/logo.png";
import cross from "./images/cross.svg";
import trend from "./images/trend.svg";
import moneys from "./images/moneys.svg";

const AdminLeftSideBar = ({ open, setOpen }) => {
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
            justifyContent: "space-between",
          }}
        >
          <Box
            component="img"
            alt="logo"
            src={logo}
            sx={{
              width: { xs: "45px" },
              m: "10px 10px 15px",
            }}
          />{" "}
          {/* check */}
          <Box
            component="img"
            alt="cross"
            src={cross}
            onClick={() => setOpen(false)}
            sx={{
              cursor: "pointer",
              mr: "15px",
              width: "15px",
            }}
          />
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
          {/* <Box sx={{ width: "75%" }}>
            <MyButton options={{ background: "#E37E31", color: "white" }}>
            <Link to="/cash" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white" }}>Пополнить</Typography>
            </Link>
            </MyButton>
          </Box> */}
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
              alt="list"
              src={list}
              sx={{ mr: 1, fontSize: "22px" }}
            />
            <NavLink
              to="/publics"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Мои сообщества
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              alt="trend"
              src={trend}
              sx={{ mr: 1, fontSize: "22px" }}
            />
            <NavLink
              to="/statistic"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Статистика
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box component="img" alt="moneys" src={moneys} sx={{ mr: 1 }} />
            <NavLink
              to="/referal"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Реф. система
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              alt="question"
              src={question}
              sx={{ mr: 1, fontSize: "22px" }}
            />
            <NavLink
              to="/admin-help"
              className="menuItem"
              onClick={() => setOpen(false)}
            >
              Помощь
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              alt="tagUser"
              src={tagUser}
              sx={{ mr: 1, fontSize: "22px" }}
            />
            <NavLink
              to="/support"
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

export default AdminLeftSideBar;
