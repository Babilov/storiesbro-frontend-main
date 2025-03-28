import axios from "axios";
import { API_URL } from "../constants/constatns";

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) {
    throw new Error("Нет refresh-токена");
  }

  const response = await fetch(`${API_URL}token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error("Ошибка обновления токена");
  }

  const data = await response.json();
  localStorage.setItem("access_token", data.access);
  // localStorage.setItem("refresh_token", data.refresh);
}

export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Пользователь не авторизован");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  await axios.post(
    `${API_URL}token-check/`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ access_token: token }),
    }
  );

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    await refreshToken();
    return fetchWithAuth(url, options); // Повторяем запрос после обновления токена
  }

  return response.json();
}
