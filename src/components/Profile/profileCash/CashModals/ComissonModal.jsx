import React from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyButton from "../../../UI/buttons/MyButton";

const ComissionModal = ({ open, setOpen }) => {
  return (
    <MyModal
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      isFormOpen={open}
      setIsFormOpen={() => setOpen(false)}
    >
      <Box>
        <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
          Для поддержания высокого уровня сервиса мы взимаем сервисный сбор в
          размере 5%. Этот сбор помогает нам покрыть расходы на содержание
          сайта, комиссию платежной системы, поддержку клиентов и улучшение
          нашего сервиса.
        </Typography>
        <Box sx={{ width: "40%", m: "10px auto" }}>
          <MyButton
            onClick={() => setOpen(false)}
            options={{ background: "#4CD640", color: "white" }}
          >
            Ок
          </MyButton>
        </Box>
      </Box>
    </MyModal>
  );
};

export default ComissionModal;
