import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import GradientButton from "../../UI/buttons/GradientButton";

const Advantages = ({ images, setIsLoginFormOpen }) => {
  return (
    <Box
      sx={{
        mt: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, fontSize: "32px", textAlign: "center" }}
      >
        Преимущества Storisbro
      </Typography>
      <Grid container columnSpacing={25} sx={{ mb: 5 }}>
        {Object.keys(images).map((image, index) => (
          <Grid
            item
            md={6}
            xs={12}
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 5,
              transition: ".3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Box
              component="img"
              src={image}
              sx={{ width: "10%", height: "auto" }}
            />
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: 400,
                ml: 2,
              }}
            >
              {images[image]}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <GradientButton handleClick={() => setIsLoginFormOpen(true)} width="390px">Подключиться сейчас</GradientButton>
    </Box>
  );
};

export default Advantages;
