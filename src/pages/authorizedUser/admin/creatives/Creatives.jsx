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
    if (is_vk_authed === "true") {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
    logToBackend(`ABOBA!!!!!!!!!!!!!!!!!!!!!!!!: ${authed}`);
    logToBackend(
      `ABOBA????????????????????????: ${localStorage.getItem("is_vk_authed")}`,
    );
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
