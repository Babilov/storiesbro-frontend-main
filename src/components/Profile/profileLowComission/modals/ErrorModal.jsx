import React from "react";
import MyModal from "../../../UI/modals/MyModal";
import { Box, Typography } from "@mui/material";
import MyButton from "../../../UI/buttons/MyButton";

const ErrorModal = ({ errorModalOpen, setErrorModalOpen }) => {
  return (
    <MyModal
      title="Упс..."
      isFormOpen={errorModalOpen}
      width={{ xs: "90%", md: "50%", lg: "30%" }}
      setIsFormOpen={() => setErrorModalOpen(false)}
    >
      <Typography sx={{ textAlign: "center" }}>
        Мы глянули, походу, в сообществах: Гайды и Этот пользователь -
        отсутствуют ссылки. Добавьте ссылку в эти сообщества и нажмите на кнопку
        снова{")"}
      </Typography>
      <Box sx={{ width: "50%", m: "20px auto" }}>
        <MyButton
          onClick={() => setErrorModalOpen(false)}
          options={{ background: "#4CD640", color: "white" }}
        >
          Ок
        </MyButton>
      </Box>
    </MyModal>
  );
};

export default ErrorModal;
