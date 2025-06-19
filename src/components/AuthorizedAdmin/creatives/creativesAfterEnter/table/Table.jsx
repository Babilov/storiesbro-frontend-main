import React, { useEffect, useState } from "react";
import {
  Divider,
  Grid,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import DeletePublicModal from "./modals/DeletePublicModal";
import { API_URL } from "../../../../../constants/constatns";

const Table = ({ publics, setPublics }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [enhancedPublics, setEnhancedPublics] = useState([]);
  const [deletePublic, setDeletePublic] = useState(false);
  const [publicObj, setPublicObj] = useState(null);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (id) => {
    setPublicObj(publics.filter((item) => item["id"] === id)[0]);
    setDeletePublic(true);
  };

  const handleIncrementCount = () => setCount(count + 1);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        if (publics.length === 0) {
          setEnhancedPublics([]);
          return;
        }

        // Создаем массив запросов для получения статусов
        const statusRequests = publics.map((publicObj) =>
          axios
            .get(`${API_URL}community_switch/${publicObj.group_id}`)
            .then((res) => ({
              ...publicObj,
              status: res.data.status,
            }))
            .catch(() => ({
              ...publicObj,
              status: 0, // В случае ошибки считаем сообщество отключенным
            }))
        );

        // Выполняем все запросы параллельно
        const enhancedData = await Promise.all(statusRequests);
        setEnhancedPublics(enhancedData);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchStatuses();
  }, [publics]);

  useEffect(() => {
    document.body.classList.add("no-scrollbar");
    return () => document.body.classList.remove("no-scrollbar");
  }, []);

  const renderStatus = (status) => {
    return status === 1 ? (
      <Typography className="mdSizeText" sx={{ color: "#4CD640" }}>
        Активен
      </Typography>
    ) : (
      <Typography className="mdSizeText" sx={{ color: "#D25D48" }}>
        Отключен
      </Typography>
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress sx={{ color: "#FF6B00" }} size={60} />
      </Box>
    );
  }

  return (
    <Box onClick={handleIncrementCount} sx={{ mb: 2 }}>
      <DeletePublicModal
        open={deletePublic}
        setOpen={setDeletePublic}
        setPublics={setPublics}
        publics={publics}
        publicObj={publicObj}
      />

      {!isMobile ? (
        // Десктопная версия
        <Box
          sx={{
            border: "1px solid #CDCDCD",
            borderRadius: "10px",
            p: "0 25px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              p: 2,
            }}
            className="adminTitles"
          >
            <Grid item xs={3}>
              <Typography variant="h4">Сообщество</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4">Название</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h4">Статус</Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Divider />
          {enhancedPublics.map((publicObj) => (
            <Grid
              container
              key={publicObj.group_id}
              className="adminPublics"
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #CDCDCD",
                pt: 1,
                pb: 1,
              }}
            >
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  alt="group avatar"
                  src={publicObj.photo}
                  sx={{ borderRadius: "50%", height: "90px", width: "90px" }}
                />
              </Grid>
              <Grid item xs={3} sx={{ textAlign: "center" }}>
                <Link
                  to={publicObj.link}
                  style={{
                    textAlign: "center",
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    target: "_blank",
                  }}
                >
                  {publicObj.name}
                </Link>
              </Grid>
              <Grid item md={2}>
                {renderStatus(publicObj.status)}
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link
                  to={`/publics/setting/${publicObj.group_id}`}
                  sx={{ m: 2, cursor: "pointer" }}
                  className="linkItem"
                >
                  Настройки
                </Link>
              </Grid>
            </Grid>
          ))}
        </Box>
      ) : (
        // Мобильная версия
        <Box>
          {enhancedPublics.map((publicObj) => (
            <Box className="grayBorder" sx={{ mb: 2 }} key={publicObj.group_id}>
              <Box
                sx={{
                  display: "flex",
                  borderBottom: "1px solid #CBCBCB",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    alt="avatar"
                    src={publicObj.photo}
                    sx={{
                      m: 2,
                      borderRadius: "50%",
                      height: "70px",
                      width: "70px",
                    }}
                  />
                  <Link
                    to={publicObj.link}
                    style={{
                      textAlign: "center",
                      color: "black",
                      textDecoration: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginTop: "16px",
                      target: "_blank",
                    }}
                  >
                    {publicObj.name}
                  </Link>
                </Box>
                {renderStatus(publicObj.status)}
              </Box>
              <Box className="spaceAround">
                <Link
                  to={`/publics/setting/${publicObj.group_id}`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    textDecoration: "none",
                    margin: 2,
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  Настройки
                </Link>
                <Typography sx={{ color: "#CBCBCB", m: 2 }}>|</Typography>
                <Typography
                  sx={{ fontSize: "12px", m: 2, cursor: "pointer" }}
                  onClick={() => handleDelete(publicObj.group_id)}
                >
                  Отключить
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Table;
