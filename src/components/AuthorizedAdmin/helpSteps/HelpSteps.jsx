import { Box, Typography } from "@mui/material";
import React from "react";

import helpSteps from "./images/steps.png";

const HelpSteps = () => {
  return (
    <Box sx={{ position: "relative" }} className="grid">
      <Typography
        sx={{
          fontSize: { md: "32px", xs: "18px" },
          fontWeight: 600,
          position: { xs: "relative", md: "absolute" },
          width: { md: "50%", xs: "70%" },
          mb: 2,
        }}
      >
        Как{" "}
        <Typography
          sx={{ fontSize: { md: "32px", xs: "18px" }, fontWeight: 600 }}
          component="span"
          className="orange"
        >
          монетизировать
        </Typography>{" "}
        сообщество?
      </Typography>
      <Box
        component="img"
        alt="steps"
        src={helpSteps}
        sx={{ width: "100%", display: { xs: "none", md: "block" } }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography className="gradient">1</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
            Пополняем баланс
          </Typography>
        </Box>

        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography className="gradient">2</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
            Загружаем креатив
          </Typography>
        </Box>

        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography className="gradient">3</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
            Бронируем места
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HelpSteps;
