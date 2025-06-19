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
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const handleDelete = (id) => {
    setPublicObj(publics.filter((item) => item["id"] === id)[0]);
    setDeletePublic(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (publics.length === 0 || hasFetched) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const enhanced = await Promise.all(
          publics.map(async (publicObj) => {
            try {
              const statusRes = await axios.get(
                `${API_URL}community_switch/${publicObj.group_id}`
              );
              return {
                ...publicObj,
                status: statusRes.data.status,
              };
            } catch (error) {
              return {
                ...publicObj,
                status: 0,
              };
            }
          })
        );

        setEnhancedPublics(enhanced);
        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [publics]); // Зависимость только от publics

  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scrollbar");
    };
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

  if (isLoading && !hasFetched) {
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

  // const displayPublics = hasFetched ? enhancedPublics : publics;

  return (
    <Box sx={{ mb: 2 }}>
      <DeletePublicModal
        open={deletePublic}
        setOpen={setDeletePublic}
        setPublics={setPublics}
        publics={publics}
        publicObj={publicObj}
      />

      {!isMobile ? (
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
          {hasFetched &&
            enhancedPublics.map((publicObj) => (
              <Grid
                container
                key={publicObj.group_id}
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
                    }}
                  >
                    {publicObj.name}
                  </Link>
                </Grid>
                <Grid item md={2}>
                  {hasFetched ? (
                    renderStatus(publicObj.status)
                  ) : (
                    <CircularProgress size={20} sx={{ color: "#FF6B00" }} />
                  )}
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
                  >
                    Настройки
                  </Link>
                </Grid>
              </Grid>
            ))}
        </Box>
      ) : (
        <Box>
          {hasFetched &&
            enhancedPublics.map((publicObj) => (
              <Box
                key={publicObj.group_id}
                sx={{
                  mb: 2,
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={publicObj.photo}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Typography variant="subtitle1">
                      {publicObj.name}
                    </Typography>
                  </Box>
                  {hasFetched ? (
                    renderStatus(publicObj.status)
                  ) : (
                    <CircularProgress size={20} sx={{ color: "#FF6B00" }} />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: 2,
                  }}
                >
                  <Link
                    to={`/publics/setting/${publicObj.group_id}`}
                    style={{ color: "#1976d2", textDecoration: "none" }}
                  >
                    Настройки
                  </Link>
                  <Typography
                    sx={{ color: "#1976d2", cursor: "pointer" }}
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
