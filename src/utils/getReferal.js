import axios from "axios";
import { API_URL } from "../constants/constatns";
import { fetchWithAuth } from "../api/token";

export const getReferal = async () => {
  const res = fetchWithAuth(`${API_URL}ref/referral-link/`);
  return res;
};
