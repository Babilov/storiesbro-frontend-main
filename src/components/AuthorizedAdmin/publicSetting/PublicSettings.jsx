import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import question from "./images/question.svg";
import logToBackend from "../../../utils/logs";
import CustomToolTip from "../../UI/tooltip/CustomTooltip";
import arrowSvg from "./images/arrowSvg.svg";

const PublicSettings = () => {
  const params = useParams();
  const [caState, setCaState] = useState(0);
  const [state, setState] = useState(0);
  const [publicObj, setPublic] = useState(undefined);
  const groupId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          `https://storisbro.com/api/group_details/?group_id=${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Токен в заголовке
            },
          }
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
          "https://storisbro.com/api/community_status/"
        );
        const resSt = await axios.get(
          "https://storisbro.com/api/community_switch/"
        );
        setCaState(resCa.data);
        setState(resSt.data);
      } catch (error) {
        logToBackend(`Error GET: ${error}`);
      }
    };
    fetchCaState();
  }, []);

  const onCaClick = async (ca) => {
    try {
      await axios.post("https://storisbro.com/api/community_status/", {
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

  const navigate = useNavigate();
  // тест
  return (
    <Grid container className="grid">
      {publicObj !== undefined ? (
        <>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              m: "10px 0 40px",
            }}
          >
            <Box
              component="img"
              src={arrowSvg}
              onClick={() => navigate("/publics")}
              sx={{ cursor: "pointer" }}
            />
            <Typography className="title" sx={{ m: "0 auto 0 !important" }}>
              Настройки сообщества
            </Typography>
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
            <Link
              to={publicObj["group"]["link"]}
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginTop: 32,
                marginBottom: 32,
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
                target: "_blank",
              }}
            >
              {publicObj["group"]["name"]}
            </Link>
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
            <Grid container sx={{ p: "20px 0" }}>
              <Grid
                item
                md={3}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRight: {
                    md: "1px solid black",
                    height: "25px",
                    m: "auto",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    m: { md: "10px auto", xs: "10px 0" },
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
                        <Link
                          to="/admin-help#mca"
                          style={{ color: "lightblue" }}
                        >
                          {" "}
                          Подробнее{" "}
                        </Link>
                      </>
                    }
                  >
                    <Box
                      component="img"
                      src={question}
                      alt="question"
                      sx={{ ml: "5px", cursor: "pointer" }}
                    />
                  </CustomToolTip>
                </Box>
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRight: {
                    md: "1px solid black",
                    height: "25px",
                    m: "auto",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    m: { md: "10px auto", xs: "10px 0" },
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
                        <Link
                          to="/admin-help#jca"
                          style={{ color: "lightblue" }}
                        >
                          {" "}
                          Подробнее{" "}
                        </Link>
                      </>
                    }
                  >
                    <Box
                      component="img"
                      src={question}
                      alt="question"
                      sx={{ ml: "5px", cursor: "pointer" }}
                    />
                  </CustomToolTip>
                </Box>
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRight: {
                    md: "1px solid black",
                    height: "25px",
                    m: "auto",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    m: { md: "10px auto", xs: "10px 0" },
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
                    Взрослые СЦА
                  </Typography>
                  <CustomToolTip
                    arrow
                    title={
                      <>
                        <Typography>Взрослая целевая аудитория</Typography>
                        <Link
                          to="/admin-help#vca"
                          style={{ color: "lightblue" }}
                        >
                          {" "}
                          Подробнее{" "}
                        </Link>
                      </>
                    }
                  >
                    <Box
                      component="img"
                      src={question}
                      alt="question"
                      sx={{ ml: "5px", cursor: "pointer" }}
                    />
                  </CustomToolTip>
                </Box>
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "25px",
                  m: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    m: { md: "10px auto", xs: "10px 0" },
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
