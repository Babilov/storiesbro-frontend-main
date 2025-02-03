import logToBackend from "../utils/logs";
import axios from "axios";
import { API_URL } from "../constants/constatns";

export const localStorageSet = (data) => {
  logToBackend(JSON.stringify(data));
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  axios.defaults.headers.common["Authorization"] = "Bearer " + data["access"];

  localStorage.setItem("token", data["access"]);
  localStorage.setItem("refresh", data["refresh"]);
  localStorage.setItem("id", data["id"]);
  localStorage.setItem("count_of_visit", data["count_of_visit"] + 1);
  localStorage.setItem("UID", data["UID"]);
  localStorage.setItem("is_active", data["is_active"]);
  localStorage.setItem("statusAccount", "admin");
};

export const loginFunc = async (email, password) => {
  return await axios.post(
    `${API_URL}login/`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
