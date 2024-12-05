import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as VKID from "@vkid/sdk";
import axios from "axios";
import { setTokken } from "../../../../store/userReducer";

const CreativessBeforeEnter = ({ setAuthed }) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logToBackend = (logMessage, logLevel = "INFO") => {
    axios
      .post("https://storisbro.com/api/logs/", {
        message: `[${logLevel}] ${logMessage}`,
      })
      .then(() => console.log("Log sent to server"))
      .catch((err) => console.error("Error sending log:", err));
  };

  const generatePKCEPair = async () => {
    logToBackend("Generating PKCE pair", "DEBUG");

    const randomString = (length = 128) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join("");
    };

    const codeVerifier = randomString();
    logToBackend(`Generated code verifier: ${codeVerifier}`, "DEBUG");

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const codeChallenge = btoa(String.fromCharCode(...hashArray))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    logToBackend(`Generated code challenge: ${codeChallenge}`, "DEBUG");
    return { codeVerifier, codeChallenge };
  };

  const generateState = () => {
    const state = Array(3)
      .fill(null)
      .map(() => Math.random().toString(36).substring(2))
      .join("");
    return state;
  };

  useEffect(() => {
    (async () => {
      try {
        logToBackend("useEffect started", "DEBUG");

        const { codeVerifier, codeChallenge } = await generatePKCEPair();
        sessionStorage.setItem("code_verifier", codeVerifier);

        const state = generateState();
        sessionStorage.setItem("state", state);
        logToBackend(`Generated state: ${state}`, "INFO");

        VKID.Config.init({
          app: "51786441", // ID вашего приложения
          redirectUrl: "https://storisbro.com/accounts/vk/login/callback/", // Доверенный Redirect URL
          state,
          codeChallenge,
          codeChallengeMethod: "S256",
          scope: "email",
          responseMode: VKID.ConfigResponseMode.Callback, // Работа в режиме Callback
        });

        logToBackend("VKID SDK initialized", "INFO");

        const oneTap = new VKID.OneTap();
        const container = document.getElementById("VkIdSdkOneTap");

        if (container) {
          logToBackend("OneTap container found", "DEBUG");
          oneTap
            .render({ container })
            .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, handleVkAuth)
            .on(VKID.WidgetEvents.ERROR, (err) =>
              logToBackend(`OneTap error: ${JSON.stringify(err)}`, "ERROR"),
            );
          logToBackend("OneTap rendered successfully", "INFO");
        } else {
          logToBackend("OneTap container not found", "WARNING");
        }
      } catch (err) {
        logToBackend(`Error in useEffect: ${err.message}`, "ERROR");
      }
    })();
  }, []);

  const handleVkAuth = (data) => {
    logToBackend(`VK auth response received: ${JSON.stringify(data)}`, "DEBUG");

    const { code, state, device_id } = data;
    logToBackend(
      `GET: code: ${code}, state: ${state}, device_id: ${device_id}`,
      "DEBUG",
    );
    if (!code || !state || !device_id) {
      logToBackend(
        "Missing code, state, or device_id in VK auth response",
        "ERROR",
      );
      setError(true);
      return;
    }

    const storedState = sessionStorage.getItem("state");
    if (state !== storedState) {
      logToBackend("State mismatch: Possible CSRF attack", "ERROR");
      setError(true);
      return;
    }

    const codeVerifier = sessionStorage.getItem("code_verifier");
    logToBackend(
      `POST: code: ${code}, state: ${state}, device_id: ${device_id}, codeVerifier: ${codeVerifier}`,
      "DEBUG",
    );
    axios
      .post("https://storisbro.com/vk_callback/", {
        code,
        state,
        code_verifier: codeVerifier,
        device_id,
      })
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
