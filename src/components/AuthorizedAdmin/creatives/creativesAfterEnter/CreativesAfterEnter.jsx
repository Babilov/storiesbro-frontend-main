import React, { useContext, useEffect, useState } from "react";

import "./styles/style.css";
import Table from "./table/Table";
import AddPublicButton from "./buttons/AddPublicButton";
import { PublicsContext } from "../../../../context/PublicsContext";
import { Grid } from "@mui/material";
import AddPublicModal from "./table/modals/AddPublicModal";
import { API_URL } from "../../../../constants/constatns";
import axios from "axios";
import logToBackend from "../../../../utils/logs";
import { fetchWithAuth, refreshToken } from "../../../../api/token";

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

  useEffect(() => {
    const url = localStorage.getItem("group_redirect");
    window.location.href = url;
    localStorage.removeItem("group_redirect");
  }, []);

  return (
    <Grid item xs={12}>
      <AddPublicModal
        open={openAdd}
        setOpen={setOpenAdd}
        publics={publics}
        addedPublics={selectedPublics}
      />
      <AddPublicButton setOpen={setOpenAdd} />
      <Table publics={selectedPublics} setPublics={setSelectedPublics} />
    </Grid>
  );
};

export default CreativesAfterEnter;
