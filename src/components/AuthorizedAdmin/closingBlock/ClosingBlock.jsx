import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import instruction from "./images/instruction.png";
import cross from "./images/cross.svg";
import iphone from "./images/iphone.svg";
import android from "./images/android.svg";

const ClosingBlock = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Grid
        className="orangeBorder"
        sx={{
          p: 5,
          position: "relative",
          display: { md: open ? "flex" : "none", xs: "none" },
          m: "0 auto",
        }}
        columnSpacing={5}
      >
        <Box
          component="img"
          alt="cross"
          src={cross}
          sx={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />
        <Grid item xs={7} sx={{ mt: 5, mb: 3 }}>
          <Typography sx={{ fontSize: "32px", fontWeight: 600 }}>
            Добавьте Storisbro на рабочий стол, чтобы управлять доходом
            максимально быстро и комфортно
          </Typography>
          <Typography sx={{ fontSize: "24px", fontWeight: 400 }}>
            1. Выделите ссылку сайта
          </Typography>
          <Typography sx={{ fontSize: "24px", fontWeight: 400 }}>
            2. Перенесите её на рабочий стол
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Box
            component="img"
            alt="instruction"
            src={instruction}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        className="orangeBorder"
        sx={{
          p: 5,
          position: "relative",
          display: { xs: open ? "flex" : "none", md: "none" },
          m: "0 auto",
        }}
      >
        <Box
          component="img"
          alt="cross"
          src={cross}
          sx={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, textAlign: "center" }}
          >
            Добавьте Storisbro на главный экран, чтобы управлять доходом
            максимально просто и быстро
          </Typography>
        </Grid>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={7} sx={{ alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
              Для IOS
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              1. Зайдите в Storisbro через Safari
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              2. Откройте меню в нижней части экрана
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              3. Выберите пункт “На экран домой”
            </Typography>
          </Grid>
          <Grid item xs={5} component="img" alt="iphone" src={iphone} />
        </Grid>

        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={7} sx={{ alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
              Для Android
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              1. Откройте меню в нижней части экрана
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              2. Выберите пункт “Добавить ярлык на телефон”
            </Typography>
          </Grid>
          <Grid item xs={5} component="img" alt="android" src={android} />
        </Grid>
      </Grid>
    </>
  );
};

export default ClosingBlock;
