import React from "react";
import { Box, Typography } from "@mui/material";

import check from "./images/check.svg";
import MyButton from "../../UI/buttons/MyButton";
import { useNavigate } from "react-router-dom";

const ReservationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box className="grid">
      <Box className="centerCenter" sx={{ mb: 5 }}>
        <Box
          component="img"
          alt="check"
          src={check}
          sx={{ width: "5%", mr: 1 }}
        />
        <Typography className="lSizeTextLeft">
          Ваши места забронированы
        </Typography>
      </Box>
      <Typography className="Size25Text">
        Благодарим за выбор сервиса Storisbro;{")"}
      </Typography>

      <Box
        className="grayBorder"
        sx={{ width: { md: "50%", xs: "100%" }, m: "30px auto", p: 2 }}
      >
        <Typography className="mdSizeTextCenter">
          Настройте уведомления, чтобы не пропустить выход историй
        </Typography>
        <Box sx={{ width: "35%", m: "20px auto 0" }}>
          <MyButton
            onClick={() => navigate("/alerts")}
            options={{ background: "#E37E31" }}
          >
            Настройки
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ReservationSuccess;
