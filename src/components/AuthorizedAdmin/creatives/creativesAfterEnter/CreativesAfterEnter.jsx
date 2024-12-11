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
  const token = localStorage["token"];

  const [publics, setPublics] = useContext(PublicsContext);
  const [openAdd, setOpenAdd] = useState(false);

  /*axios.get(`${API_URL}api_communities/communities`, {
          headers: { Authorization: `Bearer ${token}` },
        });*/

  return (
    <Grid item xs={12}>
      <AddPublicModal open={openAdd} setOpen={setOpenAdd} publics={publics} />
      <AddPublicButton setOpen={setOpenAdd} />
      <Table publics={publics} setPublics={setPublics} />
    </Grid>
  );
};

export default CreativesAfterEnter;
