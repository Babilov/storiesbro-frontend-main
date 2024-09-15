import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CreativesContext } from "../../../../context/CreativesContext";
import { Box, Grid, Typography } from "@mui/material";

const StorisStatistic = () => {
  const { id } = useParams();
  const [creatives] = useContext(CreativesContext);
  const creative = creatives[id];

  const statistic = [
    {
      id: 0,
      date: "05.07.04",
      views: "280.000",
      visits: "24.300",
      ctr: "8.7%",
      money: 5600,
    },

    {
      id: 1,
      date: "07.07.04",
      views: "292.000",
      visits: "25.150",
      ctr: "9.1%",
      money: 5850,
    },

    {
      id: 2,
      date: "09.07.04",
      views: "280.000",
      visits: "24.300",
      ctr: "8.7%",
      money: 5600,
    },

    {
      id: 3,
      date: "10.07.04",
      views: "135.000",
      visits: "11.300",
      ctr: "5.7%",
      money: 4500,
    },
  ];

  return (
    <Box className="grid" sx={{}}>
      <Typography className="title">
        Статистика “{creative["title"]}”
      </Typography>

      <Grid
        container
        className="grayBorder"
        sx={{ p: 2, mb: 3, display: { md: "flex", xs: "none" } }}
      >
        <Grid item md={1} />

        <Grid item md={2} sx={{ mb: 2 }}>
          <Typography className="centerText mdBoldSizeText">Дата</Typography>
        </Grid>

        <Grid item md={2}>
          <Typography className="centerText mdBoldSizeText">
            Назвагие
          </Typography>
        </Grid>

        <Grid item md={7} />

        <Grid
          container
          sx={{ borderTop: "1px solid #CDCDCD" }}
          className="alignCenter"
        >
          <Grid item md={1} sx={{ mt: 2 }} className="justifyCenter">
            <Box component="img" alt="img" src={creative["image"]} />
          </Grid>

          <Grid item md={2}>
            <Typography className="centerText mdSizeText">
              {creative["date"]}
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography className="centerText mdSizeText">
              {creative["title"]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        className="grayBorder"
        sx={{ pt: 2, pl: 2, pr: 2, display: { md: "flex", xs: "none" } }}
      >
        <Grid
          item
          md={2.4}
          className="mdBoldSizeText centerText"
          sx={{ mb: 2 }}
        >
          Дата
        </Grid>
        <Grid item md={2.4} className="mdBoldSizeText centerText">
          Просмотры
        </Grid>
        <Grid item md={2.4} className="mdBoldSizeText centerText">
          Переходы
        </Grid>
        <Grid item md={2.4} className="mdBoldSizeText centerText">
          CTR
        </Grid>
        <Grid item md={2.4} className="mdBoldSizeText centerText">
          Стоимость
        </Grid>

        {statistic.map((item) => (
          <Grid
            container
            key={item["id"]}
            sx={{ borderTop: "1px solid #CDCDCD", pt: 2, pb: 2 }}
          >
            <Grid item md={2.4}>
              <Typography className="mdSizeText centerText">
                {item["date"]}
              </Typography>
            </Grid>

            <Grid item md={2.4}>
              <Typography className="mdSizeText centerText">
                {item["views"]}
              </Typography>
            </Grid>

            <Grid item md={2.4}>
              <Typography className="mdSizeText centerText">
                {item["visits"]}
              </Typography>
            </Grid>

            <Grid item md={2.4}>
              <Typography className="mdSizeText centerText">
                {item["ctr"]}
              </Typography>
            </Grid>

            <Grid item md={2.4}>
              <Typography className="mdSizeText centerText">
                {item["money"]}
                <Typography
                  component="span"
                  className="mdBoldSizeText centerText"
                >
                  ₽
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        className="grayBorder"
        sx={{ display: { md: "none", xs: "flex" }, p: 1 }}
      >
        <Grid item xs={6}>
          <Box sx={{ display: "flex" }}>
            <Box
              component="img"
              alt="img"
              src={creative["image"]}
              sx={{ mr: 1 }}
            />
            <Typography className="sm600">{creative["title"]}</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Box>
            <Typography className="sm" sx={{ textAlign: "right" }}>
              {creative["date"]}
            </Typography>
            <Typography
              className="sm"
              sx={{
                color:
                  creative["status"] === "Активен"
                    ? "#4CD640"
                    : creative["status"] === "Не прошел проверку"
                    ? "#D25D48"
                    : "black",
                textAlign: "right",
              }}
            >
              {creative["status"]}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {statistic.map((item, i) => (
        <Grid container key={i} className="grayBorder" sx={{ p: 1, mt: 2 }}>
          <Grid
            item
            className="spaceBetween"
            xs={12}
            sx={{ borderBottom: "1px solid #CDCDCD" }}
          >
            <Typography className="sm500">Дата</Typography>
            <Typography className="description">{item["date"]}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box className="spaceBetween" sx={{ mb: 1, mt: 1 }}>
              <Typography className="sm500">Просмотры</Typography>
              <Typography className="description">{item["views"]}</Typography>
            </Box>

            <Box className="spaceBetween" sx={{ mb: 1 }}>
              <Typography className="sm500">Переходы</Typography>
              <Typography className="description">{item["visits"]}</Typography>
            </Box>
            <Box className="spaceBetween" sx={{ mb: 1 }}>
              <Typography className="sm500">CTR</Typography>
              <Typography className="description">{item["ctr"]}</Typography>
            </Box>
            <Box className="spaceBetween" sx={{ mb: 1 }}>
              <Typography className="sm500">Стоимость</Typography>
              <Typography className="description">
                {item["money"]}
                <Typography component="span" className="sm500">
                  ₽
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default StorisStatistic;
