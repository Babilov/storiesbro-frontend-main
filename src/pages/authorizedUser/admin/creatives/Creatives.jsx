import React, { useEffect, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
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
    `wss://storisbro.com/ws/auth_status/?token=${token}`
  );
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Auth status changed:", data["authenticated"]);
    setAuthedVk(data["authenticated"]);
  };

  return (
    <>
      {!authedVk ? (
        <CreativessBeforeEnter />
      ) : (
        <CreativesAfterEnter setAuthedVk={setAuthedVk} />
      )}
    </>
  );
};
export default Creatives;
