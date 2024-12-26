import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import axios from "axios";
import logToBackend from "../../../../utils/logs";

const Creatives = () => {
  const [authed, setAuthed] = useState(false);
  /*
              useEffect(() => {
                const isAuthed = localStorage.getItem("is_authed");
                if (isAuthed === "true") {
                  setAuthed(true);
                } else {
                  setAuthed(false);
                }
              }, []);
            */

  useEffect(() => {
    const fetchAuthed = async () => {
      const userId = sessionStorage.getItem("id");
      const isAuthed = await axios.get(
        `https://storisbro.com/api/auth-status/?user_id=${userId}`,
      );
      logToBackend(`Front Authed: ${isAuthed}`);
      setAuthed(isAuthed);
    };
    fetchAuthed();
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
