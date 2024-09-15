import { Badge, Grid, Typography } from "@mui/material";
import React from "react";

const Comission = ({ setComissionOpen, isDeposit }) => {
  return isDeposit ? (
    <Grid item md={4} xs={12} sx={{ mt: { xs: 3, md: 0 } }}>
      <Badge badgeContent="?" color="warning" sx={{ cursor: "pointer" }}>
        <Typography
          className="orange"
          sx={{ fontSize: "18px" }}
          onClick={() => setComissionOpen(true)}
        >
          Сервисный сбор 5%
        </Typography>
      </Badge>
    </Grid>
  ) : (
    <Grid item md={3.5} xs={6} sx={{ m: "20px auto" }}>
      <Typography className="orange" sx={{ fontSize: "18px" }}>
        Комиссия сервиса 20%
      </Typography>
    </Grid>
  );
};

export default Comission;
