import React, { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";

import FooterText from "./FooterText";
import FooterImage from "./FooterImage";
import vkBlack from "../../../images/icons/commonIcons/vkBlack.svg";
import vkWhite from "../../../images/icons/commonIcons/vkWhite.svg";
import { Context } from "../../../context/Context";

const Footer = () => {
  const [isCustomer, _] = useContext(Context);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "flex-end",
        height: "83px",
      }}
    >
      <Grid
        item
        xs={1}
        md={1}
        order={{ xs: 1 }}
        sx={{ display: "flex", alignItems: "flex-end" }}
      >
        <FooterImage isCustomer={isCustomer} />
      </Grid>
      <Grid order={{ xs: 4, md: 2 }} item md={4} xs={12}>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: "10px", sm: "18px" },
            color: { xs: "#878787", md: isCustomer ? "white" : "black" },
            textAlign: "center",
          }}
        >
          ©2024 Storisbro. Все права защищены
        </Typography>
      </Grid>
      <Grid
        order={{ xs: 2, md: 3 }}
        md={5}
        xs={6}
        item
        sx={{
          fontWeight: 400,
          fontSize: "18px",
        }}
      >
        <FooterText><a href="./registrationFiles/PrivacyPolicy.docx" download="PrivacyPolicy.docx">Политика конфиденциальности</a></FooterText>
        <FooterText><a href="./registrationFiles/UserAgreement.docx" download="UserAgreement.docx">Пользовательское соглашение</a></FooterText>
      </Grid>
      <Grid
        order={{ xs: 3, md: 4 }}
        item
        md={2}
        xs={4}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FooterText>Наши соцсети</FooterText>
        <Box
          component="img"
          alt="vk"
          src={isCustomer ? vkWhite : vkBlack}
          sx={{ width: "15%", color: "white" }}
        />
      </Grid>
    </Grid>
  );
};

export default Footer;
