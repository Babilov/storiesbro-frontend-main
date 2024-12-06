import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as VKID from "@vkid/sdk";
import axios from "axios";

const CreativessBeforeEnter = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Логирование событий на бэкенд
  const logToBackend = (logMessage, logLevel = "INFO") => {
    axios
      .post("https://storisbro.com/api/logs/", {
        message: `[${logLevel}] ${logMessage}`,
      })
      .then(() => console.log("Log sent to server"))
      .catch((err) => console.error("Error sending log:", err));
  };

  // Получение CSRF-токена
  const getCsrfToken = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "csrftoken") return value;
    }
    return "";
  };

  const generatePKCEPair = async () => {
    const randomString = (length = 128) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join("");
    };
    const codeVerifier = randomString();
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(codeVerifier),
    );
    const codeChallenge = btoa(
      String.fromCharCode(...new Uint8Array(hashBuffer)),
    )
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return { codeVerifier, codeChallenge };
  };

  // Генерация state
  const generateState = () => {
    return Math.random().toString(36).substring(2) + Date.now();
  };

  // Обработка входа через VK ID
  const handleVkAuth = (data) => {
    const { code, state, device_id } = data;
    const codeVerifier = sessionStorage.getItem("code_verifier");
    const storedState = sessionStorage.getItem("state");
    logToBackend(
      `state: ${state} \n state: ${state} \n device_id: ${device_id} \n code_verifier: ${codeVerifier} \n storedState: ${storedState}`,
    );
    if (state !== storedState) {
      logToBackend("State mismatch: Possible CSRF attack", "ERROR");
      setError(true);
      return;
    }

    axios
      .post(
        "https://storisbro.com/vk_callback/",
        { code, state, code_verifier: codeVerifier, device_id },
        {
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
        },
      )
      .then(() => {
        logToBackend("Tokens successfully exchanged on the backend", "INFO");
        navigate("/admin");
      })
      .catch((err) => {
        logToBackend(
          `Error exchanging code for tokens: ${err.message}`,
          "ERROR",
        );
        setError(true);
      });
  };

  useEffect(() => {
    (async () => {
      try {
        const { codeVerifier, codeChallenge } = await generatePKCEPair();
        sessionStorage.setItem("code_verifier", codeVerifier);

        const state = generateState();
        sessionStorage.setItem("state", state);

        VKID.Config.init({
          app: "51786441",
          redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
          state,
          codeChallenge,
          codeChallengeMethod: "S256",
          scope: "email",
          responseMode: VKID.ConfigResponseMode.Callback,
        });

        const oneTap = new VKID.OneTap();
        const container = document.getElementById("VkIdSdkOneTap");
        oneTap
          .render({ container })
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, handleVkAuth)
          .on(VKID.WidgetEvents.ERROR, (err) =>
            logToBackend(`OneTap error: ${JSON.stringify(err)}`, "ERROR"),
          );
      } catch (err) {
        logToBackend(`Error in useEffect: ${err.message}`, "ERROR");
      }
    })();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Мои сообщества</Typography>
      <Typography variant="body2">
        Войдите через VK ID, чтобы продолжить
      </Typography>
      <Box id="VkIdSdkOneTap" />
    </Box>
  );
};

export default CreativessBeforeEnter;
