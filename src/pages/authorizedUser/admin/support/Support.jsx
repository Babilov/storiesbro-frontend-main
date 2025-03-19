import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";

import vk from "./images/vk.svg";
import MyButton from "../../../../components/UI/buttons/MyButton";

const Support = () => {
  return (
    <Grid item md={10} xs={12} className="grid">
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 600,
          mb: "10px",
          textAlign: "center",
        }}
      >
        Тех. поддержка
      </Typography>
      <Box className="spaceBetween">
        <Box>
          <Typography
            className="description"
            sx={{ fontSize: { md: "24px", xs: "16px" } }}
          >
            Если есть вопрос, лучше написать, чем не написать...
          </Typography>
          <Typography
            sx={{ fontSize: { md: "18px", xs: "14px" }, color: "#2A5885" }}
          >
            © Анонимный философ
          </Typography>
        </Box>
        <Box>
          {/* <Box
            component="img"
            alt="scrooge"
            src={scrooge}
            sx={{ width: "100%" }}
          /> */}
        </Box>
      </Box>
      <Link
        href="https://vk.com/storisbro_help"
        underline="none"
        target="_blank"
        sx={{
          display: "flex",
          width: { md: "50%", sm: "75%", xs: "100%" },
          margin: "10px auto",
        }}
      >
        <MyButton
          options={{
            background: "white",
            color: "black",
            border: "2px solid #2A5885",
            borderRadius: "90px",
          }}
        >
          <Box className="centerCenter">
            <Typography
              className="buttonFont"
              sx={{ textDecoration: "none" }} // Убирает подчеркивание
            >
              Написать
            </Typography>
            <Box
              component="img"
              alt="vk"
              src={vk}
              sx={{ width: { md: "10%", xs: "5%" }, mt: "3px" }}
            />
          </Box>
        </MyButton>
      </Link>
    </Grid>
  );
};

export default Support;
