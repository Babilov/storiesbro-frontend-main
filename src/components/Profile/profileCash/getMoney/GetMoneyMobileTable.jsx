import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

const GetMoneyMobileTable = ({ operations }) => {
  return (
    operations && (
      <>
        {operations.map((operation, index) => (
          <Grid
            container
            key={index}
            sx={{
              textAlign: "center",
              border: "1px solid #CDCDCD",
              borderRadius: "20px",
              pl: 3,
              pr: 3,
              pt: 1,
              display: { xs: "flex", md: "none" },
              mb: 2,
            }}
          >
            <Grid item xs={2} className="label">
              Дата
              <Divider />
            </Grid>
            <Grid item xs={10} className="data">
              {operation["created_at"]}
              <Divider />
            </Grid>

            <Grid item xs={2} className="label">
              UUID
            </Grid>
            <Grid item xs={10} className="data">
              {operation["id"]}
            </Grid>

            <Grid item xs={2} className="label">
              Реквизиты
            </Grid>
            <Grid item xs={10} className="data">
              {operation["details"]}
            </Grid>
            <Grid item xs={2} className="label">
              Сумма
            </Grid>
            <Grid item xs={10} className="data">
              {Math.floor(operation["amount"])}{" "}
              <Typography component="span" sx={{ fontWeight: 500 }}>
                ₽
              </Typography>
            </Grid>

            <Grid item xs={2} className="label">
              Статус
            </Grid>
            <Grid
              item
              xs={10}
              className="data"
              sx={{
                color:
                  operation["status"] === "paid"
                    ? "#4CD640"
                    : operation["status"] === "pending"
                    ? "#161616"
                    : "#D25D48",
              }}
            >
              {operation["status"] === "paid"
                ? "Выплачено"
                : operation["status"] === "pending"
                ? "В процессе"
                : "Отменено"}
            </Grid>
          </Grid>
        ))}{" "}
      </>
    )
  );
};

export default GetMoneyMobileTable;
