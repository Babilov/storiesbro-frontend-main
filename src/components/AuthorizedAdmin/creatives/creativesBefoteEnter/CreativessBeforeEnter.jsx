import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import "./styles/style.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as VKID from "@vkid/sdk";
import { setTokken } from "../../../../store/userReducer";
import axios from "axios";

const CreativessBeforeEnter = ({ setAuthed }) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logToBackend = (logMessage) => {
    // Отправляем лог на сервер
    axios
      .post("https://storisbro.com/api/logs/", { message: logMessage })
      .then((response) => {
        console.log("Log sent to server", response.data);
      })
      .catch((error) => {
        console.error("Error sending log to server:", error);
      });
  };

  useEffect(() => {
    // Логируем начало работы useEffect
    logToBackend("Started fetching VK auth data");

    // Получаем state и code_challenge с бэка
    fetch("https://storisbro.com/prefetch_vk_auth_data/")
      .then((res) => res.json())
      .then(({ state, code_challenge }) => {
        logToBackend(
          `Received state and code_challenge: state=${state}, code_challenge=${code_challenge}`,
        );

        axios
          .post("https://storisbro.com/api/vk/save_auth_data/", {
            code_challenge,
            state,
          })
          .then((r) => {
            logToBackend(
              `Saved auth data to backend state=${state}, code_challenge=${code_challenge}`,
            );

            console.log(state, code_challenge);

            VKID.Config.init({
              app: 51786441,
              redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
              state: state,
              codeChallenge: code_challenge,
              //codeChallengeMethod: "S256",
              scope: "email",
            });

            logToBackend("VKID SDK initialized");
          });

        const oneTap = new VKID.OneTap();
        const container = document.getElementById("VkIdSdkOneTap");

        if (container) {
          oneTap
            .render({
              container: container,
              scheme: VKID.Scheme.LIGHT,
              lang: VKID.Languages.RUS,
            })
            .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
              const code = payload.code;
              const deviceId = payload.device_id;

              VKID.Auth.exchangeCode(code, deviceId)
                .then((data) => logToBackend(`exchangeCode DATA: ${data}`))
                .catch((err) => {
                  const err_str = JSON.stringify(err);
                  logToBackend(`exchangeCode ERROR: ${err_str}`);
                });
            })
            .on(VKID.WidgetEvents.ERROR, (err) => {
              const err_str = JSON.stringify(err);
              logToBackend(`WidgetEvents ERROR: ${err_str}`);
            });
          logToBackend("VK OneTap rendered");
        }
      })
      .catch((err) => {
        logToBackend(`Error fetching VK auth data: ${err}`);
        console.error(err);
      });
  }, []);

  const handleVkAuth = (data) => {
    const new_data = JSON.stringify(data);
    logToBackend("Handling VK auth response");
    logToBackend(`DATA: ${new_data}`);
    const { code, state } = data;
    if (!code || !state) {
      logToBackend("Invalid VK auth response: missing code or state");
      console.error("Invalid VK auth response: missing code or state");
      setError(true);
      return;
    }

    logToBackend(`VK auth success: code=${code}, state=${state}`);
    sessionStorage.setItem("vk_code_used", "true");

    axios
      .get(`https://storisbro.com/vk_callback/?code=${code}&state=${state}`)
      .then((response) => {
        const { access_token, refresh_token, user_id } = response.data;
        localStorage.setItem("token", access_token);
        if (refresh_token) localStorage.setItem("refresh", refresh_token);
        localStorage.setItem("id", user_id);
        dispatch(setTokken(access_token));
        navigate("/admin");

        logToBackend(
          "Successfully received tokens and redirected to admin page",
        );
      })
      .catch((error) => {
        logToBackend(`Error exchanging code for tokens: ${error}`);
        console.error("Error exchanging code for tokens:", error);
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
      <Box
        sx={{ width: { xs: "50%", sm: "35%", md: "25%" }, m: "0 auto", mt: 2 }}
      >
        <Box id="VkIdSdkOneTap" sx={{ mt: 2 }}></Box>
      </Box>
    </Box>
  );
};

export default CreativessBeforeEnter;
