import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import DeletePublicModal from "./modals/DeletePublicModal";
import { API_URL } from "../../../../../constants/constatns";

const Table = ({ publics, setPublics }) => {
  const [statuses, setStatuses] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [deletePublic, setDeletePublic] = useState(false);
  const [publicObj, setPublicObj] = useState(null);
  const [count, setCount] = useState(1);

  const handleDelete = (id) => {
    setPublicObj(publics.filter((item) => item["id"] === id)[0]);
    setDeletePublic(true);
  };

  const handleIncrementCount = () => setCount(count + 1);

  useEffect(() => {
    const fetchStatuses = async () => {
      const newStatuses = {};
      const newLoadingStates = {};

      // Инициализируем состояния загрузки
      publics.forEach((obj) => {
        newLoadingStates[obj.group_id] = true;
      });
      setLoadingStates(newLoadingStates);

      // Параллельно запрашиваем все статусы
      const requests = publics.map((obj) =>
        axios
          .get(`${API_URL}community_switch/${obj.group_id}`)
          .then((res) => ({
            id: obj.group_id,
            status: res.data.status,
          }))
          .catch(() => ({
            id: obj.group_id,
            status: 0, // В случае ошибки считаем сообщество отключенным
          }))
      );

      try {
        const results = await Promise.all(requests);
        results.forEach(({ id, status }) => {
          newStatuses[id] = status;
          newLoadingStates[id] = false;
        });

        setStatuses((prev) => ({ ...prev, ...newStatuses }));
        setLoadingStates((prev) => ({ ...prev, ...newLoadingStates }));
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    if (publics.length > 0) {
      fetchStatuses();
    }
  }, [publics]);

  useEffect(() => {
    document.body.classList.add("no-scrollbar");
    return () => document.body.classList.remove("no-scrollbar");
  }, []);

  const renderStatus = (groupId) => {
    if (loadingStates[groupId]) {
      return (
        <Typography className="mdSizeText" sx={{ color: "#999" }}>
          Загрузка...
        </Typography>
      );
    }

    return statuses[groupId] === 1 ? (
      <Typography className="mdSizeText" sx={{ color: "#4CD640" }}>
        Активен
      </Typography>
    ) : (
      <Typography className="mdSizeText" sx={{ color: "#D25D48" }}>
        Отключен
      </Typography>
    );
  };

  return (
    <Box onClick={handleIncrementCount} sx={{ mb: 2 }}>
      <DeletePublicModal
        open={deletePublic}
        setOpen={setDeletePublic}
        setPublics={setPublics}
        publics={publics}
        publicObj={publicObj}
      />

      {/* Десктопная версия */}
      <Box
        sx={{
          border: "1px solid #CDCDCD",
          borderRadius: "10px",
          p: "0 25px",
          display: { xs: "none", md: "block" },
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
        {publics.map((publicObj) => (
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
              {renderStatus(publicObj.group_id)}
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

      {/* Мобильная версия */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {publics.map((publicObj) => (
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
              {renderStatus(publicObj.group_id)}
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
    </Box>
  );
};

export default Table;
