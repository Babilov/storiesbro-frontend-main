import React, { useContext, useEffect, useState } from "react";

import "./styles/style.css";
import Table from "./table/Table";
import AddPublicButton from "./buttons/AddPublicButton";
import { PublicsContext } from "../../../../context/PublicsContext";
import { Box, Grid, Typography } from "@mui/material";
import AddPublicModal from "./table/modals/AddPublicModal";
import { API_URL } from "../../../../constants/constatns";
import axios from "axios";
import logToBackend from "../../../../utils/logs";
import { fetchWithAuth, refreshToken } from "../../../../api/token";
import MyButton from "../../../UI/buttons/MyButton";
import var2 from "./images/var2.svg";

const CreativesAfterEnter = () => {
  const [publics, setPublics, selectedPublics, setSelectedPublics] =
    useContext(PublicsContext);
  const [openAdd, setOpenAdd] = useState(false);

  const fetchAllPublics = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}vk/groups/`, {
        headers: {
          Accept: "application/json",
        },
      });
      setPublics(response.groups);
    } catch (error) {
      console.error("Ошибка при загрузке сообществ", error);
    }
  };

  const fetchSelectedPublics = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}selected_groups/`, {
        headers: {
          Accept: "application/json",
        },
      });
      logToBackend(`GET SELECTED:::: ${JSON.stringify(response)}`);
      setSelectedPublics(response.groups);
    } catch (error) {
      console.error("Ошибка при загрузке сообществ", error);
    }
  };

  useEffect(() => {
    const refresh = async () => {
      await refreshToken();
      await fetchAllPublics();
      await fetchSelectedPublics();
    };
    refresh();
  }, []);

  useEffect(() => {
    const postId = async () => {
      const deviceId = sessionStorage.getItem("device_id");
      const token = localStorage.getItem("access_token");
      await axios.get(`${API_URL}valid_token/?device_id=${deviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Токен в заголовке
        },
      });
    };
    postId();
  }, []);

  const [redirect, setRedirect] = useState(undefined);

  useEffect(() => {
    const url = localStorage.getItem("group_redirect");
    setRedirect(url);
  }, []);

  /*const removeRedirect = () => {
    localStorage.removeItem("group_redirect");
  };*/

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mb: 2,
          justifyContent: {
            md: "flex-end",
            xs: "flex-start",
            alignItems: "center",
          },
        }}
      >
        {/*
          <Box
          sx={{
            width: { md: "35%", sm: "50", xs: "75" },
          }}
        >
          
          <a href={redirect} style={{ textDecoration: "none" }}>
            <MyButton
              // onClick={removeRedirect}
              options={{
                background: "white",
                color: "black",
                border: "2px solid #0077FF",
                borderRadius: "90px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography>Дать доступ к группам</Typography>
                <Box
                  sx={{ width: "23px" }}
                  component="img"
                  alt="группа"
                  src={var2}
                />
              </Box>
            </MyButton>
          </a>
        </Box>
          
          */}

        <AddPublicButton setOpen={setOpenAdd} />
      </Box>
      <AddPublicModal
        open={openAdd}
        setOpen={setOpenAdd}
        publics={publics}
        addedPublics={selectedPublics}
      />
      <Table publics={selectedPublics} setPublics={setSelectedPublics} />
    </Grid>
  );
};

export default CreativesAfterEnter;
