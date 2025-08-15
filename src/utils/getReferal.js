import axios from "axios";
import { API_URL } from "../constants/constatns";

export const getReferal = async () => {
  const res = await axios.get(`${API_URL}ref/referral-link/`);
  return res;
};
