import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import axios from "axios";
import logToBackend from "../../../../utils/logs";

const Creatives = () => {
  logToBackend("МЫ В CREATIVES");
  const [authed, setAuthed] = useState(false);
  const is_vk_authed = localStorage.getItem("is_vk_authed");
  logToBackend(`LOCALSTORAGE IS_VK_AUTH: ${is_vk_authed}`);

  useEffect(() => {
    const fetchVkAuth = async () => {
      const token = localStorage.getItem("access_token");
      logToBackend("МЫ В ЮЗ ЭФФЕКТЕ");
      if (is_vk_authed === null) {
        logToBackend("ОТРАБОТАЛО НУЛЛ");
        const new_vk_auth = await axios.get(
          `https://storisbro.com/api/auth-status/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Токен в заголовке
            },
          },
        );
        setAuthed(new_vk_auth["data"]["authenticated"]);
        logToBackend(`НЬЮ ВК АУФТ: ${new_vk_auth}`);
        logToBackend(`АУФТ: ${authed}`);
      }
      if (is_vk_authed === "true") {
        logToBackend("ОТРАБОТАЛО TRUE");
        setAuthed(true);
      } else {
        logToBackend("ОТРАБОТАЛО FALSE");
        setAuthed(false);
      }
      logToBackend(`AUTHED ===== ${authed}`);
    };
    fetchVkAuth();
  }, [is_vk_authed]);

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
