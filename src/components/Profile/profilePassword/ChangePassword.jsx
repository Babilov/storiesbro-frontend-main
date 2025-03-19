import { Box } from "@mui/material";
import React, { useState } from "react";
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/buttons/MyButton";
import ErrorMessage from "../../UI/errors/ErrorMessage";
import EmailConfiramtionFormModal from "./modals/EmailConfirmationModal";

import axios from "axios";
import { API_URL } from "../../../constants/constatns";

const ChangePassword = () => {
  const handleClick = async () => {
    if (password !== passwordAgain) {
      setError(true);
    } else {
      try {
        await axios.post(
          `${API_URL}password_change/${localStorage.getItem("email")}/`
        );
      } catch (error) {
        console.error("Ошибка", error);
      }
      setError(false);
      setEmailConfirmation(true);
    }
  };
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [error, setError] = useState(false);
  return (
    <Box sx={{ width: "50%", m: { lg: 0, xs: "0 auto" } }}>
      <EmailConfiramtionFormModal
        open={emailConfirmation}
        setOpen={setEmailConfirmation}
        password={password}
      />
      <MyInput
        value={password}
        setValue={setPassword}
        label="Введите новый пароль"
        isPassword={true}
      />
      <MyInput
        value={passwordAgain}
        setValue={setPasswordAgain}
        label="Повторите пароль"
        isPassword={true}
      />
      <ErrorMessage error={error} errorMessage="* Пароли не совпадают" />
      <Box sx={{ width: "50%", m: { lg: "5px 0 0", xs: "5px auto" } }}>
        <MyButton
          onClick={handleClick}
          options={{ background: "#4CD640", color: "white" }}
        >
          Готово
        </MyButton>
      </Box>
    </Box>
  );
};

export default ChangePassword;
