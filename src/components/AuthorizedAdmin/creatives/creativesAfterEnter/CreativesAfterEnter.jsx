import React, { useContext, useEffect, useState } from "react";

import "./styles/style.css";
import Table from "./table/Table";
import AddPublicButton from "./buttons/AddPublicButton";
import { PublicsContext } from "../../../../context/PublicsContext";
import { Grid } from "@mui/material";
import AddPublicModal from "./table/modals/AddPublicModal";
import { API_URL } from "../../../../constants/constatns";
import axios from "axios";

const CreativesAfterEnter = () => {
  const [publics, setPublics, selectedPublics, setSelectedPublics] =
    useContext(PublicsContext);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const postId = async () => {
      const userId = localStorage.getItem("id");
      const deviceId = localStorage.getItem("device_id");
      await axios.post(`${API_URL}refresh_token/?user_id=${userId}`);
      await axios.post(
        `${API_URL}valid_token/?user_id=${userId}&device_id=${deviceId}`,
      );
    };
    postId();
  }, []);

  return (
    <Grid item xs={12}>
      <AddPublicModal open={openAdd} setOpen={setOpenAdd} publics={publics} />
      <AddPublicButton setOpen={setOpenAdd} />
      <Table publics={selectedPublics} setPublics={setSelectedPublics} />
    </Grid>
  );
};

export default CreativesAfterEnter;
