import { Box, Button, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import GradientButton from "../buttons/GradientButton";
import MyInput from "../input/MyInput";
import axios from "axios";
import { setTokken } from "../../../store/userReducer";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../constants/constatns";
import { useNavigate } from "react-router-dom";
import * as VKID from "@vkid/sdk"; // Импорт VKID SDK
import vk from "../../../images/icons/commonIcons/vkWhite.svg";
import logToBackend from "../../../utils/logs";

const LoginFormInfo = ({
  handleChangeConfirm,
  handleChangePassword,
  handleRegistrationForm,
  setIsLoginFormOpen,
  setIsConfirmPageOpen,
  handleConfirmForm,
}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login() {
    const email_lower = email.toLowerCase();
    const response = await axios.post(
      `${API_URL}login/`,
      {
        email: email_lower,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // logToBackend(JSON.stringify(response.data));
    if (response.status === 200) {
      const data = await response.data;
      logToBackend(JSON.stringify(data));
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setUserId(response.data.id);
      handleConfirmForm(response.data.id);
      setIsConfirmPageOpen(true);
      setIsLoginFormOpen(false);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data["access"];

      localStorage.setItem("token", response.data["access"]);
      localStorage.setItem("refresh", response.data["refresh"]);
      localStorage.setItem("id", response.data["id"]);
      localStorage.setItem(
        "count_of_visit",
        response.data["count_of_visit"] + 1,
      );
      localStorage.setItem("UID", response.data["UID"]);
      localStorage.setItem("is_active", response.data["is_active"]);
      localStorage.setItem("statusAccount", "admin");
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
    }
  }

  const handleConfirmFormInternal = () => {
    const email_lower = email.toLowerCase();
    axios
      .post(
        `${API_URL}login/`,
        {
          email: email_lower,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      )
      .then(function (response) {
        logToBackend(`RESPONSE1: ${JSON.stringify(response)}`);
        fetch("https://storisbro.com/api/endpoint/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${response["accessToken"]}`,
          },
        }).then((r) =>
          fetch("https://storisbro.com/api/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: response["refreshToken"] }),
          })
            .then((response) => response.json())
            .then((data) => {
              logToBackend(`DATA Refresh: ${JSON.stringify(data)}`);
              logToBackend(
                `RESPONSE2: ${JSON.stringify(["refreshToken"])}, ${response["accessToken"]}`,
              );
            }),
        );
        setUserId(response.data.id);
        handleConfirmForm(response.data.id);
        setIsConfirmPageOpen(true);
        setIsLoginFormOpen(false);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data["access"];

        localStorage.setItem("token", response.data["access"]);
        localStorage.setItem("refresh", response.data["refresh"]);
        localStorage.setItem("id", response.data["id"]);
        localStorage.setItem(
          "count_of_visit",
          response.data["count_of_visit"] + 1,
        );
        localStorage.setItem("UID", response.data["UID"]);
        localStorage.setItem("vk_id", response.data["vk_id"]);
        localStorage.setItem("is_active", response.data["is_active"]);
        localStorage.setItem("statusAccount", "admin");
        dispatch(setTokken(response.data["access"]));

        const checkStatus = localStorage.getItem("statusAccount");

        if (checkStatus === "admin") {
          navigate("/admin");
        } else if (checkStatus === "customer") {
          navigate("/customer");
        }
      })
      .catch(function (error) {
        setError(true); // Устанавливаем флаг ошибки в true при ошибке запроса
      });
  };

  return (
    <>
      <MyInput label="Введите почту" value={email} setValue={setEmail} />
      <MyInput
        label="Введите пароль"
        isPassword={true}
        value={password}
        setValue={setPassword}
      />
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

      {/*<Box id="VkIdSdkOneTap" sx={{ mt: 2 }}></Box>*/}
      {/*https://storisbro.com/accounts/vk/login/?process=login*/}

      {/*

      <Button
        sx={{
          backgroundColor: "#07f",
          height: "40px",
          borderRadius: "10px",
          ":hover": { background: "#0071f2" },
        }}
      >
        <Link
          href="https://storisbro.com/accounts/vk/login/?process=login"
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >

          <Box component="img" src={vk} sx={{ mr: 1, height: "23px" }} />
          Войти с VK ID
        </Link>
      </Button>

      */}

      {/* Контейнер для рендера VKID */}
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
