import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import vk from "./images/vk.svg";
import scrooge from "./images/scrooge.svg";
import MyButton from "../../../../components/UI/buttons/MyButton";

const Support = () => {
  return (
    <Grid item md={10} xs={12} className="grid">
      <Typography className="title">Тех. поддержка</Typography>
      <Box className="spaceBetween">
        <Box>
          <Typography
            className="description"
            sx={{ fontSize: { md: "24px", xs: "14px" } }}
          >
            Если есть вопрос, лучше написать, чем не написать...
          </Typography>
          <Typography
            sx={{ fontSize: { md: "18px", xs: "12px" }, color: "#2A5885" }}
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
      <Box sx={{ width: { md: "50%", sm: "75%", xs: "100%" }, mt: 3 }}>
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
            component="a" 
            href="https://vk.com/storisbro_help" 
            target="_blank" 
            rel="noopener noreferrer" 
            variant="body1" 
            color="primary" 
            className="buttonFont"
            sx={{ textDecoration: "none" }} // Убирает подчеркивание
          >
            Написать
          </Typography>
            <Box component="img" alt="vk" src={vk} sx={{ width: "10%" }} />
          </Box>
        </MyButton>
      </Box>
    </Grid>
  );
};

export default Support;
