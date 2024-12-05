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

  // Генерация пары PKCE
  const generatePKCEPair = async () => {
    logToBackend("Generating PKCE pair", "DEBUG");
    const randomString = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      return Array.from({ length: 128 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join("");
    };

    const codeVerifier = randomString();
    logToBackend(`Generated code verifier: ${codeVerifier}`, "DEBUG");
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);

    // Вычисляем хэш SHA-256 (асинхронно)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const codeChallenge = btoa(String.fromCharCode(...hashArray))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    logToBackend(`Generated code challenge: ${codeChallenge}`, "DEBUG");
    return { codeVerifier, codeChallenge };
  };

  useEffect(() => {
    (async () => {
      try {
        logToBackend("useEffect started", "DEBUG");

        const { codeVerifier, codeChallenge } = await generatePKCEPair();
        sessionStorage.setItem("code_verifier", codeVerifier);
        logToBackend(
          `codeVerifier: ${codeVerifier}, codeChallenge: ${codeChallenge}`,
          "INFO",
        );

        const state = Math.random().toString(36).substring(2); // Генерация уникального state
        sessionStorage.setItem("state", state);
        logToBackend(`Generated and saved state: ${state}`, "INFO");

        VKID.Config.init({
          app: "51786441",
          redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
          state,
          codeChallenge,
          codeChallengeMethod: "S256",
          scope: "email",
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
        logToBackend(`Error in useEffect: ${err}`, "ERROR");
      }
    })();
  }, []);

  const handleVkAuth = (data) => {
    logToBackend(`VK auth response received: ${JSON.stringify(data)}`, "DEBUG");

    const { code, state } = data;
    if (!code || !state) {
      logToBackend("Missing code or state in VK auth response", "ERROR");
      setError(true);
      return;
    }

    const storedState = sessionStorage.getItem("state");
    if (state !== storedState) {
      logToBackend("State mismatch: Possible CSRF attack", "ERROR");
      setError(true);
      return;
    }

    logToBackend("State verified successfully", "INFO");

    const codeVerifier = sessionStorage.getItem("code_verifier");
    logToBackend("Sending code, state, and code verifier to backend", "DEBUG");
    axios
      .post("https://storisbro.com/vk_callback/", {
        code,
        state,
        code_verifier: codeVerifier,
      })
      .then((response) => {
        const { access_token, user_id } = response.data;
        logToBackend(
          `Tokens received: access_token=${access_token}, user_id=${user_id}`,
          "INFO",
        );
        dispatch(setTokken(access_token));
        logToBackend("Tokens stored in Redux", "INFO");
        navigate("/admin");
      })
      .catch((err) => {
        logToBackend(`Error exchanging code for tokens: ${err}`, "ERROR");
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
