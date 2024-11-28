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
/*
    useEffect(() => {
        // Получаем state и code_challenge с бэка
        fetch("https://storisbro.com/prefetch_vk_auth_data/")
            .then((res) => res.json())
            .then(({ state, code_challenge }) => {
                axios.post(' https://storisbro.com/api/vk/save_auth_data/', {code_challenge, state}).then(r => {
                    console.log(state, code_challenge);
                    console.log("test");
                    VKID.Config.init({
                        app: "51786441",
                        redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
                        state: state,
                        codeChallenge: code_challenge,
                        codeChallengeMethod: "S256",
                        scope: "email",
                    });
                })


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
    */

    useEffect(() => {
        // Получаем state и code_challenge с бэка
        fetch("https://storisbro.com/prefetch_vk_auth_data/")
            .then((res) => res.json())
            .then(({ state, code_challenge }) => {
                axios.post("https://storisbro.com/api/vk/save_auth_data/", { code_challenge, state })
                    .then((r) => {
                        console.log(state, code_challenge);

                        VKID.Config.init({
                            app: "51786441",
                            redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
                            state: state,
                            codeChallenge: code_challenge,
                            codeChallengeMethod: "S256",
                            scope: "email",
                        });
                    });

                const oneTap = new VKID.OneTap();
                const container = document.getElementById("VkIdSdkOneTap");

                if (container) {
                    oneTap.render({ container })
                        .on(VKID.WidgetEvents.SUCCESS, handleVkAuth)
                        .on(VKID.WidgetEvents.ERROR, console.error);
                }
            })
            .catch(console.error);
    }, []);

    const handleVkAuth = (data) => {
        const { code, state } = data;

        // Проверка, что код не был использован ранее
        if (sessionStorage.getItem("vk_code_used")) {
            console.log("Code уже использован");
            return;
        }

        sessionStorage.setItem("vk_code_used", "true");

        // Отправка code и state на бэкенд
        axios.post("https://storisbro.com/vk_callback/", { code, state })
            .then((response) => {
                const { access_token, refresh_token, user_id } = response.data;

                // Сохранение токенов и данных в localStorage
                localStorage.setItem("token", access_token);
                localStorage.setItem("refresh", refresh_token);
                localStorage.setItem("id", user_id);

                // Установка токена в Redux
                dispatch(setTokken(access_token));

                // Перенаправление пользователя
                navigate("/admin");
            })
            .catch((error) => {
                console.error("Ошибка при обмене кода на токены:", error);
                setError(true);
            });
    };
    /*
    const handleVkAuth = (data) => {

        const { code, state } = data;

        // Отправка code и state на бэкенд
        axios.post(`https://storisbro.com/vk_callback/`, { code, state })
            .then((response) => {
                console.log(`code: ${code} \n state: ${state}`);
                const { access_token, refresh_token, user_id } = response.data;

                // Сохранение токенов и других данных в localStorage
                localStorage.setItem("token", access_token);
                localStorage.setItem("refresh", refresh_token);
                localStorage.setItem("id", user_id);

                // Установка токена в Redux
                dispatch(setTokken(access_token));

                // Перенаправление пользователя
                navigate("/admin");
            })
            .catch((error) => {
                console.error("Ошибка при обмене кода на токены:", error);
                setError(true);
            });
    };

    */
    return (
        <Box className="creatives">
            <Typography variant="h4" className="creatives__title">
                Мои сообщества
            </Typography>
            <Typography variant="body2" className="creatives__text">
                Вы не можете добавить сообщества, так как ваш аккаунт ВКонтакте не
                подключен
            </Typography>
            <Box
                sx={{width: {xs: "50%", sm: "35%", md: "25%"}, m: "0 auto", mt: 2}}
            >
                <Box id="VkIdSdkOneTap" sx={{mt: 2}}></Box>
            </Box>
        </Box>
    );
};

export default CreativessBeforeEnter;
