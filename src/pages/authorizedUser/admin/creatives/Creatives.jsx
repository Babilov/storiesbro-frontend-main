import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import axios from "axios";
import logToBackend from "../../../../utils/logs";

const Creatives = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const fetchVkAuth = async () => {
      const token = localStorage.getItem("access_token");
      let is_vk_authed = localStorage.getItem("is_vk_authed");

      await logToBackend(`VK Auth статус из localStorage: ${is_vk_authed}`);

      if (is_vk_authed === null || is_vk_authed === "null") {
        try {
          await logToBackend("Запрос на проверку авторизации...");
          const response = await axios.get(
            "https://storisbro.com/api/auth-status/",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          const authenticated = response.data.authenticated;
          setAuthed(authenticated);
          localStorage.setItem("is_vk_authed", JSON.stringify(authenticated));

          await logToBackend(
            `Результат запроса: ${JSON.stringify(response.data)}`,
          );
        } catch (error) {
          await logToBackend(
            `Ошибка при проверке авторизации: ${error.message}`,
            "ERROR",
          );
        }
      } else {
        is_vk_authed = JSON.parse(is_vk_authed);
        setAuthed(is_vk_authed);
        await logToBackend(
          `Авторизация установлена из localStorage: ${is_vk_authed}`,
        );
      }
    };

    fetchVkAuth();
  }, []);

  useEffect(() => {
    logToBackend(`AUTHED изменился: ${authed}`);
  }, [authed]);

  return (
    <>
      {!authed ? (
        <CreativessBeforeEnter setAthed={setAuthed} />
      ) : (
        <CreativesAfterEnter />
      )}
    </>
  );
};

export default Creatives;
