import logToBackend from "../utils/logs";

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) {
    throw new Error("Нет refresh-токена");
  }

  const response = await fetch(
    "https://storisbro.com/api/authentication/token/refresh/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    },
  );

  if (!response.ok) {
    throw new Error("Ошибка обновления токена");
  }

  const data = await response.json();
  logToBackend(`DATA ()!()!(($)($!)( ${data}`);
  localStorage.setItem("access_token", data.access);
  logToBackend(`ACCESS_TOKEN CHANGED new token: ${data.access}`);
}
