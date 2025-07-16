import React, { useState } from "react";
import MyModal from "./MyModal";
import { Box, Typography } from "@mui/material";
import GradientButton from "../buttons/GradientButton";
import MyInput from "../input/MyInput";
import ErrorMessage from "../errors/ErrorMessage";
import { API_URL } from "../../../constants/constatns";
import axios from "axios";

const ConfirmationChangePassword = ({
  isChangePasswordOpen,
  setIsChangePasswordOpen,
  openChangePassword,
}) => {
  const handleClick = async () => {
    const email_lower = yourEmail.toLowerCase();
    const response = await axios.post(`${API_URL}check_email/${email_lower}`);
    const result = response.data["exists"];
    if (result) {
      await axios.post(`${API_URL}api_users/password_change/${email_lower}`);
      setIsChangePasswordOpen(false);
      openChangePassword(email_lower);
    } else {
      setError(true);
    }
  };
  const [yourEmail, setYourEmail] = useState("");
  const [error, setError] = useState(false);
  const errorMessage = "*Данная почта не привязана к аккаунту сервиса";

  return (
    <MyModal
      title="Восстановление пароля"
      isFormOpen={isChangePasswordOpen}
      setIsFormOpen={() => setIsChangePasswordOpen(false)}
      width="40%"
    >
      <Box>
        <Typography textAlign="center" mb={2}>
          Отправим код на восстановление на Вашу почту
        </Typography>
        <MyInput
          label="Введите почту"
          value={yourEmail}
          setValue={setYourEmail}
        />
        <ErrorMessage error={error} errorMessage={errorMessage} />
        <GradientButton handleClick={handleClick}>Сохранить</GradientButton>
      </Box>
    </MyModal>
  );
};

export default ConfirmationChangePassword;
