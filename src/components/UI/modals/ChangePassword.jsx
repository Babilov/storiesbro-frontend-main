import React, { useState } from "react";
import MyModal from "./MyModal";
import { Box } from "@mui/material";
import GradientButton from "../buttons/GradientButton";
import MyInput from "../input/MyInput";
import ErrorMessage from "../errors/ErrorMessage";

const ChangePassword = ({
  isChangePasswordOpen,
  setIsChangePasswordOpen,
  email,
}) => {
  // const handleClick = () => {
  //   setIsChangePasswordOpen(false);
  // };

  const handleConfirmForm = async () => {
    if (password === passwordConfirm) {
      setIsChangePasswordOpen(false);
    }
    if (password !== passwordConfirm) {
      setError(true);
      setErrorMessage("*Пароли не совпадают");
    } else {
      setError(true);
      setErrorMessage("*Код подтверждения неверный");
    }
  };

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordCodeConfirm, setPasswordCodeConfirm] = useState("");

  return (
    <MyModal
      title="Смена пароля"
      isFormOpen={isChangePasswordOpen}
      setIsFormOpen={() => setIsChangePasswordOpen(false)}
      width={{ xs: "90%", md: "50%", lg: "30%" }}
    >
      <Box>
        <MyInput
          label="Введите новый пароль"
          isPassword={true}
          value={password}
          setValue={setPassword}
        />
        <MyInput
          label="Повторите пароль"
          isPassword={true}
          value={passwordConfirm}
          setValue={setPasswordConfirm}
        />
        <MyInput
          label="Введите код подтверждения"
          value={passwordCodeConfirm}
          setValue={setPasswordCodeConfirm}
        />
        <ErrorMessage error={error} errorMessage={errorMessage} />
        <GradientButton handleClick={handleConfirmForm}>
          Сохранить
        </GradientButton>
      </Box>
    </MyModal>
  );
};

export default ChangePassword;
