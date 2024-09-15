import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import "./styles/style.css";
import vk from "./images/vk.svg";
import avatar from "./images/avatar.svg";
import MyButton from "../../../UI/buttons/MyButton";

const CreativessBeforeEnter = ({ setAuthed }) => {
  return (
    <Box className="creatives">
      <Typography variant="h4" className="creatives__title">
        Мои сообщества
      </Typography>
      <Typography variant="body2" className="creatives__text">
        Вы не можете добавить сообщества, так как ваш аккаунт ВКонтакте не
        подключен
      </Typography>
      <Box
        sx={{ width: { xs: "50%", sm: "35%", md: "25%" }, m: "0 auto", mt: 2 }}
      >
        <MyButton
          options={{ background: "#2A5885", color: "white" }}
          onClick={() => setAuthed(true)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box component="img" alt="vk" src={vk} />
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Войти как Юрий
            </Typography>
            <Box component="img" alt="avatar" src={avatar} />
          </Box>
        </MyButton>
      </Box>
    </Box>
  );
};

export default CreativessBeforeEnter;
