import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ArhiveMobileTable = ({ arhive }) => {
  return arhive.map((creative) => (
    <Grid
      container
      className="grid grayBorder"
      sx={{ p: 2, display: { md: "none", xs: "flex" }, mb: 2 }}
      key={creative["id"]}
    >
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          borderBottom: "1px solid #CDCDCD",
          pb: 1,
        }}
      >
        <Box component="img" alt="img" src={creative["file"]} />
        <Typography className="sm600">{creative["name"]}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "end",
          borderBottom: "1px solid #CDCDCD",
          pb: 1,
        }}
      >
        <Typography className="sm">{creative["date"]}</Typography>
        <Typography
          className="sm"
          sx={{
            color:
              creative["status"] === "Активен"
                ? "#4CD640"
                : creative["status"] === "Не прошел проверку"
                ? "#D25D48"
                : "black",
          }}
        >
          {creative["status"]}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          borderRight: "1px solid #CDCDCD",
          mt: 1,
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              mt: 1,
            }}
            className="sm centerText"
            to={`/creatives/${creative["creative_type"]}/${creative["id"]}`}
          >
            Открыть
          </Link>
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          borderRight: "1px solid #CDCDCD",
          mt: 1,
        }}
      >
        <Typography sx={{ mt: 1, cursor: "pointer" }} className="sm centerText">
          <Link
            to={`/creatives/statistic/${creative["id"]}`}
            className="sm"
            style={{ textDecoration: "none", color: "black" }}
          >
            Статистика
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ mt: 1 }}>
        <Typography className="sm centerText" sx={{ cursor: "pointer", mt: 1 }}>
          Убрать
        </Typography>
      </Grid>
    </Grid>
  ));
};

export default ArhiveMobileTable;
