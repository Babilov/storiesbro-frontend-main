import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PublicsContext } from "../../../context/PublicsContext";
import { API_URL } from "../../../constants/constatns";
import axios from "axios";
import question from "./images/question.svg";
import logToBackend from "../../../utils/logs";

const PublicSettings = () => {
  const { id } = useParams();
  const [state, setState] = useState(false);
  const [publicObj, setPublic] = useState(true);
  const params = useParams();
  const groupId = params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(
          `https://storisbro.com/api/group_details/?user_id=${userId}&group_id=${groupId}`,
        );
        setPublic(response.data);
        logToBackend(JSON.stringify(response.data));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    // Вызываем функцию fetchData при монтировании компонента
    fetchData();
  }, []);

  return (
    <Grid container className="grid">
      {console.log(publicObj.group)}
      {console.log(publicObj["group"])}
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
          src={publicObj["group"]["photo"]}
          sx={{ width: "15%" }}
        />
        <Typography sx={{ fontSize: "24px", fontWeight: 600, mt: 4, mb: 4 }}>
          {/* {publicObj["name"]} */}
          {/* {publics[0]['name']} */}
          {publicObj["group"]["name"]}
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
              sx={{ ml: "5px", mr: "20px", cursor: "pointer" }}
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
              sx={{ ml: "5px", mr: "20px", cursor: "pointer" }}
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
            <Tooltip
              title={
                <>
                  <Typography>Взрослая целевая аудитория</Typography>
                  <Link> Подробнее </Link>
                </>
              }
            >
              <Box
                component="img"
                src={question}
                alt="question"
                sx={{ ml: "5px", mr: "20px", cursor: "pointer" }}
              />
            </Tooltip>
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
