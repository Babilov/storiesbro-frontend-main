import React, { useState } from "react";

import MyModal from "./MyModal";
import { Box, Typography } from "@mui/material";
import MyInput from "../input/MyInput";
import ErrorMessage from "../errors/ErrorMessage";
import GradientButton from "../buttons/GradientButton";

import { API_URL } from "../../../constants/constatns";
import axios from "axios";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokken } from "../../../store/userReducer";
import { localStorageSet } from "../../../api/login";

// const CONFIRM_LINK = `${API_URL}activate/`;

const EmailConfirmationForm = ({
  isEmailConfirm,
  setIsEmailConfirm,
  userId,
  handleConfirmForm,
  emailLogin,
  passwordLogin,
}) => {
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleConfirmFormClick = async () => {
    try {
      try {
        const response = await axios.post(
          `${API_URL}activate/${userId}/${code}/`
        );
        localStorage.setItem("statusActivate", true);
        const email_lower = emailLogin.toLowerCase();
        setIsEmailConfirm(false);
        await axios
          .post(
            `${API_URL}login/`,
            {
              email: email_lower,
              password: passwordLogin,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then(function (response) {
            handleConfirmForm(response.data.id);
            // setIsConfirmPageOpen(true);
            // setIsLoginFormOpen(false);
            localStorageSet(response.data);
            dispatch(setTokken(response.data["access"]));

            localStorage.removeItem("statusActivate");
            const checkStatus = localStorage.getItem("statusAccount");
            if (checkStatus === "admin") {
              navigate("/admin");
            }
            if (checkStatus === "customer") {
              navigate("/customer");
            }
          })
          .then(() => {
            axios.post(
              "/api/some-endpoint/",
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("UID")}`,
                  "Content-Type": "application/json",
                },
              }
            );
          })
          .catch(function (error) {
            setError(true); // Устанавливаем флаг ошибки в true при ошибке запроса
          });
        if (!response.data.message) {
          setError(true);
        }
      } catch {
        setIsEmailConfirm(true);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <MyModal
      title="Подтверждение почты"
      isFormOpen={isEmailConfirm}
      setIsFormOpen={() => setIsEmailConfirm(false)}
    >
      <Typography sx={{ textAlign: "center" }}>
        Код для активации аккаунта отправили на почту
      </Typography>
      <MyInput label="Введите код" value={code} setValue={setCode} />
      <ErrorMessage error={error} errorMessage="*Неверный код" />
      <Box onClick={() => setIsEmailConfirm(false)}>
        <GradientButton handleClick={handleConfirmFormClick}>
          Готово
        </GradientButton>
      </Box>
    </MyModal>
  );
};

export default EmailConfirmationForm;
