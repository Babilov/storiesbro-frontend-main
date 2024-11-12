import axios from "axios";
import { API_URL } from "../constants/constatns";

export const fetchCreatives = () => {
  axios.get(`${API_URL}creatives`).then((res) => {
    return res["data"];
  });
};
// запросы post
export const addSingleCreative = (user, formData, setAddSuccess) => {
  formData.append("user", user);

  axios
    .post(`${API_URL}api_creatives/add_single_creative`, formData)
    .then((res) => {
      // Обработка успешного ответа

      // Добавьте код для обработки успешного ответа по вашему усмотрению

      setAddSuccess(true);
    })
    .catch((error) => {
      // Обработка ошибок
      if (error.response) {
        // Ошибка с ответом от сервера
        console.error("Error during POST request:", error.response.data);
      } else if (error.request) {
        // Ошибка без ответа от сервера
        console.error("No response received:", error.request);
      } else {
        // Общая ошибка
        console.error("Error setting up the request:", error.message);
      }
      // Добавьте код для обработки ошибки по вашему усмотрению
    });
};

export const addDoubleCreative = (
  user,
  first_file,
  first_link,
  first_name,
  second_file,
  second_link,
  second_name,
  setAddSuccess
) => {
  axios
    .post(`${API_URL}api_creatives/add_double_creative`, {
      user,
      first_file,
      first_link,
      first_name,
      second_file,
      second_link,
      second_name,
    })
    .then((res) => {
      // Обработка успешного ответа

      // Добавьте код для обработки успешного ответа по вашему усмотрению

      setAddSuccess(true);
    })

    .catch((error) => {
      console.error("Error during POST request:", error.response);
    });
};

export const addRepost = (user, link_of_story, name, setAddSuccess) => {
  axios
    .post(`${API_URL}api_creatives/add_repost_creative`, {
      user,
      link_of_story,
      name,
    })
    .then((res) => {
      // Обработка успешного ответа

      // Добавьте код для обработки успешного ответа по вашему усмотрению

      setAddSuccess(true);
    })
    .catch((error) => {
      console.error("Error during POST request:", error.response);
    });
};

export const addSticker = (user, link_of_story, name, setAddSuccess) => {
  axios
    .post(`${API_URL}api_creatives/add_sticker_creative`, {
      user,
      link_of_story,
      name,
    })
    .then((res) => {
      // Добавьте код для обработки успешного ответа по вашему усмотрению

      setAddSuccess(true);
    })
    .catch((error) => {
      console.error("Error during POST request:", error.response);
    });
};

export const addDoubleSticker = (
  user,
  link_of_story_first,
  link_of_story_second,
  name,
  setAddSuccess
) => {
  axios
    .post(`${API_URL}api_creatives/add_double_sticker_creative`, {
      user,
      link_of_story_first,
      link_of_story_second,
      name,
    })
    .then((res) => {
      // Добавьте код для обработки успешного ответа по вашему усмотрению

      setAddSuccess(true);
    })
    .catch((error) => {
      console.error("Error during POST request:", error.response);
    });
};

// уже другое
export const fetchCreativesDetail = (id) => {
  axios.get(`${API_URL}creatives/${id}`).then((res) => {
    return res["data"];
  });
};

export const fetchCreativesStatistic = (id) => {
  axios.get(`${API_URL}creatives/statistic/${id}`).then((res) => {
    return res["data"];
  });
};

export const deleteCreative = (id) => {
  axios.post(`${API_URL}creatives/delete/${id}`);
};
