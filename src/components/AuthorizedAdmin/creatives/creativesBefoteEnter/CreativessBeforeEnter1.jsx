import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import "./styles/style.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as VKID from "@vkid/sdk";
import { setTokken } from "../../../../store/userReducer";
import axios from "axios";

const CreativessBeforeEnter1 = ({ setAuthed }) => {
  const [error, setError] = useState(false);
  const [authData, setAuthData] = useState(null); // Для хранения state и code_challenge
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logToBackend = (logMessage, additionalData = null) => {
    const logData = { message: logMessage };
    if (additionalData) logData.details = additionalData;

    axios
      .post("https://storisbro.com/api/logs/", logData)
      .then((response) => {
        console.log("Log sent to server:", response.data);
      })
      .catch((error) => {
        console.error("Error sending log to server:", error);
      });
  };

  useEffect(() => {
    logToBackend("Started fetching VK auth data");

    // Получаем state и code_challenge с бэка
    fetch("https://storisbro.com/prefetch_vk_auth_data/")
      .then((res) => res.json())
      .then(({ state, code_challenge }) => {
        if (!state || !code_challenge) {
          logToBackend("Received invalid state or code_challenge", {
            state,
            code_challenge,
          });
          setError(true);
          return;
        }

        setAuthData({ state, code_challenge });
        logToBackend("Received state and code_challenge", {
          state,
          code_challenge,
        });

        // Сохраняем данные на сервере
        return axios.post("https://storisbro.com/api/vk/save_auth_data/", {
          code_challenge,
          state,
        });
      })
      .then(() => {
        logToBackend("Saved auth data to backend");
      })
      .catch((err) => {
        logToBackend("Error fetching or saving VK auth data", err);
        console.error("Error fetching or saving VK auth data:", err);
        setError(true);
      });
  }, []);

  const handleVkAuthClick = () => {
    if (!authData) {
      logToBackend("Auth data is not initialized");
      console.error("Auth data is not initialized");
      setError(true);
      return;
    }

    const { state, code_challenge } = authData;

    VKID.Config.init({
      app: 51786441,
      redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
      state,
      codeChallenge: code_challenge,
      // codeChallengeMethod: "S256",
      scope: "email",
    });

    logToBackend("VKID SDK initialized");

    const oneTap = new VKID.OneTap();

    oneTap
      .on(VKID.WidgetEvents.SUCCESS, handleVkAuth)
      .on(VKID.WidgetEvents.ERROR, (err) => {
        logToBackend("VK auth error", err);
        console.error("VKID Widget Error:", err);
        setError(true);
      });

    oneTap.show(); // Ручной вызов отображения виджета
    logToBackend("VK OneTap invoked manually");
  };

  const handleVkAuth = (data) => {
    logToBackend("Handling VK auth response");

    const { code, state } = data;
    if (!code || !state) {
      logToBackend("Invalid VK auth response: missing code or state", data);
      console.error("Invalid VK auth response: missing code or state");
      setError(true);
      return;
    }

    logToBackend("VK auth success", { code, state });
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
        logToBackend("Error exchanging code for tokens", error);
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
        {/* Кнопка вместо автоматического рендера OneTap */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleVkAuthClick}
          disabled={!authData}
        >
          Войти через ВКонтакте
        </Button>
      </Box>
    </Box>
  );
};

export default CreativessBeforeEnter1;
