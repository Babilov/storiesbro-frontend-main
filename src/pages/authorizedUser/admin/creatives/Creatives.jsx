import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import axios from "axios";
import logToBackend from "../../../../utils/logs";

const Creatives = () => {
  let authed = localStorage.getItem("is_vk_authed");
  useEffect(() => {
    const fetchVkAuth = async () => {
      const token = localStorage.getItem("access_token");
      // await logToBackend(`VK Auth статус из localStorage: ${authed}`);

      if (authed === null || authed === "null") {
        try {
          // await logToBackend("Запрос на проверку авторизации...");
          const response = await axios.get(
            "https://storisbro.com/api/auth-status/",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          const authenticated = response["data"]["authenticated"];

          localStorage.setItem("is_vk_authed", JSON.stringify(authenticated));
          /*
                              await logToBackend(
                                `Результат запроса: ${JSON.stringify(response.data)}`,
                              );
                    
                     */
        } catch (error) {
          /*
                    await logToBackend(
                      `Ошибка при проверке авторизации: ${error.message}`,
                      "ERROR",
                    );
                     */
          console.log(error);
        }
      }
    };

    fetchVkAuth();
  }, [authed]);

  return (
    <>
      {authed === "false" ? <CreativessBeforeEnter /> : <CreativesAfterEnter />}
    </>
  );
};

export default Creatives;
