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
  /*
                  useEffect(() => {
                    const fetchAuthed = async () => {
                      const userId = localStorage.getItem("id");
                      const token = localStorage.getItem("access_token");
                      const isAuthed = await axios.get(
                        `https://storisbro.com/api/auth-status/`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`, // Токен в заголовке
                          },
                        },
                      );
                      logToBackend(`Front Authed: ${JSON.stringify(isAuthed)}`);
                      // console.log(isAuthed.data.authenticated);
                      setAuthed(isAuthed.data.authenticated);
                    };
                    fetchAuthed();
                  }, []);
                  */

  return (
    <>
      {logToBackend(`ABOBA1: ${!localStorage.getItem("is_vk_authed")}`)}
      {logToBackend(
        `ABOBA: ${!localStorage.getItem("is_vk_authed") === false}`,
      )}
      {!localStorage.getItem("is_vk_authed") === false ? (
        <CreativessBeforeEnter setAthed={setAuthed} />
      ) : (
        <CreativesAfterEnter />
      )}
    </>
  );
};

export default Creatives;
