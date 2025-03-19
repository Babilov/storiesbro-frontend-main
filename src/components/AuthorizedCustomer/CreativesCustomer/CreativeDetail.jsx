import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import MyButton from "../../UI/buttons/MyButton";

import { API_URL } from "../../../constants/constatns";
import axios from "axios";

const userId = localStorage.getItem("id");

const CreativeDetail = () => {
  const { id, creative_type } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функция для выполнения запроса с использованием Axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}api_creatives/detail_user_creative/${userId}/${creative_type}/${id}`
        );
        setData(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    // Вызываем функцию fetchData при монтировании компонента
    fetchData();

    // Возвращаем функцию очистки (cleanup function) для отмены запроса при размонтировании компонента
    return () => {
      // Отменить запрос, если компонент размонтирован
    };
  }, [id, creative_type]);

  return (
    <Box className="grid">
      {loading ? (
        // Заменяем текст "Loading..." на компонент с видео
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video autoPlay loop muted style={{ width: "25%" }}>
            <source
              src="http://127.0.0.1:8000/media/files/Animatsia_storisbro.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      ) : (
        <Box
          className="grid"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography className="title">
            {/* “{creative["name"]}” */}
            {data["name"]}
          </Typography>
          <Box
            component="img"
            alt="creative"
            src={data["file"]}
            sx={{ width: "20%" }}
          />
          <Paper sx={{ p: 1.5 }}>
            <Link target="_blank" to={data["link"]}>
              {data["link"]}
            </Link>
          </Paper>

          <Box sx={{ width: "20%", mt: 2 }}>
            <MyButton options={{ background: "#E37E31" }}>Посмотреть</MyButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CreativeDetail;
