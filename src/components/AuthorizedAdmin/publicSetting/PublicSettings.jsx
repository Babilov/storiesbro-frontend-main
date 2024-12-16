import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PublicsContext } from "../../../context/PublicsContext";
import { API_URL } from "../../../constants/constatns";
import axios from "axios";
import question from "./images/question.svg";

const userId = localStorage.getItem("id");

const PublicSettings = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    // Функция для выполнения запроса с использованием Axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}api_communities/settings_communities/${userId}/${id}`,
        );
        setData(response.data);
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
  }, []);

  return (
    <Grid container className="grid">
      <Grid item xs={12}>
        <Typography className="title">Настройки сообщества</Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          alt="img"
          // src={publicObj["file"]}
          sx={{ width: "15%" }}
        />
        <Typography sx={{ fontSize: "24px", fontWeight: 600, mt: 4, mb: 4 }}>
          {/* {publicObj["name"]} */}
          {/* {publics[0]['name']} */}
          {data["name"]}
        </Typography>
      </Grid>

      <Grid
        item
        md={9}
        container
        className="grayBorder"
        sx={{ m: "0 auto", p: "16px 16px 0 16px" }}
      >
        <Grid item xs={12} sx={{ borderBottom: "1px solid #CDCDCD" }}>
          <Typography
            sx={{
              fontSize: { sm: "18px", xs: "12px" },
              fontWeight: 600,
              textAlign: "center",
              mb: 2,
              cursor: "pointer",
            }}
          >
            Контент-видео
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              borderRight: { md: "1px solid black" },
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              mt: "10px",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: "18px", xs: "14px" },
                fontWeight: 500,
                textAlign: { md: "center", xs: "left" },
                cursor: "pointer",
                color: "#E37E31",
                ":hover": { color: "#E37E31" },
              }}
            >
              Стандартные МЦА
            </Typography>
            <Box
              component="img"
              src={question}
              alt="question"
              sx={{ ml: "5px", mr: "20px" }}
            />
          </Box>
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRight: { md: "1px solid black" },
              mt: "10px",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: "18px", xs: "14px" },
                fontWeight: 500,
                textAlign: { md: "center", xs: "left" },

                cursor: "pointer",
                ":hover": { color: "#E37E31" },
              }}
            >
              Стандартные ЖЦА
            </Typography>
            <Box
              component="img"
              src={question}
              alt="question"
              sx={{ ml: "5px", mr: "20px" }}
            />
          </Box>
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRight: { md: "1px solid black" },
              mt: "10px",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: "18px", xs: "14px" },
                fontWeight: 500,
                textAlign: { md: "center", xs: "left" },

                cursor: "pointer",
                ":hover": { color: "#E37E31" },
              }}
            >
              Стандартные ВЦА
            </Typography>
            <Box
              component="img"
              src={question}
              alt="question"
              sx={{ ml: "5px", mr: "20px" }}
            />
          </Box>
        </Grid>
        {/*
        <Grid item md={2.4} xs={12}>
          <Typography
            sx={{
              fontSize: { sm: "18px", xs: "14px" },
              fontWeight: 500,
              textAlign: { md: "center", xs: "left" },
              mt: 2,
              borderRight: { md: "1px solid black" },
              cursor: "pointer",
            }}
          >
            Свои видео
          </Typography>
        </Grid>
*/}
        <Grid
          item
          md={3}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              mt: "10px",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: "18px", xs: "14px" },
                fontWeight: { sm: 400, xs: 500 },
                textAlign: { md: "center", xs: "left" },
                cursor: "pointer",
                ":hover": { color: "#E37E31" },
              }}
            >
              Не постить
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid
        item
        md={4}
        container
        className="grayBorder"
        sx={{ m: "40px auto", p: 2 }}
      >
        <Grid item xs={12} sx={{ borderBottom: "1px solid #CDCDCD" }}>
          <Typography
            sx={{
              fontSize: { sm: "18px", xs: "12px" },
              fontWeight: 600,
              textAlign: "center",
              mb: 2,
            }}
          >
            Состояние
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              borderRight: "1px solid black",
              fontSize: { sm: "18px", xs: "14px" },
              fontWeight: 500,
              textAlign: "center",
              mt: 2,
              cursor: "pointer",
              color: state ? "#D25D48" : "black",
            }}
            onClick={() => setState(true)}
          >
            Включить
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              fontSize: { sm: "18px", xs: "14px" },
              fontWeight: 500,
              textAlign: "center",
              mt: 2,
              cursor: "pointer",
              color: !state ? "#D25D48" : "black",
            }}
            onClick={() => setState(false)}
          >
            Отключено
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PublicSettings;
