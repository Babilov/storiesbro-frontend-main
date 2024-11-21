import {Box, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import "./styles/style.css";

/*import vk from "./images/vk.svg";
import avatar from "./images/avatar.svg";
import MyButton from "../../../UI/buttons/MyButton";*/
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as VKID from "@vkid/sdk";
import {setTokken} from "../../../../store/userReducer";
import {API_URL} from "../../../../constants/constatns";
import axios from "axios";

const CreativessBeforeEnter = ({setAuthed}) => {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Функция для генерации случайного codeVerifier
    function generateCodeVerifier() {
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

    // Тест

    useEffect(async () => {
        fetch("http://storisbro.com/prefetch_vk_auth_data/")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                console.log(res.json())
                return res.json();
            })
            .then(({ state, code_challenge }) => {
                console.log(`State: ${state}, Code Challenge: ${code_challenge}`);
            })
            .catch((error) => {
                console.error("Error fetching VK auth data:", error);
            });
    })

    // ОСНОВНОЙ


    useEffect(() => {
        // Получаем state и code_challenge с бэка
        fetch("http://storisbro.com/prefetch_vk_auth_data/")
            .then((res) => res.json())
            .then(({ state, code_challenge }) => {
                console.log(`State: ${state}, code_challenge: ${code_challenge}`);
                VKID.Config.init({
                    app: "51786441",
                    redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
                    state: state,
                    codeChallenge: code_challenge,
                    codeChallengeMethod: "S256",
                    scope: "email",
                });

                const oneTap = new VKID.OneTap();
                const container = document.getElementById("VkIdSdkOneTap");

                if (container) {
                    oneTap
                        .render({ container })
                        .on(VKID.WidgetEvents.SUCCESS, handleVkAuth)
                        .on(VKID.WidgetEvents.ERROR, console.error);
                }
            })
            .catch(console.error);
    }, []);


/*
    useEffect(() => {
        // Генерация codeVerifier
        const codeVerifier = generateCodeVerifier();

        // Сохраняем state
        const state = generateCodeVerifier();

        console.log("State & codeVerifier: ", state, codeVerifier);

        generateCodeChallenge(codeVerifier).then((codeChallenge) => {
            // Инициализация VKID SDK
            VKID.Config.init({
                app: "51786441",
                redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
                state: state, // Передаём state
                codeVerifier: codeVerifier, // Передаём codeVerifier
                scope: "email",
            });

            const oneTap = new VKID.OneTap();
            const container = document.getElementById("VkIdSdkOneTap");

            if (container) {
                oneTap
                    .render({ container })
                    .on(VKID.WidgetEvents.SUCCESS, handleVkAuth)
                    .on(VKID.WidgetEvents.ERROR, console.error);
            }
        });
    }, []);
*/


    /*
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
                    .render({container})
                    .on(VKID.WidgetEvents.SUCCESS, handleVkAuth) // Обработка успеха
                    .on(VKID.WidgetEvents.ERROR, console.error); // Обработка ошибок
            }
        });
    }, []);
    */
    const handleVkAuth = (data) => {
        const {code, device_id} = data;
        console.log("Code & device id: ", code, device_id);
        // Обмен кода на токены
        VKID.Auth.exchangeCode(code, device_id)
            .then((response) => {
                const {access_token, refresh_token, user_id, vk_id} = response;

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
    };
    return (
        <Box className="creatives">
            <Typography variant="h4" className="creatives__title">
                Мои сообщества
            </Typography>
            <Typography variant="body2" className="creatives__text">
                Вы не можете добавить сообщества, так как ваш аккаунт ВКонтакте не
                подключен
            </Typography>
            <a href="https://storisbro.com/communities/prefetch_vk_auth_data">
                тест
            </a>
            <Box
                sx={{width: {xs: "50%", sm: "35%", md: "25%"}, m: "0 auto", mt: 2}}
            >
                {/*<MyButton
                    options={{background: "#2A5885", color: "white"}}
                    onClick={() => setAuthed(true)}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Box component="img" alt="vk" src={vk}/>
                        <Typography sx={{fontSize: "14px", fontWeight: 500}}>
                            Войти как Юрий
                        </Typography>
                        <Box component="img" alt="avatar" src={avatar}/>
                    </Box>
                </MyButton>*/}
                <Box id="VkIdSdkOneTap" sx={{mt: 2}}></Box>
            </Box>
        </Box>
    );
};

export default CreativessBeforeEnter;
