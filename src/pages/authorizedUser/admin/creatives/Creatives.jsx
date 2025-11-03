import React, { useEffect, useRef, useState } from "react";
import CreativessBeforeEnter from "../../../../components/AuthorizedAdmin/creatives/creativesBefoteEnter/CreativessBeforeEnter";
import CreativesAfterEnter from "../../../../components/AuthorizedAdmin/creatives/creativesAfterEnter/CreativesAfterEnter";
import { fetchWithAuth, refreshToken } from "../../../../api/token";
import axios from "axios";
import { API_URL } from "../../../../constants/constatns";

const Creatives = () => {
  const [authedVk, setAuthedVk] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const wsRef = useRef(null);

  // Обновляем токен при монтировании
  useEffect(() => {
    const refresh = async () => {
      await refreshToken();
    };
    refresh().then(() => {
      console.log("");
    });
  }, []);

  // Подключаем WebSocket
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const ws = new WebSocket(
      `wss://storisbro.com/ws/auth_status/?token=${token}`
    );
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAuthedVk(data["authenticated"]);
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);

    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
        console.log("WebSocket cleaned up on unmount");
      }
    };
  }, []);

  // Разрыв соединения с показом видео
  const disconnectWebSocket = () => {
    const getIsShowed = async () => {
      const res = await fetchWithAuth(`${API_URL}api/show_instruction/`, {
        headers: {
          Accept: "application/json",
        },
      });
      setIsShowed(res.is_showed_instructions);
    };
    getIsShowed();

    // показываем видео
    setShowVideo(true);
  };

  // Когда видео заканчивается — реально закрываем сокет
  const handleVideoEnd = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setShowVideo(false);
    setAuthedVk(false);
  };

  // Можно показать оверлей с видео (например, на весь экран)
  if (showVideo && !isShowed) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <video
          src="/videos/test.mp4"
          autoPlay
          onEnded={handleVideoEnd}
          style={{ width: "80%", maxWidth: "800px", borderRadius: "12px" }}
        />
      </div>
    );
  }

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
