import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import scrooge from "./images/scrooge.svg";

import "./styles/style.css";

import "swiper/css/pagination";

import AuthorizedUserHeader from "../../authorizedUser/authorizedUserHeader/AuthorizedUserHeader";
import Table from "./Table";
import AuthorizedCustomerMenu from "../menu/AuthorizedCustomerMenu";

const Reserve = () => {
  const places = 249;
  return (
    <Container className="grid">
      <AuthorizedUserHeader isCustomer={true} />
      <Grid container>
        <Grid item lg={2} xs={0}>
          <AuthorizedCustomerMenu />
        </Grid>
        <Grid item lg={10} xs={12}>
          <Box className="orangeBorder" sx={{ p: 3, display: "flex" }}>
            <Box>
              <Typography className="xlSizeText" sx={{ mb: 2 }}>
                Размещение рекламных историй в сети сообществ{" "}
                <Typography component="span" className="xlSizeText orange">
                  {" "}
                  Вконтакте{" "}
                </Typography>
              </Typography>

              <Typography className="md500" sx={{ mb: 1 }}>
                Количество сообществ:{" "}
                <Typography component="span" className="orange md500">
                  {places}
                </Typography>
              </Typography>
              <Typography className="md500" sx={{ mb: 1 }}>
                Рекламный охват:{" "}
                <Typography component="span" className="orange md500">
                  за 2 июля 2023 года = 273000
                </Typography>
              </Typography>
              <Typography className="md500" sx={{ mb: 1 }}>
                Рассчет:{" "}
                <Typography component="span" className="orange md500">
                  30 руб. за 1000 просмотров
                </Typography>
              </Typography>
            </Box>
            <Box
              component="img"
              alt="scrooge"
              src={scrooge}
              sx={{ width: "23%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reserve;
