import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import axios from "axios";
import logToBackend from "../../../../utils/logs";
import { refreshToken } from "../../../../api/token";

const Creatives = () => {
  const [authedVk, setAuthedVk] = useState(false);
  useEffect(() => {
    const refresh = async () => {
      await refreshToken();
    };
    refresh().then(() => {
      console.log("refreshed!!!");
    });
  }, []);

  const token = localStorage.getItem("access_token");

  const ws = new WebSocket(
    `wss://storisbro.com/ws/auth_status/?token=${token}`,
  );
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Auth status changed:", data["authenticated"]);
    setAuthedVk(data["authenticated"]);
  };

  // let authed = localStorage.getItem("is_vk_authed");
  /*useEffect(() => {
            const fetchVkAuth = async () => {
              // await logToBackend(`VK Auth статус из localStorage: ${authed}`);
        
              if (authed === null || authed === "null") {
                try {
                  await refreshToken();
                  const new_token = localStorage.getItem("access_token");
        
                  const response = await axios.get(
                    "https://storisbro.com/api/auth-status/",
                    {
                      headers: { Authorization: `Bearer ${new_token}` },
                    },
                  );
        
                  const authenticated = response["data"]["authenticated"];
        
                  localStorage.setItem("is_vk_authed", JSON.stringify(authenticated));
                } catch (error) {
                  console.log(error);
                }
              }
            };
        
            fetchVkAuth();
          }, [authed]);
          */

  return <>{!authedVk ? <CreativessBeforeEnter /> : <CreativesAfterEnter />}</>;
};
export default Creatives;
