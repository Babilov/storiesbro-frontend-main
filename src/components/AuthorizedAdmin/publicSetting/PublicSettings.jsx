import { Avatar, Box, Grid, styled, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PublicsContext } from "../../../context/PublicsContext";
import { API_URL } from "../../../constants/constatns";
import axios from "axios";
import question from "./images/question.svg";
import logToBackend from "../../../utils/logs";
import CustomToolTip from "../../UI/tooltip/CustomTooltip";

const PublicSettings = () => {
  const params = useParams();
  const [caState, setCaState] = useState(0);
  const [state, setState] = useState(0);
  const [publicObj, setPublic] = useState(undefined);
  const groupId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(
          `https://storisbro.com/api/group_details/?user_id=${userId}&group_id=${groupId}`,
        );
        setPublic(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    // Вызываем функцию fetchData при монтировании компонента
    fetchData();
  }, [groupId]);

  useEffect(() => {
    const fetchCaState = async () => {
      try {
        const resCa = await axios.get(
          "https://storisbro.com//api/community_status/",
        );
        const resSt = await axios.get(
          "https://storisbro.com/api/community_switch/",
        );
        setCaState(resCa.data);
        setState(resSt.data);

        logToBackend(`Ca: ${caState}`);
        logToBackend(`St: ${state}`);
      } catch (error) {
        logToBackend(`Error GET: ${error}`);
      }
    };
    fetchCaState();
  }, []);

  const onCaClick = async (ca) => {
    try {
      await axios.post("https://storisbro.com//api/community_status/", {
        status: ca,
      });
      setCaState(ca);
    } catch (error) {
      logToBackend(`Error POST: ${error}`);
    }
  };

  const onSwitchClick = async (st) => {
    try {
      await axios.post("https://storisbro.com/api/community_switch/", {
        status: st,
      });
      setState(st);
    } catch (error) {
      logToBackend(`Error POST: ${error}`);
    }
  };

  return (
    <Grid container className="grid">
      {publicObj !== undefined ? (
        <>
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
            <Avatar
              alt="img"
              src={publicObj["group"]["photo"]}
              sx={{
                width: { md: "184px", xs: "160px" },
                height: { md: "184px", xs: "160px" },
                borderRadius: "50%",
              }}
            />
            <Typography
              sx={{ fontSize: "24px", fontWeight: 600, mt: 4, mb: 4 }}
            >
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
                    color: caState === 0 ? "#E37E31" : "black",
                    ":hover": { color: "#E37E31" },
                  }}
                  onClick={() => onCaClick(0)}
                >
                  Стандартные МЦА
                </Typography>
                <CustomToolTip
                  arrow
                  title={
                    <>
                      <Typography>Мужская целевая аудитория</Typography>
                      <Link to="/admin-help#mca"> Подробнее </Link>
                    </>
                  }
                >
                  <Box
                    component="img"
                    src={question}
                    alt="question"
                    sx={{ ml: "5px", mr: "20px", cursor: "pointer" }}
                  />
                </CustomToolTip>
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
                    color: caState === 1 ? "#E37E31" : "black",
                    ":hover": { color: "#E37E31" },
                  }}
                  onClick={() => onCaClick(1)}
                >
                  Стандартные ЖЦА
                </Typography>
                <CustomToolTip
                  arrow
                  title={
                    <>
                      <Typography>Женская целевая аудитория</Typography>
                      <Link to="/admin-help#jca"> Подробнее </Link>
                    </>
                  }
                >
                  <Box
                    component="img"
                    src={question}
                    alt="question"
                    sx={{ ml: "5px", mr: "20px", cursor: "pointer" }}
                  />
                </CustomToolTip>
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
                    color: caState === 2 ? "#E37E31" : "black",
                    ":hover": { color: "#E37E31" },
                  }}
                  onClick={() => onCaClick(2)}
                >
                  Стандартные ВЦА
                </Typography>
                <CustomToolTip
                  arrow
                  title={
                    <>
                      <Typography>Взрослая целевая аудитория</Typography>
                      <Link to="/admin-help#vca"> Подробнее </Link>
                    </>
                  }
                >
                  <Box
                    component="img"
                    src={question}
                    alt="question"
                    sx={{ ml: "5px", mr: "20px", cursor: "pointer" }}
                  />
                </CustomToolTip>
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
                  color: state === 0 ? "#D25D48" : "black",
                }}
                onClick={() => onSwitchClick(0)}
              >
                Включено
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
                  color: state === 1 ? "#D25D48" : "black",
                }}
                onClick={() => onSwitchClick(1)}
              >
                Отключить
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>Загрузка...</Typography>
      )}
    </Grid>
  );
};

export default PublicSettings;
