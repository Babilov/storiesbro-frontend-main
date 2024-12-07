import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as VKID from "@vkid/sdk";
import axios from "axios";

const CreativessBeforeEnter = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [codeChallenge, setCodeChallenge] = useState("");

  const logToBackend = (message, level = "INFO") => {
    axios
      .post("/api/logs/", { message: `[${level}] ${message}` })
      .catch(console.error);
  };
  /*
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
        */
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
    const storedState = sessionStorage.getItem("state");
    logToBackend(
      `\ncode: ${code} \n state: ${state} \n device_id: ${device_id} \n code_verifier: ${codeChallenge}`,
    );
    if (state !== storedState) {
      logToBackend("State mismatch: Possible CSRF attack", "ERROR");
      setError(true);
      return;
    }
    axios
      .get(
        `/accounts/vk/login/callback/?code=${code}&state=${state}&device_id=${device_id}&code_verifier=${codeVerifier}`,
      )
      .then(() => {
        logToBackend(
          `Tokens successfully exchanged. 
 code: ${code} \n state: ${state} \n device_id: ${device_id}`,
          "INFO",
        );
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
        logToBackend(`CODE CHALLENGE!!!!!!!!!!! ${codeChallenge}`);
        setCodeChallenge(codeChallenge);
        sessionStorage.setItem("code_verifier", codeChallenge);

        const state = generateState();
        sessionStorage.setItem("state", state);

        VKID.Config.init({
          app: 51786441,
          redirectUrl: "https://storisbro.com/accounts/vk/login/callback/",
          state,
          codeChallenge,
          codeChallengeMethod: "S256",
          scope: "email",
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
    <Box>
      <Typography variant="h4">Вход через VK ID</Typography>
      <Typography variant="body2">
        Войдите через VK ID для продолжения
      </Typography>
      <Box id="VkIdSdkOneTap" />
    </Box>
  );
};

export default CreativessBeforeEnter;
