import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ProfileHeader from "../../components/Profile/profileHeader/ProfileHeader";
import ProfileLowComission from "../../components/Profile/profileLowComission/ProfileLowComission";
import MyInput from "../../components/UI/input/MyInput";

const LowComissionAdmin = () => {
  return (
    <Box>
      <ProfileHeader />
      <Container>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontSize: { md: "32px", xs: "18px" },
            fontWeight: 600,
            mb: 2,
            mt: 2,
          }}
        >
          Уменьшение комиссии
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: { md: "24px", xs: "14px" },
            fontWeight: 400,
            mb: 4,
          }}
        >
          Вы можете снизить комиссию на вывод - просто добавив наш сервис в
          ссылки Ваших сообществ{")"}
        </Typography>
        <ProfileLowComission />
      </Container>
    </Box>
  );
};

export default LowComissionAdmin;
