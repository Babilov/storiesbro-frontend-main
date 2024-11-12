import {Box, Button, Link, Typography} from "@mui/material";
import React, {useState, useEffect} from "react";
import ErrorMessage from "../errors/ErrorMessage";
import GradientButton from "../buttons/GradientButton";
import MyInput from "../input/MyInput";
import axios from "axios";
import {setTokken} from "../../../store/userReducer";
import {useDispatch} from "react-redux";
import {API_URL} from "../../../constants/constatns";
import {useNavigate} from "react-router-dom";
import * as VKID from "@vkid/sdk"; // Импорт VKID SDK
import vk from "../../../images/icons/commonIcons/vkWhite.svg";

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

    // Функция для генерации случайного codeVerifier
    /*function generateCodeVerifier() {
      const array = new Uint32Array(56 / 2);
      window.crypto.getRandomValues(array);
      return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
        ""
      );
    }

    // Функция для генерации codeChallenge из codeVerifier
    async function generateCodeChallenge(codeVerifier) {
      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    useEffect(() => {
      // Генерация codeVerifier и codeChallenge
      const state = generateCodeVerifier();
      const codeVerifier = generateCodeVerifier();
      generateCodeChallenge(codeVerifier).then((codeChallenge) => {
        // Инициализация VKID SDK
        VKID.Config.init({
          app: "51786441", // Укажите ваш VK app ID
          redirectUrl: "https://storisbro.com/accounts/vk/login/callback/", // Укажите ваш redirect URL
          state: state, // Дополнительный параметр состояния
          codeVerifier: codeVerifier, // Используем сгенерированный codeVerifier
          scope: "email", // Запрашиваемые разрешения
        });

        const oneTap = new VKID.OneTap();
        const container = document.getElementById("VkIdSdkOneTap");

        if (container) {
          oneTap
            .render({ container })
            .on(VKID.WidgetEvents.SUCCESS, handleVkAuth) // Обработка успеха
            .on(VKID.WidgetEvents.ERROR, console.error); // Обработка ошибок
        }
      });
    }, []);

    const handleVkAuth = (data) => {
      const { code, device_id } = data;

      // Обмен кода на токены
      VKID.Auth.exchangeCode(code, device_id)
        .then((response) => {
          const { access_token, refresh_token, user_id, vk_id } = response;

          // Сохранение токенов и других данных в localStorage
          localStorage.setItem("token", access_token);
          localStorage.setItem("refresh", refresh_token);
          localStorage.setItem("id", user_id);
          localStorage.setItem("vk_id", vk_id);

          // Установка токена в Redux
          dispatch(setTokken(access_token));

          // Проверка и перенаправление пользователя
          navigate("/admin");
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токены:", error);
          setError(true);
        });
    };*/

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
                }
            )
            .then(function (response) {
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
                    response.data["count_of_visit"] + 1
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
            <MyInput label="Введите почту" value={email} setValue={setEmail}/>
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
            <GradientButton handleClick={handleConfirmFormInternal}>
                Войти
            </GradientButton>
            <Box sx={{mt: 1, mb: 1}}></Box>

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
