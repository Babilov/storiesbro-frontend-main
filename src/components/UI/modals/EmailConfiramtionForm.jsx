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
  const [userSpecId, setUserId] = useState(null);
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
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then(function (response) {
            setUserId(response.data.id);
            handleConfirmForm(response.data.id);
            // setIsConfirmPageOpen(true);
            // setIsLoginFormOpen(false);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data["access"];

            localStorage.setItem("token", response.data["access"]);
            localStorage.setItem("refresh", response.data["refresh"]);
            localStorage.setItem("id", response.data["id"]);
            localStorage.setItem(
              "count_of_visit",
              response.data["count_of_visit"] + 1
            );
            localStorage.setItem("UID", response.data["UID"]);
            localStorage.setItem("is_active", response.data["is_active"]);
            localStorage.setItem("statusAccount", "admin");
            dispatch(setTokken(response.data["access"]));

            localStorage.removeItem("statusActivate");
            const checkStatus = localStorage.getItem("statusAccount");
            if (checkStatus == "admin") {
              navigate("/admin");
            }
            if (checkStatus == "customer") {
              navigate("/customer");
            }
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
