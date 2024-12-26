import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as VKID from "@vkid/sdk";
import axios from "axios";
import logToBackend from "../../../../utils/logs";

const CreativessBeforeEnter = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const generateState = () =>
    Math.random().toString(36).substring(2) + Date.now();

  const base64UrlEncode = (arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode(...bytes));
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
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
    const codeChallenge = base64UrlEncode(hashBuffer);

    return { codeVerifier, codeChallenge };
  };

  const handleVkAuth = (data) => {
    const { code, state, device_id } = data;
    sessionStorage.setItem("device_id", device_id);
    const codeVerifier = sessionStorage.getItem("code_verifier");
    const codeChallenge = sessionStorage.getItem("code_challenge");
    const storedState = sessionStorage.getItem("state");

    if (state !== storedState) {
      logToBackend("State mismatch: Possible CSRF attack", "ERROR");
      setError(true);
      return;
    }
    const user_id = localStorage.getItem("id");
    axios
      .get(
        `/accounts/vk/login/callback/?code=${code}&state=${state}&device_id=${device_id}&code_verifier=${codeVerifier}&user_id=${user_id}`,
      )
      .then((res) => {
        localStorage.setItem("vk_access_token", res.data.access_token);
        localStorage.setItem("is_authed", "true");
        window.location.reload();
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
        sessionStorage.setItem("code_challenge", codeChallenge);
        sessionStorage.setItem("code_verifier", codeVerifier);
        const state = generateState();
        sessionStorage.setItem("state", state);

        VKID.Config.init({
          app: 51786441,
          redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
          state,
          codeChallenge,
          codeChallengeMethod: "S256",
          scope: "groups stories stats",
          responseMode: VKID.ConfigResponseMode.Callback,
        });

        const oneTap = new VKID.OneTap();
        oneTap
          .render({ container: document.getElementById("VkIdSdkOneTap") })
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, handleVkAuth)
          .on(VKID.WidgetEvents.ERROR, (err) =>
            logToBackend(`OneTap error: ${JSON.stringify(err)}`, "ERROR"),
          );
      } catch (err) {
        logToBackend(`Error initializing VKID: ${err.message}`, "ERROR");
      }
    })();
  }, []);

  return (
    <Box className="creatives">
      <Typography
        variant="h4"
        className="creatives__title"
        sx={{
          fontSize: { sm: "32px", xs: "16px" },
          fontWeight: 600,
          textAlign: "center",
          mb: "20px",
        }}
      >
        Мои сообщества
      </Typography>
      <Typography
        variant="body2"
        className="creatives__text"
        sx={{
          fontSize: { sm: "24px", xs: "16px" },
          fontWeight: 400,
          textAlign: "center",
          m: "0 auto",
        }}
      >
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
