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

  const logToBackend = (logMessage, logLevel = "INFO") => {
    // Отправляем лог на сервер
    axios
      .post("https://storisbro.com/api/logs/", {
        message: `[${logLevel}] ${logMessage}`,
      })
      .then((response) => {
        console.log("Log sent to server", response.data);
      })
      .catch((error) => {
        console.error("Error sending log to server:", error);
      });
  };

  useEffect(() => {
    logToBackend("useEffect started", "DEBUG");

    fetch("https://storisbro.com/prefetch_vk_auth_data/")
      .then((res) => res.json())
      .then(({ state, code_challenge }) => {
        logToBackend(
          `Received state=${state}, code_challenge=${code_challenge}`,
          "INFO",
        );

        axios
          .post("https://storisbro.com/api/vk/save_auth_data/", {
            code_challenge,
            state,
          })
          .then(() => {
            logToBackend("Auth data saved successfully", "INFO");

            VKID.Config.init({
              app: "51786441",
              redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
              state,
              codeChallenge: code_challenge,
              codeChallengeMethod: "S256",
              scope: "email",
            });

            logToBackend("VKID SDK initialized", "INFO");

            const oneTap = new VKID.OneTap();
            const container = document.getElementById("VkIdSdkOneTap");

            if (container) {
              oneTap
                .render({ container })
                .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, handleVkAuth)
                .on(VKID.WidgetEvents.ERROR, (err) => {
                  logToBackend(`OneTap error: ${JSON.stringify(err)}`, "ERROR");
                });

              logToBackend("OneTap rendered", "INFO");
            } else {
              logToBackend("OneTap container not found", "WARNING");
            }
          })
          .catch((err) => {
            logToBackend(`Error saving auth data: ${err}`, "ERROR");
          });
      })
      .catch((err) => {
        logToBackend(`Error fetching VK auth data: ${err}`, "ERROR");
      });
  }, []);

  const handleVkAuth = (data) => {
    logToBackend(`VK auth response received: ${JSON.stringify(data)}`, "DEBUG");

    const { code, state } = data;
    if (!code || !state) {
      logToBackend("Missing code or state in VK auth response", "ERROR");
      setError(true);
      return;
    }

    sessionStorage.setItem("vk_code_used", "true");
    logToBackend("VK auth session flag set", "DEBUG");

    axios
      .get(`https://storisbro.com/vk_callback/?code=${code}&state=${state}`)
      .then((response) => {
        const { access_token, refresh_token, user_id } = response.data;
        localStorage.setItem("token", access_token);
        if (refresh_token) localStorage.setItem("refresh", refresh_token);
        localStorage.setItem("id", user_id);
        dispatch(setTokken(access_token));
        logToBackend(
          `Tokens received and stored: access_token=${access_token}`,
          "INFO",
        );

        navigate("/admin");
        logToBackend("Navigation to admin panel successful", "INFO");
      })
      .catch((error) => {
        logToBackend(`Error exchanging code for tokens: ${error}`, "ERROR");
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
