import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import scrooge1 from "./images/scrooge1.svg";
import Timer from "../Timer";
import MyButton from "../../UI/buttons/MyButton";

const NoMoney = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      className="grid"
      rowSpacing={5}
      sx={{ alignItems: "center" }}
    >
      <Grid item md={6}>
        <Box>
          <Typography className="lSizeTextLeft">Последний шаг</Typography>
          <Typography className="description">
            Осталось пополнить баланс
          </Typography>
        </Box>

        <Box>
          <Typography className="lSizeTextLeft">Сумма</Typography>
          <Typography className="description">
            2 рекламных места 12300
          </Typography>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Timer />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ width: { md: "15%", xs: "50%" }, m: "0 auto" }}>
          <MyButton
            options={{ background: "#E37E31" }}
            onClick={() => navigate("/cash")}
          >
            Пополнить
          </MyButton>
          <Typography
            sx={{ cursor: "pointer", mt: 1 }}
            className="orange centerText"
            onClick={() => navigate("/customer")}
          >
            Отмена
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        className="orangeBorder"
        sx={{ display: "flex", alignItems: "center", p: 2, mt: 5 }}
      >
        <Box>
          <Typography className="xlSizeText">После пополнения</Typography>
          <Typography className="description">
            1. Деньги будут заморожены до получения статистики.
          </Typography>
          <Typography className="description">
            2. Автоматически проводится рассчет.
          </Typography>
          <Typography className="description">
            3. Оставшиеся средства вернуться на Ваш баланс.
          </Typography>
        </Box>

        <Box
          component="img"
          alt="scrooge"
          src={scrooge1}
          sx={{ width: "50%" }}
        />
      </Grid>
    </Grid>
  );
};

export default NoMoney;
