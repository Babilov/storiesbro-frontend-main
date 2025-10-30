import React, { useEffect, useRef, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import { refreshToken } from "../../../../api/token";

const Creatives = () => {
  const [authedVk, setAuthedVk] = useState(false);
  const wsRef = useRef(null); // ссылка на текущее соединение

  // Обновляем токен при монтировании
  useEffect(() => {
    const refresh = async () => {
      await refreshToken();
    };
    refresh().then(() => {
      console.log("refreshed!!!");
    });
  }, []);

  // Создание WebSocket — только один раз при монтировании
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const ws = new WebSocket(
      `wss://storisbro.com/ws/auth_status/?token=${token}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAuthedVk(data["authenticated"]);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // cleanup при размонтировании
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
        console.log("WebSocket cleaned up on unmount");
      }
    };
  }, []);

  // Функция для ручного отключения
  const disconnectWebSocket = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
      wsRef.current = null;
      setAuthedVk(false);
    }
  };

  return (
    <>
      {!authedVk ? (
        <CreativessBeforeEnter />
      ) : (
        <CreativesAfterEnter
          setAuthedVk={setAuthedVk}
          disconnectWebSocket={disconnectWebSocket}
          ws={wsRef.current}
        />
      )}
    </>
  );
};

export default Creatives;
