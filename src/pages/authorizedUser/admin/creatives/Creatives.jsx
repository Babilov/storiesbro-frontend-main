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
    logToBackend("МЫ В ЮЗ ЭФФЕКТЕ");
    if (is_vk_authed === "true") {
      logToBackend("ОТРАБОТАЛО TRUE");
      setAuthed(true);
    } else {
      logToBackend("ОТРАБОТАЛО FALSE");
      setAuthed(false);
    }
    logToBackend(`AUTHED ===== ${authed}`);
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
