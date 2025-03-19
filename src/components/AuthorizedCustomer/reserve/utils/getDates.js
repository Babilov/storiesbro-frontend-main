import { API_URL } from "../../../../constants/constatns";
import axios from "axios";

export const getDates = async () => {
  try {
    const response = await axios.get(`${API_URL}api_reservation/reservations`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};
