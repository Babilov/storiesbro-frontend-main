import React from "react";
import { Box, Typography } from "@mui/material";
import VkEnter from "../../UI/buttons/VkEnter";

const CallToAction = ({ background }) => {
  return (
    <Box
      sx={{
        background: background,
        textAlign: "center",
        pt: 5,
        pb: 5,
      }}
    >
      <Box sx={{ width: { xl: "42%", xs: "80%" }, m: "0 auto" }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: { sx: "16px", sm: "32px" }, mb: 3 }}
        >
          Остались вопросы или сомнения?
        </Typography>
        <Typography
          sx={{ fontWeight: 400, fontSize: { sx: "14px", sm: "24px" }, mb: 3 }}
        >
          Напишите нам, наша команда с удовольствием ответит на все Ваши вопросы
        </Typography>
        <VkEnter>Написать</VkEnter>
      </Box>
    </Box>
  );
};

export default CallToAction;
