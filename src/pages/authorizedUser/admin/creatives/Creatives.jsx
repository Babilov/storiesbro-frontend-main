import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import axios from "axios";
import logToBackend from "../../../../utils/logs";

const Creatives = () => {
  const [authed, setAuthed] = useState(false);
  const is_vk_authed = localStorage.getItem("is_vk_authed");

  useEffect(() => {
    const fetchVkAuth = async () => {
      const token = localStorage.getItem("access_token");
      await logToBackend("МЫ В ЮЗ ЭФФЕКТЕ");
      await logToBackend("AAAAAAAAAAAAAAAAAAAAAAAAA");
      await logToBackend(`ИЗ ВК АУФ В ЮЗ ЭФФЕКТЕ ${is_vk_authed}`);
      await logToBackend(`ТИП ${typeof is_vk_authed}`);
      if (is_vk_authed === null || is_vk_authed === "null") {
        await logToBackend("ОТРАБОТАЛО НУЛЛ");
        const new_vk_auth = await axios.get(
          `https://storisbro.com/api/auth-status/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Токен в заголовке
            },
          },
        );
        setAuthed(new_vk_auth["data"]["authenticated"]);
        localStorage.setItem("is_vk_authed", authed);
        await logToBackend(`НЬЮ ВК АУФТ: ${JSON.stringify(new_vk_auth)}`);
        await logToBackend(`АУФТ: ${authed} ТИП ${typeof authed}`);
        await logToBackend(`СУКААААА: ${new_vk_auth["data"]["authenticated"]}`);
      }
      if (is_vk_authed === "true") {
        await logToBackend("ОТРАБОТАЛО TRUE");
        setAuthed(true);
      } else {
        await logToBackend("ОТРАБОТАЛО FALSE");
        setAuthed(false);
      }
      await logToBackend(`AUTHED ===== ${authed}`);
    };
    fetchVkAuth();
  }, []);

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
