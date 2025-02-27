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

const CreativesAfterEnter = () => {
  const [publics, setPublics, selectedPublics, setSelectedPublics] =
    useContext(PublicsContext);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const postId = async () => {
      const userId = localStorage.getItem("id");
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
