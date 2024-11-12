import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import MyModal from "./MyModal";
import GradientButton from "../buttons/GradientButton";
import MyInput from "../input/MyInput";
import ErrorMessage from "../errors/ErrorMessage";

import axios from "axios";
import { API_URL } from "../../../constants/constatns";

const ConfirmationForm = ({
  isConfirmFormOpen,
  setIsConfirmPageOpen,
  userId,
}) => {
  const handleClick = () => {
    // Отправка POST-запроса к API-эндпоинту для активации с нового устройства
    axios
      .post(`${API_URL}activate_login/${userId}/${code}/`)

      .catch((error) => {
        // Обработка ошибки, если необходимо
        console.error(error);
      });

    // Закрыть окно подтверждения
    setIsConfirmPageOpen(false);
  };

  const error = true;
  const [code, setCode] = useState("");

  return (
    <MyModal
      title="Подтверждение входа"
      isFormOpen={isConfirmFormOpen}
      setIsFormOpen={() => setIsConfirmPageOpen(false)}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "18px", fontWeight: 400, mb: 1 }}
      >
        Видим, что входите с нового устройства, отправили код на Вашу почту
      </Typography>
      <MyInput label="Введите код" value={code} setValue={setCode} />
      <ErrorMessage error={error} errorMessage={"*неверный код"} />

      <Box sx={{ width: "287px", m: "0 auto" }}>
        <GradientButton handleClick={handleClick}>Готово</GradientButton>
      </Box>
    </MyModal>
  );
};

export default ConfirmationForm;
