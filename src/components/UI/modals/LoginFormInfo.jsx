import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import GradientButton from "../buttons/GradientButton";
import MyInput from "../input/MyInput";
import { setTokken } from "../../../store/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localStorageSet, loginFunc } from "../../../api/login";

const LoginFormInfo = ({
  handleChangeConfirm,
  handleRegistrationForm,
  setIsLoginFormOpen,
  setIsConfirmPageOpen,
  handleConfirmForm,
}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login() {
    if (clickCount === 0) {
      setClickCount(1);
      return;
    }
    const email_lower = email.toLowerCase();
    try {
      const response = await loginFunc(email_lower, password);
      // logToBackend(JSON.stringify(response.data));
      if (response.status === 200) {
        const data = await response.data;

        handleConfirmForm(response.data.id);
        setIsConfirmPageOpen(true);
        setIsLoginFormOpen(false);
        localStorageSet(data);
        dispatch(setTokken(response.data["access"]));

        const checkStatus = localStorage.getItem("statusAccount");

        if (checkStatus === "admin") {
          navigate("/admin");
        } else if (checkStatus === "customer") {
          navigate("/customer");
        }
        return data;
      } else {
        setError(true);
        console.log("error!!!");
      }
    } catch (e) {
      setError(true);
    }
  }

  return (
    <>
      <MyInput label="Введите почту" value={email} setValue={setEmail} />
      {clickCount > 0 && (
        <MyInput
          label="Введите пароль"
          isPassword={true}
          value={password}
          setValue={setPassword}
        />
      )}

      <ErrorMessage
        error={error}
        errorMessage="*опа, ошибка в логине, либо в пароле"
      />
      <Link
        sx={{
          textAlign: "right",
          color: "#E37E31",
          textDecoration: "underline #E37E31",
          mb: 3,
          fontSize: "16px",
          fontWeight: 400,
          cursor: "pointer",
        }}
        onClick={() => handleChangeConfirm()}
      >
        Восстановить пароль
      </Link>
      <GradientButton handleClick={login}>Войти</GradientButton>
      <Box sx={{ mt: 1, mb: 1 }}></Box>
      <Typography
        sx={{
          mt: 2,
          textAlign: "center",
          fontSize: "18px",
          fontWeight: 400,
        }}
      >
        Нет аккаунта?{" "}
        <Link
          onClick={() => handleRegistrationForm()}
          sx={{
            color: "#E37E31",
            textDecoration: "underline #E37E31",
            cursor: "pointer",
          }}
        >
          Зарегистрироваться
        </Link>
      </Typography>
    </>
  );
};

export default LoginFormInfo;
